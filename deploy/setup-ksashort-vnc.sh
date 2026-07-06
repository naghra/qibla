#!/usr/bin/env bash
# Run this ON THE SERVER via Contabo VNC console when SSH is not available.
# Re-points ksashort.shop from CodForm to the Qibla static app.
set -euo pipefail

DOMAIN="ksashort.shop"
WEB_ROOT="/var/www/qibla"
QIBLA_SOURCE="https://qibla.codform.shop/"
DEPLOY_PUB_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFUX1vnnR52xysaPMaxaZMevsGrY6/42yq4TuJeLIDri qibla-deploy@travelsmarttravelfast.com"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@ksashort.shop}"

echo "==> Enable SSH deploy key"
mkdir -p /root/.ssh
chmod 700 /root/.ssh
touch /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
if ! grep -qF "$DEPLOY_PUB_KEY" /root/.ssh/authorized_keys 2>/dev/null; then
  echo "$DEPLOY_PUB_KEY" >> /root/.ssh/authorized_keys
  echo "Added deploy key to authorized_keys"
else
  echo "Deploy key already present"
fi

echo "==> Download Qibla app to ${WEB_ROOT}"
mkdir -p "$WEB_ROOT"
curl -fsSL "$QIBLA_SOURCE" -o "${WEB_ROOT}/index.html"
chown -R www-data:www-data "$WEB_ROOT" 2>/dev/null || true

echo "==> Install nginx config for ${DOMAIN}"
mkdir -p /var/www/certbot
cat > /etc/nginx/sites-available/qibla-standalone.conf <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${WEB_ROOT};
    index index.html;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

ln -sf /etc/nginx/sites-available/qibla-standalone.conf /etc/nginx/sites-enabled/qibla-standalone.conf

echo "==> Remove ${DOMAIN} from CodForm nginx (if present)"
for conf in /etc/nginx/sites-enabled/*; do
  [[ -f "$conf" ]] || continue
  if grep -q "ksashort.shop" "$conf" 2>/dev/null && [[ "$conf" != *qibla-standalone* ]]; then
    echo "Editing: $conf"
    sed -i 's/ ksashort\.shop//g; s/ksashort\.shop //g; s/www\.ksashort\.shop//g' "$conf"
    sed -i 's/  / /g; s/  / /g' "$conf"
  fi
done

nginx -t
systemctl reload nginx

echo "==> SSL (Let's Encrypt) — requires DNS A records pointing to this server"
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" \
  --non-interactive --agree-tos -m "${CERTBOT_EMAIL}" --redirect || {
  echo "WARN: certbot failed — set DNS first, then re-run:"
  echo "  certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --redirect"
}

nginx -t && systemctl reload nginx

echo ""
echo "Done. Test: https://${DOMAIN}/"
echo "From your machine: ssh -i ~/.ssh/qibla_deploy_ed25519 root@185.214.135.141"
