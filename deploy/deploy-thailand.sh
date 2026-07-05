#!/usr/bin/env bash
# Build and deploy Thailand TDAC travel site to Contabo (ksashort.shop)
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

echo "==> Reload nginx"
ssh "${SSH_OPTS[@]}" "$VPS_HOST" "nginx -t && systemctl reload nginx"

rm -f /tmp/thailand-dist.tar.gz
echo ""
echo "Deployed: https://${SITE_DOMAIN}/"
