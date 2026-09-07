#!/usr/bin/env bash
#
# Rizqun VPS — Update Script
#
# Run this after pushing new code to GitHub to update the server.
#
# This script:
#   - git pull origin main
#   - npm install (if package.json changed)
#   - Rebuilds landing + admin web + API
#   - Runs prisma migrate deploy (applies new migrations)
#   - Copies new static builds to web roots
#   - Restarts PM2
#
# Usage:  ./deploy/scripts/update.sh
#
set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

ok()    { echo -e "  ${GREEN}✓${NC} $1"; }
fail()  { echo -e "  ${RED}✗${NC} $1"; exit 1; }
info()  { echo -e "  ${BLUE}ℹ${NC} $1"; }
step()  { echo -e "\n${BLUE}── $1 ──${NC}"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

info "Repo root: $REPO_ROOT"

# ─── Check for uncommitted local changes ──────────────────────
if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "You have uncommitted local changes. Stash or commit them first, then re-run."
fi

# ─── Pull latest code ─────────────────────────────────────────
step "Pulling latest code from GitHub"
git pull origin main
ok "Code updated to latest main"

# ─── Install dependencies (in case package.json changed) ─────
step "Installing dependencies"
npm install
ok "Dependencies up to date"

# ─── Rebuild landing ──────────────────────────────────────────
step "Rebuilding landing page"
npm run build:landing
ok "Landing rebuilt"

# ─── Rebuild admin web ────────────────────────────────────────
step "Rebuilding admin console"
npm run build:web
ok "Admin web rebuilt"

# ─── Rebuild API ──────────────────────────────────────────────
step "Rebuilding API"
npm run build:api
ok "API rebuilt"

# ─── Run migrations ───────────────────────────────────────────
step "Applying database migrations"
cd "$REPO_ROOT/apps/operation/api"
npx prisma generate
npx prisma migrate deploy
ok "Migrations applied"
cd "$REPO_ROOT"

# ─── Copy static builds ───────────────────────────────────────
step "Updating static files"

sudo rm -rf /var/www/rizqun-landing/*
sudo cp -r "$REPO_ROOT/apps/landing/dist/"* /var/www/rizqun-landing/
ok "Landing updated"

sudo rm -rf /var/www/rizqun-operation/*
sudo cp -r "$REPO_ROOT/apps/operation/web/dist/"* /var/www/rizqun-operation/
ok "Admin web updated"

sudo chown -R www-data:www-data /var/www/rizqun-landing /var/www/rizqun-operation
ok "Ownership fixed"

# ─── Restart PM2 ──────────────────────────────────────────────
step "Restarting API"
pm2 restart rizqun-api --env production
ok "API restarted"
pm2 save
ok "PM2 process list saved"

# ─── Reload Nginx (pick up new static files) ──────────────────
step "Reloading Nginx"
sudo nginx -t && sudo systemctl reload nginx
ok "Nginx reloaded"

# ─── Summary ──────────────────────────────────────────────────
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Update complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Verify:"
echo -e "    pm2 status"
echo -e "    pm2 logs rizqun-api --lines 10"
echo -e "    curl https://rizqunbd.com/health"
echo ""
