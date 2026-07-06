#!/usr/bin/env bash
# Verify DNS for Qibla domain before deploy / certbot
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
DOMAIN="${1:-}"

if [[ -z "$DOMAIN" && -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1091
  source "$ENV_FILE"
  DOMAIN="${QIBLA_DOMAIN:-}"
fi

if [[ -z "$DOMAIN" ]]; then
  echo "Usage: $0 [domain]"
  echo "  or set QIBLA_DOMAIN in deploy/.env"
  exit 1
fi

EXPECTED_IP="185.214.135.141"
OK=1

check() {
  local host="$1"
  local ip
  ip="$(dig +short "$host" A 2>/dev/null | head -1)"
  if [[ "$ip" == "$EXPECTED_IP" ]]; then
    echo "OK   $host -> $ip"
  else
    echo "FAIL $host -> ${ip:-<no A record>} (expected $EXPECTED_IP)"
    OK=0
  fi
}

echo "Checking DNS for ${DOMAIN}..."
check "$DOMAIN"
check "www.${DOMAIN}"

if [[ "$OK" -eq 1 ]]; then
  echo ""
  echo "DNS ready. Run: ./deploy/deploy.sh"
  exit 0
fi

echo ""
echo "Add these records at your domain registrar (Namecheap, etc.):"
echo "  Type A | Host @   | Value $EXPECTED_IP | TTL 300"
echo "  Type A | Host www | Value $EXPECTED_IP | TTL 300"
exit 1
