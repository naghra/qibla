#!/usr/bin/env bash
# Deploy Qibla static app (single index.html) to Contabo VPS
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
SOURCE_HTML="$ROOT_DIR/qibla-finder/index.html"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: Create deploy/.env from deploy/.env.example"
  exit 1
fi

# shellcheck disable=SC1091
source "$ENV_FILE"

for var in QIBLA_DOMAIN VPS_HOST VPS_PATH SSH_KEY; do
  if [[ -z "${!var:-}" ]]; then
    echo "ERROR: Set $var in deploy/.env"
    exit 1
  fi
done

if [[ ! -f "$SOURCE_HTML" ]]; then
  echo "ERROR: Missing $SOURCE_HTML"
  exit 1
fi

SSH_KEY_EXPANDED="${SSH_KEY/#\~/$HOME}"
if [[ ! -f "$SSH_KEY_EXPANDED" ]]; then
  echo "ERROR: SSH key not found: $SSH_KEY_EXPANDED"
  exit 1
fi

SSH_OPTS=(-i "$SSH_KEY_EXPANDED" -o StrictHostKeyChecking=no -o BatchMode=yes)

echo "==> Upload index.html to ${VPS_HOST}:${VPS_PATH}/"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "mkdir -p '$VPS_PATH'"
scp "${SSH_OPTS[@]}" "$SOURCE_HTML" "${VPS_HOST}:${VPS_PATH}/index.html"

echo "==> Install nginx config for ${QIBLA_DOMAIN}"
NGINX_CONF="$(sed "s/__QIBLA_DOMAIN__/${QIBLA_DOMAIN}/g" "$SCRIPT_DIR/nginx.conf.template")"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "cat > /etc/nginx/sites-available/qibla-standalone.conf" <<< "$NGINX_CONF"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "ln -sf /etc/nginx/sites-available/qibla-standalone.conf /etc/nginx/sites-enabled/qibla-standalone.conf"

echo "==> SSL certificate (Let's Encrypt)"
EMAIL="${CERTBOT_EMAIL:-admin@${QIBLA_DOMAIN}}"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "nginx -t && certbot --nginx -d '${QIBLA_DOMAIN}' -d 'www.${QIBLA_DOMAIN}' --non-interactive --agree-tos -m '${EMAIL}' --redirect || true"

echo "==> Reload nginx"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "nginx -t && systemctl reload nginx"

echo ""
echo "Deployed: https://${QIBLA_DOMAIN}/"
