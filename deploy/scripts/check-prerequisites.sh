#!/usr/bin/env bash
#
# Rizqun VPS — Prerequisites Check
#
# Verifies the server has everything needed to run Rizqun.
# Does NOT install anything — only checks and prints instructions.
#
# Usage:  ./deploy/scripts/check-prerequisites.sh
#
set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

ok()    { echo -e "  ${GREEN}✓${NC} $1"; }
fail()  { echo -e "  ${RED}✗${NC} $1"; NEEDS_FIX=1; }
warn()  { echo -e "  ${YELLOW}⚠${NC} $1"; }
info()  { echo -e "  ${BLUE}ℹ${NC} $1"; }

NEEDS_FIX=0

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Rizqun VPS — Prerequisites Check${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}\n"

# ─── Node.js ──────────────────────────────────────────────────
echo -e "${BLUE}Node.js${NC}"
if command -v node &>/dev/null; then
  NODE_VERSION=$(node -v | sed 's/v//')
  NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 20 ]; then
    ok "Node.js v$NODE_VERSION (≥ 20)"
  else
    fail "Node.js v$NODE_VERSION — needs ≥ 20"
    info "  Fix: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs"
  fi
else
  fail "Node.js not found"
  info "  Fix: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs"
fi

# ─── npm ──────────────────────────────────────────────────────
echo -e "\n${BLUE}npm${NC}"
if command -v npm &>/dev/null; then
  NPM_VERSION=$(npm -v)
  NPM_MAJOR=$(echo "$NPM_VERSION" | cut -d. -f1)
  if [ "$NPM_MAJOR" -ge 10 ]; then
    ok "npm v$NPM_VERSION (≥ 10)"
  else
    fail "npm v$NPM_VERSION — needs ≥ 10"
    info "  Fix: npm install -g npm@latest"
  fi
else
  fail "npm not found"
  info "  Fix: npm install -g npm@latest"
fi

# ─── PostgreSQL ───────────────────────────────────────────────
echo -e "\n${BLUE}PostgreSQL${NC}"
if command -v psql &>/dev/null; then
  PG_VERSION=$(psql --version | awk '{print $3}')
  PG_MAJOR=$(echo "$PG_VERSION" | cut -d. -f1)
  if [ "$PG_MAJOR" -ge 14 ]; then
    ok "PostgreSQL v$PG_VERSION (≥ 14)"
  else
    warn "PostgreSQL v$PG_VERSION — recommend ≥ 14 (may still work)"
  fi
  # Check it's running
  if sudo systemctl is-active --quiet postgresql 2>/dev/null || pg_isready &>/dev/null; then
    ok "PostgreSQL service is running"
  else
    fail "PostgreSQL service is not running"
    info "  Fix: sudo systemctl start postgresql && sudo systemctl enable postgresql"
  fi
else
  fail "PostgreSQL not found"
  info "  Fix: sudo apt install -y postgresql postgresql-contrib"
fi

# ─── PM2 ──────────────────────────────────────────────────────
echo -e "\n${BLUE}PM2 (process manager)${NC}"
if command -v pm2 &>/dev/null; then
  PM2_VERSION=$(pm2 -v)
  ok "PM2 v$PM2_VERSION"
else
  warn "PM2 not found — will install during deployment"
  info "  Fix (optional, pre-install): sudo npm install -g pm2"
fi

# ─── Nginx ────────────────────────────────────────────────────
echo -e "\n${BLUE}Nginx (reverse proxy)${NC}"
if command -v nginx &>/dev/null; then
  NGINX_VERSION=$(nginx -v 2>&1 | awk -F/ '{print $2}')
  ok "Nginx v$NGINX_VERSION"
  if sudo systemctl is-active --quiet nginx 2>/dev/null; then
    ok "Nginx service is running"
  else
    fail "Nginx service is not running"
    info "  Fix: sudo systemctl start nginx && sudo systemctl enable nginx"
  fi
else
  fail "Nginx not found"
  info "  Fix: sudo apt install -y nginx"
fi

# ─── Git ──────────────────────────────────────────────────────
echo -e "\n${BLUE}Git${NC}"
if command -v git &>/dev/null; then
  GIT_VERSION=$(git --version | awk '{print $3}')
  ok "Git v$GIT_VERSION"
else
  fail "Git not found"
  info "  Fix: sudo apt install -y git"
fi

# ─── Certbot (for SSL) ────────────────────────────────────────
echo -e "\n${BLUE}Certbot (Let's Encrypt SSL)${NC}"
if command -v certbot &>/dev/null; then
  ok "Certbot installed"
else
  warn "Certbot not found — needed for HTTPS"
  info "  Fix: sudo apt install -y certbot python3-certbot-nginx"
fi

# ─── Port 3001 availability ───────────────────────────────────
echo -e "\n${BLUE}Port 3001 (Rizqun API)${NC}"
PORT=3001
if command -v ss &>/dev/null; then
  if ss -tlnp 2>/dev/null | grep -q ":$PORT "; then
    fail "Port $PORT is already in use"
    info "  Currently used by:"
    ss -tlnp 2>/dev/null | grep ":$PORT " | head -3 | sed 's/^/    /'
    info "  Fix: edit apps/operation/api/.env and change PORT to 3002 (or another free port)"
    info "       then update deploy/nginx/rizqun.conf proxy_pass to match"
  else
    ok "Port $PORT is available"
  fi
else
  warn "Cannot check port availability (ss not found)"
fi

# ─── Disk space ───────────────────────────────────────────────
echo -e "\n${BLUE}Disk space${NC}"
AVAILABLE_GB=$(df -BG / | awk 'NR==2 {print $4}' | tr -d 'G')
if [ "$AVAILABLE_GB" -ge 5 ]; then
  ok "${AVAILABLE_GB}GB available (need ≥ 5GB)"
else
  warn "Only ${AVAILABLE_GB}GB available — recommend ≥ 5GB"
fi

# ─── Existing rizqun database check ───────────────────────────
echo -e "\n${BLUE}Existing 'rizqun_db' check${NC}"
if command -v psql &>/dev/null; then
  if sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='rizqun_db'" 2>/dev/null | grep -q 1; then
    warn "Database 'rizqun_db' already exists"
    info "  If this is a re-deployment, that's OK — migrations will update it."
    info "  If this is a fresh install, consider dropping it: sudo -u postgres dropdb rizqun_db"
  else
    ok "Database 'rizqun_db' does not exist yet (will be created)"
  fi
fi

# ─── Summary ──────────────────────────────────────────────────
echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════${NC}"
if [ "$NEEDS_FIX" -eq 0 ]; then
  echo -e "${GREEN}  ✓ All prerequisites met! Ready to deploy.${NC}"
else
  echo -e "${RED}  ✗ Some prerequisites need attention. Fix the items above, then re-run this script.${NC}"
fi
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}\n"

exit $NEEDS_FIX
