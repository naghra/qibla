#!/usr/bin/env bash
# Install PostgreSQL and create dacgateway database if missing (run on Contabo VPS)
set -euo pipefail

DB_NAME="${DB_NAME:-dacgateway}"
DB_USER="${DB_USER:-dacgateway}"
DB_PASSWORD="${DB_PASSWORD:?Set DB_PASSWORD}"

if ! command -v psql >/dev/null 2>&1; then
  echo "==> Installing PostgreSQL"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y postgresql postgresql-contrib
  systemctl enable postgresql
  systemctl start postgresql
fi

echo "==> Creating role and database if needed"
sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';"

sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"

sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};"

sudo -u postgres psql -d "${DB_NAME}" -c "GRANT ALL ON SCHEMA public TO ${DB_USER};"

echo "==> Database ${DB_NAME} ready"
