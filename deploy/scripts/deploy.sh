#!/usr/bin/env bash
#
# Rizqun VPS — Full Deployment Script
#
# Run this ONCE after:
#   1. Cloning the repo to /var/www/rizqun
#   2. Running setup-database.sh
#   3. Editing apps/operation/api/.env
#
# This script:
#   - Installs all workspace dependencies
#   - Builds landing + admin web + API
#   - Runs Prisma migrations + seed
#   - Copies static builds to web roots
#   - Starts the API with PM2
#
# Usage:  ./deploy/scripts/deploy.sh
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
step()  { echo -e "\n${BLUE}── $1 ──${NC}"; }

# ─── Resolve paths ────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

info "Repo root: $REPO_ROOT"

# ─── Pre-flight checks ────────────────────────────────────────
step "Pre-flight checks"

[ -f "apps/operation/api/.env" ] || fail ".env not found at apps/operation/api/.env — copy .env.example and edit it first."
ok ".env exists"

[ -f "apps/operation/api/ecosystem.config.js" ] || fail "ecosystem.config.js not found"
ok "ecosystem.config.js exists"

command -v node &>/dev/null || fail "Node.js not installed. Run check-prerequisites.sh first."
ok "Node.js $(node -v)"

command -v npm &>/dev/null || fail "npm not installed."
ok "npm $(npm -v)"

# Check PM2 — install if missing
if ! command -v pm2 &>/dev/null; then
  info "PM2 not found — installing globally..."
  sudo npm install -g pm2
fi
ok "PM2 $(pm2 -v)"

# ─── Install dependencies ─────────────────────────────────────
step "Installing workspace dependencies"
npm install
ok "Dependencies installed"

# ─── Build landing ────────────────────────────────────────────
step "Building landing page (apps/landing)"
npm run build:landing
ok "Landing built → apps/landing/dist/"

# ─── Build admin web ──────────────────────────────────────────
step "Building admin console (apps/operation/web)"
npm run build:web
ok "Admin web built → apps/operation/web/dist/ (base: /operation/)"

# ─── Build API ────────────────────────────────────────────────
step "Building API (apps/operation/api)"
npm run build:api
ok "API built → apps/operation/api/dist/"

# ─── Run Prisma migrations ────────────────────────────────────
step "Running Prisma migrations"
cd "$REPO_ROOT/apps/operation/api"

# Generate Prisma client (needed after schema changes)
npx prisma generate
ok "Prisma client generated"

# Apply all migrations (non-interactive — safe for production)
npx prisma migrate deploy
ok "Migrations applied"

# ─── Seed the database ────────────────────────────────────────
step "Seeding database (idempotent — safe to re-run)"
# Unset system DATABASE_URL if it conflicts with .env
unset DATABASE_URL 2>/dev/null || true
npx prisma db seed
ok "Seed complete (categories + super admin + landing content)"

# ─── Copy static builds to web roots ──────────────────────────
step "Deploying static files to web roots"

sudo mkdir -p /var/www/rizqun-landing /var/www/rizqun-operation

# Landing
sudo rm -rf /var/www/rizqun-landing/*
sudo cp -r "$REPO_ROOT/apps/landing/dist/"* /var/www/rizqun-landing/
ok "Landing deployed → /var/www/rizqun-landing/"

# Admin web
sudo rm -rf /var/www/rizqun-operation/*
sudo cp -r "$REPO_ROOT/apps/operation/web/dist/"* /var/www/rizqun-operation/
ok "Admin web deployed → /var/www/rizqun-operation/"

# Set ownership (www-data is the Nginx user on Debian/Ubuntu)
sudo chown -R www-data:www-data /var/www/rizqun-landing /var/www/rizqun-operation
ok "Ownership set to www-data:www-data"

# ─── Start API with PM2 ───────────────────────────────────────
step "Starting API with PM2"

# Stop existing process if any (for re-deploys)
pm2 delete rizqun-api 2>/dev/null || true

# Start with production env
pm2 start ecosystem.config.js --env production
ok "API started: pm2 rizqun-api"

# Save PM2 process list (enables auto-restart on reboot)
pm2 save
ok "PM2 process list saved"

# ─── Enable PM2 startup (auto-start on reboot) ────────────────
if ! pm2 startup 2>&1 | grep -q "already"; then
  info "To enable PM2 auto-start on reboot, run the command PM2 prints above."
  info "  (usually: sudo env PATH=\$PATH:/usr/bin pm2 startup systemd -u \$USER --hp /home/\$USER)"
fi

# ─── Summary ──────────────────────────────────────────────────
cd "$REPO_ROOT"
step "Deployment complete!"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Rizqun deployed successfully!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Next steps:"
echo -e "  ${BLUE}1.${NC} Configure Nginx:"
echo -e "     sudo cp deploy/nginx/rizqun.conf /etc/nginx/sites-available/rizqun"
echo -e "     sudo nano /etc/nginx/sites-available/rizqun  # replace YOUR_DOMAIN"
echo -e "     sudo ln -s /etc/nginx/sites-available/rizqun /etc/nginx/sites-enabled/"
echo -e "     sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo -e "  ${BLUE}2.${NC} Get SSL certificate:"
echo -e "     sudo certbot --nginx -d rizqunbd.com -d www.rizqunbd.com"
echo ""
echo -e "  ${BLUE}3.${NC} Verify:"
echo -e "     curl https://rizqunbd.com/health"
echo -e "     pm2 status"
echo -e "     pm2 logs rizqun-api --lines 20"
echo ""
