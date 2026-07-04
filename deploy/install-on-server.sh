#!/usr/bin/env bash
# One-shot installer for Contabo VPS — run ON the server as root or with sudo
# Works alongside other sites (e.g. saqr) on the same server — uses /var/www/qibla + port 3000
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/naghra/qibla/cursor/contabo-deploy-8af4/deploy/install-on-server.sh | sudo bash -s -- \
#     --domain travelsmarttravelfast.com \
#     --admin-password 'YourSecurePassword123'
#
# Or after cloning:
#   sudo ./deploy/install-on-server.sh --domain yourdomain.com --admin-password 'YourSecurePassword123'

set -euo pipefail

INSTALL_DIR="/var/www/qibla"
REPO_URL="https://github.com/naghra/qibla.git"
BRANCH="cursor/contabo-deploy-8af4"
DOMAIN=""
ADMIN_PASSWORD=""
SKIP_SSL=false
EMAIL=""

usage() {
  echo "Usage: $0 --domain DOMAIN --admin-password PASS [--email EMAIL] [--skip-ssl]"
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="$2"; shift 2 ;;
    --admin-password) ADMIN_PASSWORD="$2"; shift 2 ;;
    --email) EMAIL="$2"; shift 2 ;;
    --skip-ssl) SKIP_SSL=true; shift ;;
    *) usage ;;
  esac
done

[[ -n "$DOMAIN" && -n "$ADMIN_PASSWORD" ]] || usage
[[ -n "$EMAIL" ]] || EMAIL="admin@${DOMAIN}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo $0 ..."
  exit 1
fi

echo "==> Installing system packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl git rsync nginx certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  echo "==> Installing Node.js 20"
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi

echo "==> Cloning/updating project"
mkdir -p "$INSTALL_DIR"
if [[ -d "$INSTALL_DIR/.git" ]]; then
  git -C "$INSTALL_DIR" fetch origin "$BRANCH"
  git -C "$INSTALL_DIR" checkout "$BRANCH"
  git -C "$INSTALL_DIR" pull origin "$BRANCH"
else
  git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$INSTALL_DIR"
fi

echo "==> Writing .env"
cat > "$INSTALL_DIR/.env" <<EOF
VITE_SITE_ORIGIN=https://${DOMAIN}
VITE_ADMIN_PASSWORD=${ADMIN_PASSWORD}
PORT=3000
HOST=127.0.0.1
EOF
chmod 600 "$INSTALL_DIR/.env"

echo "==> Building"
cd "$INSTALL_DIR"
npm ci --silent
npm run build

echo "==> Installing systemd service"
cp "$INSTALL_DIR/deploy/qibla.service" /etc/systemd/system/qibla.service
systemctl daemon-reload
systemctl enable qibla
systemctl restart qibla

echo "==> Configuring Nginx"
cat > /etc/nginx/sites-available/qibla <<NGINX
upstream qibla_app {
    server 127.0.0.1:3000;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://qibla_app;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Connection "";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/qibla /etc/nginx/sites-enabled/qibla
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

if [[ "$SKIP_SSL" == false ]]; then
  echo "==> Obtaining SSL certificate"
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" || {
    echo "WARNING: SSL failed — site still works on HTTP. Run certbot manually later."
  }
fi

if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 'Nginx Full' >/dev/null 2>&1 || true
fi

echo ""
echo "============================================"
echo "  Deploy complete!"
echo "  Site:  https://${DOMAIN}"
echo "  Admin: https://${DOMAIN}/admin"
echo "============================================"
systemctl status qibla --no-pager -l | head -5
