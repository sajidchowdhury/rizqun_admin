# Rizqun

**Order-taking hub + admin console for a Bangladeshi grocery, medicine & home-service delivery business.**

Customers land on a single-page WhatsApp-funnel site, click one button, and order via WhatsApp. Operators manage orders, vendors, products, and deliveries through the admin console.

## Monorepo structure

```
rizqun/
├── apps/
│   ├── landing/              # Public landing page (rizqunbd.com /)
│   │                         #   Vite + React + Tailwind — static, WhatsApp funnel
│   └── operation/            # Admin + API
│       ├── api/              # Express + Prisma + PostgreSQL (rizqunbd.com/api)
│       └── web/              # Vite + React admin console (rizqunbd.com/operation)
├── deploy/
│   ├── nginx/rizqun.conf     # One domain, three locations: /, /operation/, /api/
│   └── backups/              # DB backup scripts
└── docs/                     # Plans + guides
```

| URL | App | Tech |
|-----|-----|------|
| `rizqunbd.com/` | Public landing page | Vite + React + Tailwind v4 |
| `rizqunbd.com/operation/` | Admin/operator console | Vite + React + shadcn/ui |
| `rizqunbd.com/api/*` | Backend API | Express + Prisma + PostgreSQL |
| `rizqunbd.com/health` | Health check | Express (no prefix) |

## Quick start

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- PostgreSQL ≥ 14

### Install (all workspaces)

```bash
npm install
```

### Develop

```bash
npm run dev:api       # Express API on :3000
npm run dev:web       # Admin console on :5173 (proxies /api → :3000)
npm run dev:landing   # Landing page on :5174
```

### Database setup (API)

```bash
cd apps/operation/api
cp .env.example .env
# edit .env — set DATABASE_URL, JWT secrets, API_PREFIX=/api

# create + migrate
npx prisma migrate dev --name init

# seed (categories + super admin)
npx prisma db seed
```

### Build all

```bash
npm run build
# → apps/landing/dist          (deploy to /var/www/rizqun-landing)
# → apps/operation/web/dist    (deploy to /var/www/rizqun-operation)
# → apps/operation/api/dist    (run via PM2)
```

### Production deploy

```bash
# API
pm2 start apps/operation/api/ecosystem.config.js --env production

# Static sites
cp -r apps/landing/dist /var/www/rizqun-landing
cp -r apps/operation/web/dist /var/www/rizqun-operation

# Nginx
cp deploy/nginx/rizqun.conf /etc/nginx/sites-available/rizqun
ln -s /etc/nginx/sites-available/rizqun /etc/nginx/sites-enabled/
certbot --nginx -d rizqunbd.com -d www.rizqunbd.com
nginx -t && systemctl reload nginx
```

## Documentation

- [`docs/REPO-REORGANIZATION.md`](./docs/REPO-REORGANIZATION.md) — how the repo was reorganized into a monorepo
- [`docs/LANDING-IMPLEMENTATION-PLAN.md`](./docs/LANDING-IMPLEMENTATION-PLAN.md) — phase-by-phase landing build plan
- [`docs/implementation-guide.md`](./docs/implementation-guide.md) — full system design (admin)
- [`docs/implementation-plan.md`](./docs/implementation-plan.md) — phase-by-phase admin build plan

## Configuration notes

- **WhatsApp number**: set in `apps/landing/src/lib/whatsapp.ts` (`WHATSAPP_NUMBER` constant). All CTAs read from this single source.
- **API prefix**: all Express routes are mounted under `/api` (configurable via `API_PREFIX` env var). `/health` stays at root.
- **Admin base path**: the admin Vite app uses `base: '/operation/'` and the React Router `basename` matches.
- **CORS**: set `CORS_ORIGINS` in `apps/operation/api/.env` to include your production domain.
