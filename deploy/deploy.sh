#!/usr/bin/env bash
set -euo pipefail

# Deploy script for Contabo VPS
# Usage: ./deploy/deploy.sh [install-dir]
# Default install dir: /var/www/qibla

INSTALL_DIR="${1:-/var/www/qibla}"
REPO_URL="${REPO_URL:-https://github.com/naghra/qibla.git}"
BRANCH="${BRANCH:-main}"

echo "==> Deploying to ${INSTALL_DIR}"

if [[ ! -f .env ]]; then
  echo "ERROR: Create .env from .env.example before deploying (VITE_SITE_ORIGIN, VITE_ADMIN_PASSWORD)."
  exit 1
fi

# shellcheck disable=SC1091
source .env

if [[ -z "${VITE_SITE_ORIGIN:-}" ]]; then
  echo "ERROR: Set VITE_SITE_ORIGIN in .env (e.g. https://yourdomain.com)"
  exit 1
fi

echo "==> Installing dependencies"
npm ci

echo "==> Building production bundle"
npm run build

if [[ "$(id -u)" -eq 0 ]]; then
  echo "==> Copying to ${INSTALL_DIR}"
  mkdir -p "${INSTALL_DIR}"
  rsync -a --delete \
    dist/ "${INSTALL_DIR}/dist/" \
    server/ "${INSTALL_DIR}/server/" \
    deploy/ "${INSTALL_DIR}/deploy/" \
    .env "${INSTALL_DIR}/.env"

  echo "==> Restarting service"
  systemctl restart qibla || echo "Run: sudo systemctl enable --now qibla"
else
  echo "==> Build complete. On the server (as root):"
  echo "    sudo mkdir -p ${INSTALL_DIR}"
  echo "    sudo rsync -a dist/ ${INSTALL_DIR}/dist/"
  echo "    sudo rsync -a server/ ${INSTALL_DIR}/server/"
  echo "    sudo cp .env ${INSTALL_DIR}/.env"
  echo "    sudo systemctl restart qibla"
fi

echo "==> Done. Site: ${VITE_SITE_ORIGIN}"
