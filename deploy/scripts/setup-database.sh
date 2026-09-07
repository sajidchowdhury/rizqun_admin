#!/usr/bin/env bash
#
# Rizqun VPS — PostgreSQL Database Setup
#
# Creates a DEDICATED database + user for Rizqun.
# Does NOT touch any existing databases or users.
#
# Usage:  ./deploy/scripts/setup-database.sh
#
set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok()    { echo -e "  ${GREEN}✓${NC} $1"; }
fail()  { echo -e "  ${RED}✗${NC} $1"; exit 1; }
info()  { echo -e "  ${BLUE}ℹ${NC} $1"; }
warn()  { echo -e "  ${YELLOW}⚠${NC} $1"; }

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Rizqun — PostgreSQL Database Setup${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}\n"

# ─── Check psql exists ────────────────────────────────────────
if ! command -v psql &>/dev/null; then
  fail "PostgreSQL is not installed. Run check-prerequisites.sh first."
fi

# ─── Check we can access postgres superuser ───────────────────
if ! sudo -u postgres psql -c "SELECT 1" &>/dev/null; then
  fail "Cannot connect to PostgreSQL as 'postgres' user. Run as a user with sudo access."
fi

# ─── Collect credentials ──────────────────────────────────────
read -rp "  Database name [rizqun_db]: " DB_NAME
DB_NAME="${DB_NAME:-rizqun_db}"

read -rp "  Database user [rizqun_user]: " DB_USER
DB_USER="${DB_USER:-rizqun_user}"

read -rsp "  Database password (will not echo): " DB_PASS
echo ""
if [ -z "$DB_PASS" ]; then
  fail "Password cannot be empty."
fi
if [ ${#DB_PASS} -lt 8 ]; then
  warn "Password is short (< 8 chars). Consider something stronger."
  read -rp "  Continue anyway? [y/N]: " CONFIRM
  [ "$CONFIRM" = "y" ] || exit 1
fi

echo ""
info "Creating database: $DB_NAME"
info "Creating user:     $DB_USER"
echo ""

# ─── Check if database already exists ─────────────────────────
if sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" 2>/dev/null | grep -q 1; then
  warn "Database '$DB_NAME' already exists."
  read -rp "  Drop and recreate? [y/N]: " DROP
  if [ "$DROP" = "y" ]; then
    sudo -u postgres psql -c "DROP DATABASE IF EXISTS \"$DB_NAME\";"
    sudo -u postgres psql -c "DROP USER IF EXISTS \"$DB_USER\";"
    ok "Dropped existing database + user."
  else
    info "Keeping existing database. Granting permissions to user."
  fi
fi

# ─── Create user (if not exists) ──────────────────────────────
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" 2>/dev/null | grep -q 1; then
  sudo -u postgres psql -c "CREATE USER \"$DB_USER\" WITH PASSWORD '$DB_PASS' CREATEDB;" >/dev/null
  ok "Created user: $DB_USER (with CREATEDB for Prisma shadow migrations)"
else
  warn "User '$DB_USER' already exists. Resetting password."
  sudo -u postgres psql -c "ALTER USER \"$DB_USER\" WITH PASSWORD '$DB_PASS' CREATEDB;" >/dev/null
  ok "Reset password + granted CREATEDB."
fi

# ─── Create database (if not exists) ──────────────────────────
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" 2>/dev/null | grep -q 1; then
  sudo -u postgres psql -c "CREATE DATABASE \"$DB_NAME\" OWNER \"$DB_USER\";" >/dev/null
  ok "Created database: $DB_NAME (owned by $DB_USER)"
fi

# ─── Grant privileges ─────────────────────────────────────────
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE \"$DB_NAME\" TO \"$DB_USER\";" >/dev/null
sudo -u postgres psql -d "$DB_NAME" -c "GRANT ALL ON SCHEMA public TO \"$DB_USER\";" >/dev/null
ok "Granted full privileges on $DB_NAME to $DB_USER"

# ─── Verify connection ────────────────────────────────────────
echo ""
info "Verifying connection..."
if PGPASSWORD="$DB_PASS" psql -U "$DB_USER" -d "$DB_NAME" -h 127.0.0.1 -c "SELECT 1 AS connected;" 2>/dev/null | grep -q connected; then
  ok "Connection successful — $DB_USER can connect to $DB_NAME"
else
  fail "Connection failed. Check pg_hba.conf allows password auth for 127.0.0.1."
fi

# ─── Print the DATABASE_URL ───────────────────────────────────
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Database ready!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Copy this DATABASE_URL into your .env file:"
echo ""
echo -e "  ${BLUE}DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@127.0.0.1:5432/${DB_NAME}?schema=public${NC}"
echo ""
echo -e "  File: apps/operation/api/.env"
echo ""

# ─── Confirm your existing databases are safe ─────────────────
echo -e "${BLUE}Existing PostgreSQL databases on this server (untouched):${NC}"
sudo -u postgres psql -c "\l" 2>/dev/null | grep -v "^$" | head -20
echo ""
