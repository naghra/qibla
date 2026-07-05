#!/usr/bin/env bash
# Build and deploy Thailand TDAC travel site to Contabo
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: Create deploy/.env from deploy/.env.example"
  exit 1
fi

# shellcheck disable=SC1091
source "$ENV_FILE"

for var in SITE_DOMAIN VPS_HOST VPS_PATH SSH_KEY VITE_SITE_ORIGIN; do
  if [[ -z "${!var:-}" ]]; then
    echo "ERROR: Set $var in deploy/.env"
    exit 1
  fi
done

SSH_KEY_EXPANDED="${SSH_KEY/#\~/$HOME}"
if [[ ! -f "$SSH_KEY_EXPANDED" ]]; then
  echo "ERROR: SSH key not found: $SSH_KEY_EXPANDED"
  exit 1
fi

SSH_OPTS=(-i "$SSH_KEY_EXPANDED" -o StrictHostKeyChecking=no -o BatchMode=yes)
REDIRECT_DOMAINS="${REDIRECT_DOMAINS:-}"

echo "==> Build Thailand site (${VITE_SITE_ORIGIN})"
cd "$ROOT_DIR"
export VITE_SITE_ORIGIN
export VITE_ADMIN_PASSWORD="${VITE_ADMIN_PASSWORD:-changeme}"
npm run build

echo "==> Upload dist/ to ${VPS_HOST}:${VPS_PATH}/"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "mkdir -p '$VPS_PATH' && rm -rf '${VPS_PATH:?}'/*"
tar czf /tmp/thailand-dist.tar.gz -C "$ROOT_DIR/dist" .
scp "${SSH_OPTS[@]}" /tmp/thailand-dist.tar.gz "${VPS_HOST}:/tmp/thailand-dist.tar.gz"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "tar xzf /tmp/thailand-dist.tar.gz -C '$VPS_PATH' && chown -R www-data:www-data '$VPS_PATH' && rm /tmp/thailand-dist.tar.gz"

echo "==> Install nginx config for ${SITE_DOMAIN}"
NGINX_CONF="$(sed -e "s/__SITE_DOMAIN__/${SITE_DOMAIN}/g" \
  -e "s|__WEB_ROOT__|${VPS_PATH}|g" \
  -e "s/__REDIRECT_DOMAINS__/${REDIRECT_DOMAINS//,/ /}/g" \
  "$SCRIPT_DIR/thailand-nginx.conf.template")"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "cat > /etc/nginx/sites-available/thailand.conf" <<< "$NGINX_CONF"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "ln -sf /etc/nginx/sites-available/thailand.conf /etc/nginx/sites-enabled/thailand.conf"

echo "==> SSL certificate (Let's Encrypt)"
EMAIL="${CERTBOT_EMAIL:-admin@${SITE_DOMAIN}}"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "nginx -t && certbot --nginx -d '${SITE_DOMAIN}' -d 'www.${SITE_DOMAIN}' --non-interactive --agree-tos -m '${EMAIL}' --redirect"

if [[ -n "$REDIRECT_DOMAINS" ]]; then
  IFS=',' read -ra REDIR <<< "$REDIRECT_DOMAINS"
  EXPAND_ARGS=(-d "${SITE_DOMAIN}" -d "www.${SITE_DOMAIN}")
  for d in "${REDIR[@]}"; do
    d="$(echo "$d" | xargs)"
    [[ -n "$d" ]] && EXPAND_ARGS+=(-d "$d")
  done
  ssh "${SSH_OPTS[@]}" "$VPS_HOST" "certbot --nginx --expand ${EXPAND_ARGS[*]} --non-interactive --agree-tos -m '${EMAIL}' --redirect || true"
fi

echo "==> Disable old qibla-standalone config"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "rm -f /etc/nginx/sites-enabled/qibla-standalone.conf"

echo "==> Reload nginx"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "nginx -t && systemctl reload nginx"

if [[ -n "${DATABASE_URL:-}" ]]; then
  echo "==> Setup PostgreSQL"
  scp "${SSH_OPTS[@]}" "$SCRIPT_DIR/init-database.sh" "${VPS_HOST}:/tmp/init-database.sh"
  ssh "${SSH_OPTS[@]}" "$VPS_HOST" "chmod +x /tmp/init-database.sh && DB_NAME='${DB_NAME:-dacgateway}' DB_USER='${DB_USER:-dacgateway}' DB_PASSWORD='${DB_PASSWORD}' bash /tmp/init-database.sh"

  echo "==> Deploy API server to ${APP_DIR:-/opt/dacgateway}"
  APP_DIR="${APP_DIR:-/opt/dacgateway}"
  tar czf /tmp/dacgateway-api.tar.gz \
    -C "$ROOT_DIR" package.json package-lock.json server dist
  scp "${SSH_OPTS[@]}" /tmp/dacgateway-api.tar.gz "${VPS_HOST}:/tmp/dacgateway-api.tar.gz"
  ssh "${SSH_OPTS[@]}" "$VPS_HOST" bash <<REMOTE
set -euo pipefail
APP_DIR="${APP_DIR}"
mkdir -p "\$APP_DIR"
tar xzf /tmp/dacgateway-api.tar.gz -C "\$APP_DIR"
cd "\$APP_DIR"
npm install --omit=dev
cat > /etc/dacgateway.env <<ENV
DATABASE_URL=${DATABASE_URL}
PORT=3000
HOST=127.0.0.1
SITE_ORIGIN=${VITE_SITE_ORIGIN}
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET:-}
OPENAI_API_KEY=${OPENAI_API_KEY:-}
OPENAI_VISION_MODEL=${OPENAI_VISION_MODEL:-gpt-4o}
ENV
chmod 600 /etc/dacgateway.env
cp "${SCRIPT_DIR}/dacgateway-api.service" /etc/systemd/system/dacgateway-api.service 2>/dev/null || true
REMOTE
  scp "${SSH_OPTS[@]}" "$SCRIPT_DIR/dacgateway-api.service" "${VPS_HOST}:/etc/systemd/system/dacgateway-api.service"
  ssh "${SSH_OPTS[@]}" "$VPS_HOST" "systemctl daemon-reload && systemctl enable dacgateway-api && systemctl restart dacgateway-api && systemctl is-active dacgateway-api"

  echo "==> Add /api/ proxy to nginx SSL block"
  ssh "${SSH_OPTS[@]}" "$VPS_HOST" "python3 - <<'PY'
from pathlib import Path
p = Path('/etc/nginx/sites-available/thailand.conf')
text = p.read_text()
snippet = '''    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\\$scheme;
    }

'''
if 'location /api/' not in text:
    text = text.replace('    location / {\\n        try_files', snippet + '    location / {\\n        try_files', 1)
    p.write_text(text)
    print('added api proxy')
else:
    print('api proxy exists')
PY
nginx -t && systemctl reload nginx"
  rm -f /tmp/dacgateway-api.tar.gz
fi

rm -f /tmp/thailand-dist.tar.gz
echo ""
echo "Deployed: https://${SITE_DOMAIN}/"
