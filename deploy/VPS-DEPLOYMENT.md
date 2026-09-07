# Rizqun — VPS Deployment Guide

Complete step-by-step guide to deploy `rizqunbd.com` on a VPS that already has
other projects running (Laravel + PostgreSQL, Laravel + MySQL, Node.js).

**Golden rule: we create a SEPARATE database, SEPARATE Nginx server block,
SEPARATE PM2 process, and check port conflicts — so your existing projects
are never affected.**

---

## 0. Architecture on your VPS after deployment

```
rizqunbd.com (your domain)
   │
   ├── /              → /var/www/rizqun-landing     (Vite static build)
   ├── /operation/    → /var/www/rizqun-operation   (Vite static build)
   ├── /api/          → proxy to localhost:3001     (Express via PM2)
   └── /health        → proxy to localhost:3001

PostgreSQL:  new database `rizqun_db` + user `rizqun_user`
             (your existing PostgreSQL DBs are untouched)
PM2:         process named `rizqun-api` on port 3001
Nginx:       new server block in /etc/nginx/sites-available/rizqun
```

> **Port note:** Rizqun API uses **port 3001** (not 3000) to avoid conflicting
> with your existing Node.js project. Change in `.env` if 3001 is also taken.

---

## 1. Prerequisites check (run this first)

```bash
# Clone the repo to a temp location and run the check script
cd /tmp
git clone https://github.com/sajidchowdhury/rizqun_admin.git rizqun-check
cd rizqun-check
chmod +x deploy/scripts/*.sh
./deploy/scripts/check-prerequisites.sh
```

The script verifies:
- ✅ Node.js ≥ 20
- ✅ npm ≥ 10
- ✅ PostgreSQL ≥ 14
- ✅ PM2 (installs if missing)
- ✅ Nginx
- ✅ Git
- ✅ Certbot (for SSL)
- ✅ Port 3001 is available (suggests alternatives if taken)

If anything is missing, the script prints the exact install command.

---

## 2. Create the project directory

```bash
# Choose a home for Rizqun — /var/www/rizqun or /home/rizqun or /opt/rizqun
# We'll use /var/www/rizqun (standard for web apps)
sudo mkdir -p /var/www/rizqun
sudo chown $USER:$USER /var/www/rizqun
cd /var/www/rizqun

# Clone the repo
git clone https://github.com/sajidchowdhury/rizqun_admin.git .
```

> The static builds will later go to `/var/www/rizqun-landing` and
> `/var/www/rizqun-operation` (separate from the source code).

---

## 3. Create a dedicated PostgreSQL database + user

**This is the most critical step — do NOT reuse an existing database or user.**

```bash
# Run the setup script (interactive — asks for the postgres superuser password)
cd /var/www/rizqun
./deploy/scripts/setup-database.sh
```

Or do it manually:

```bash
sudo -u postgres psql
```

```sql
-- Create a dedicated user (with CREATEDB for Prisma's shadow DB)
CREATE USER rizqun_user WITH PASSWORD 'choose_a_strong_password_here' CREATEDB;

-- Create a dedicated database owned by that user
CREATE DATABASE rizqun_db OWNER rizqun_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE rizqun_db TO rizqun_user;

-- Connect to the database and grant schema permissions
\c rizqun_db
GRANT ALL ON SCHEMA public TO rizqun_user;

\q
```

**Verify:**

```bash
PGPASSWORD='choose_a_strong_password_here' psql -U rizqun_user -d rizqun_db -h 127.0.0.1 -c "SELECT 1;"
```

> Your existing PostgreSQL databases (for Laravel etc.) are completely
> untouched — `rizqun_db` is isolated.

---

## 4. Configure environment variables

```bash
cd /var/www/rizqun/apps/operation/api
cp .env.example .env
nano .env
```

Set these values:

```env
NODE_ENV=production
PORT=3001                              # ← NOT 3000 (avoid conflict)
APP_BASE_URL=https://rizqunbd.com

# Database — use the user/password/db from step 3
DATABASE_URL=postgresql://rizqun_user:choose_a_strong_password_here@127.0.0.1:5432/rizqun_db?schema=public

# JWT secrets — generate with: openssl rand -hex 32
JWT_ACCESS_SECRET=<run: openssl rand -hex 32>
JWT_REFRESH_SECRET=<run: openssl rand -hex 32>
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=7d

# Super admin (for first login)
SUPER_ADMIN_EMAIL=admin@rizqunbd.com
SUPER_ADMIN_PASSWORD=ChangeThisToSomethingStrong!

# CORS — your production domain
CORS_ORIGINS=https://rizqunbd.com,https://www.rizqunbd.com

# API prefix (keep /api)
API_PREFIX=/api
```

```bash
# Generate JWT secrets
openssl rand -hex 32  # → copy to JWT_ACCESS_SECRET
openssl rand -hex 32  # → copy to JWT_REFRESH_SECRET

# Lock down permissions
chmod 600 .env
```

---

## 5. Install dependencies + build + migrate + seed

```bash
cd /var/www/rizqun
chmod +x deploy/scripts/deploy.sh
./deploy/scripts/deploy.sh
```

This script does:
1. `npm install` at root (workspaces)
2. Build the landing (`apps/landing/dist`)
3. Build the admin web (`apps/operation/web/dist` with `base: '/operation/'`)
4. Build the API (`apps/operation/api/dist`)
5. Run `prisma migrate deploy` (applies all migrations to `rizqun_db`)
6. Run `prisma db seed` (creates categories + super admin + landing defaults)
7. Copy static builds to `/var/www/rizqun-landing` and `/var/www/rizqun-operation`
8. Start the API with PM2

**Or run manually:**

```bash
# Install all workspace dependencies
cd /var/www/rizqun
npm install

# Build all three apps
npm run build:landing
npm run build:web
npm run build:api

# Migrate + seed the database
cd apps/operation/api
npx prisma migrate deploy
npx prisma db seed

# Copy static builds to web roots
sudo mkdir -p /var/www/rizqun-landing /var/www/rizqun-operation
sudo cp -r ../../landing/dist/* /var/www/rizqun-landing/
sudo cp -r ../web/dist/* /var/www/rizqun-operation/
sudo chown -R www-data:www-data /var/www/rizqun-landing /var/www/rizqun-operation

# Start the API with PM2
cd /var/www/rizqun/apps/operation/api
pm2 start ecosystem.config.js --env production
pm2 save
```

---

## 6. Configure Nginx

**Your existing Nginx sites are NOT touched — we add a new server block.**

```bash
# Copy the Rizqun Nginx config
sudo cp /var/www/rizqun/deploy/nginx/rizqun.conf /etc/nginx/sites-available/rizqun

# Edit it: replace YOUR_DOMAIN with rizqunbd.com
sudo nano /etc/nginx/sites-available/rizqun
#   → replace all "YOUR_DOMAIN" with "rizqunbd.com"
#   → verify the proxy_pass port is 3001 (matches your .env PORT)

# Enable the site
sudo ln -s /etc/nginx/sites-available/rizqun /etc/nginx/sites-enabled/

# Test config (must say "syntax is ok")
sudo nginx -t

# Reload Nginx (doesn't restart — your other sites keep running)
sudo systemctl reload nginx
```

---

## 7. SSL certificate (Let's Encrypt)

```bash
# Get the certificate (Certbot auto-edits the Nginx config)
sudo certbot --nginx -d rizqunbd.com -d www.rizqunbd.com

# Certbot sets up auto-renewal. Verify:
sudo certbot renew --dry-run
```

---

## 8. Verify the deployment

```bash
# 1. API health check
curl https://rizqunbd.com/health
# Expected: {"status":"ok","service":"rizqun-api",...}

# 2. Landing page
curl -s https://rizqunbd.com/ | head -5

# 3. Admin console
curl -s https://rizqunbd.com/operation/ | head -5

# 4. Public landing content API
curl https://rizqunbd.com/api/landing-content | jq .

# 5. PM2 status
pm2 status
# Should show "rizqun-api" as "online"

# 6. PM2 logs (check for errors)
pm2 logs rizqun-api --lines 20
```

---

## 9. Set up PM2 auto-start on reboot

```bash
pm2 save
pm2 startup
# → run the command it prints (usually: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER)
```

---

## 10. Set up database backups (nightly)

```bash
# The repo has backup scripts
cd /var/www/rizqun/deploy/backups
chmod +x backup.sh restore.sh

# Edit backup.sh to set your DB credentials
nano backup.sh
#   → DB_NAME="rizqun_db"
#   → DB_USER="rizqun_user"
#   → DB_PASS="choose_a_strong_password_here"
#   → BACKUP_DIR="/var/backups/rizqun"

# Test it
./backup.sh

# Add to cron (nightly at 2 AM)
sudo crontab -e
# Add this line:
0 2 * * * /var/www/rizqun/deploy/backups/backup.sh >> /var/log/rizqun-backup.log 2>&1
```

---

## Future updates

When you push new code to GitHub and want to update the server:

```bash
cd /var/www/rizqun
chmod +x deploy/scripts/update.sh
./deploy/scripts/update.sh
```

This script:
1. `git pull origin main`
2. `npm install` (if package.json changed)
3. Rebuilds landing + web + api
4. Runs `prisma migrate deploy` (applies any new migrations)
5. Copies new static builds to web roots
6. Restarts PM2

---

## Troubleshooting

### Port 3001 is already in use
```bash
sudo lsof -i :3001
# If something is using it, edit apps/operation/api/.env and change PORT to 3002 (or another free port)
# Then update deploy/nginx/rizqun.conf proxy_pass to match
# Restart: pm2 restart rizqun-api && sudo systemctl reload nginx
```

### Database connection failed
```bash
# Test the connection string
PGPASSWORD='your_password' psql -U rizqun_user -d rizqun_db -h 127.0.0.1 -c "SELECT 1;"

# Check PostgreSQL is listening
sudo systemctl status postgresql
sudo ss -tlnp | grep 5432
```

### Nginx config conflict with existing sites
```bash
# Check for conflicting server_name
grep -r "rizqunbd.com" /etc/nginx/sites-enabled/
# If another config claims the same domain, remove it or change the domain

# Test before reloading
sudo nginx -t
```

### PM2 process crashes
```bash
pm2 logs rizqun-api --err --lines 50
# Most common: .env not loaded, DB connection, or port conflict
pm2 restart rizqun-api
```

### Prisma migration errors
```bash
cd /var/www/rizqun/apps/operation/api
# Check migration status
npx prisma migrate status
# Reset (DESTRUCTIVE — only for fresh installs)
npx prisma migrate reset --force
# Re-run
npx prisma migrate deploy
```

---

## Quick reference — file locations

| What | Path |
|------|------|
| Source code | `/var/www/rizqun/` |
| API .env | `/var/www/rizqun/apps/operation/api/.env` |
| API build | `/var/www/rizqun/apps/operation/api/dist/` |
| Landing static | `/var/www/rizqun-landing/` |
| Admin static | `/var/www/rizqun-operation/` |
| Nginx config | `/etc/nginx/sites-available/rizqun` |
| PM2 logs | `~/.pm2/logs/rizqun-api-out.log` + `rizqun-api-error.log` |
| DB backups | `/var/backups/rizqun/` |
| Certbot certs | `/etc/letsencrypt/live/rizqunbd.com/` |

---

## What this deployment does NOT touch

- ✅ Your existing Laravel + PostgreSQL project
- ✅ Your existing Laravel + MySQL project
- ✅ Your existing Node.js project
- ✅ Your existing Nginx sites
- ✅ Your existing PM2 processes
- ✅ Your existing PostgreSQL databases (except creating the new `rizqun_db`)

Everything Rizqun needs is isolated: separate database, separate user, separate
Nginx server block, separate PM2 process, separate port.
