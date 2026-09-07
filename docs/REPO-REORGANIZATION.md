# Rizqun — Repo Reorganization Plan (`rizqunbd.com` + `rizqunbd.com/operation`)

**Goal:** Restructure the existing `rizqun_admin` repo from a flat "admin-only"
layout into a **workspace monorepo** with two independently deployable apps:

| URL | App | Source folder |
|-----|-----|---------------|
| `rizqunbd.com/` | Public landing page (new) | `apps/landing/` |
| `rizqunbd.com/operation` | Admin/operator console (existing) | `apps/operation/web/` |
| `rizqunbd.com/api/*` | Express backend (existing) | `apps/operation/api/` |

The landing page is a **static single-page site** whose only job is to funnel
visitors to WhatsApp (no cart, no payment, no login). The admin console is the
existing Vite + React app. The Express API is unchanged except for being mounted
under a `/api` prefix.

---

## 1. Target directory structure

```
rizqun/
├── apps/
│   ├── landing/                       # NEW — public landing (rizqunbd.com /)
│   │   ├── public/
│   │   │   ├── manifest.webmanifest   # PWA manifest
│   │   │   └── icons/                 # PWA icons (192/512)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   ├── sections/              # hero, neki, services, trust, founder, cta
│   │   │   ├── components/            # header, footer, floating-whatsapp
│   │   │   └── lib/whatsapp.ts        # WA click-to-chat link builder
│   │   ├── index.html
│   │   ├── vite.config.ts             # base: '/'
│   │   └── package.json
│   └── operation/                     # EXISTING admin (rizqunbd.com/operation)
│       ├── api/                       # = old ./src  (Express backend)
│       │   ├── src/
│       │   ├── prisma/                # = old ./prisma
│       │   ├── scripts/               # = old ./scripts
│       │   ├── .env.example
│       │   ├── package.json           # express, prisma, etc.
│       │   └── tsconfig.json
│       └── web/                       # = old ./ui   (Vite React admin)
│           ├── src/
│           ├── public/
│           ├── index.html
│           ├── vite.config.ts         # base: '/operation/'
│           └── package.json
├── deploy/
│   ├── nginx/rizqun.conf              # UPDATED — see §4
│   └── backups/                       # unchanged
├── docs/                              # plans + guides (move *.md here)
│   ├── REPO-REORGANIZATION.md
│   └── LANDING-IMPLEMENTATION-PLAN.md
├── package.json                       # workspace root
├── .gitignore
└── README.md
```

---

## 2. Exact migration commands (run once, from repo root)

```bash
# from the repo root (currently flat: src/, ui/, prisma/, scripts/)

# 2.1 Create the monorepo skeleton
mkdir -p apps/landing apps/operation

# 2.2 Move the existing admin backend into apps/operation/api
git mv src      apps/operation/api/src
git mv prisma   apps/operation/api/prisma
git mv scripts  apps/operation/api/scripts
git mv ecosystem.config.js   apps/operation/api/ecosystem.config.js
git mv eslint.config.mjs     apps/operation/api/eslint.config.mjs
git mv tsconfig.json         apps/operation/api/tsconfig.json
git mv .env.example          apps/operation/api/.env.example

# 2.3 Move the existing admin frontend into apps/operation/web
git mv ui      apps/operation/web

# 2.4 Park the big planning docs under docs/
mkdir -p docs
git mv implementation-guide.md          docs/
git mv implementation-plan.md           docs/
git mv frontend-implementation-plan.md  docs/
git mv sir_*.md                         docs/

# 2.5 Create the landing app scaffold (Phase 1 of LANDING-IMPLEMENTATION-PLAN.md)
mkdir -p apps/landing/src/{sections,components,lib} apps/landing/public/icons
```

---

## 3. Config edits required after the moves

### 3.1 Root `package.json` (new — workspace root, no runtime deps)

```jsonc
{
  "name": "rizqun",
  "private": true,
  "workspaces": ["apps/landing", "apps/operation/api", "apps/operation/web"],
  "scripts": {
    "dev:landing":   "npm -w apps/landing run dev",
    "dev:api":       "npm -w apps/operation/api run dev",
    "dev:web":       "npm -w apps/operation/web run dev",
    "build:landing": "npm -w apps/landing run build",
    "build:api":     "npm -w apps/operation/api run build",
    "build:web":     "npm -w apps/operation/web run build",
    "build":         "npm run build:landing && npm run build:web && npm run build:api",
    "start:api":     "npm -w apps/operation/api run start",
    "lint":          "npm -w apps/landing run lint && npm -w apps/operation/api run lint && npm -w apps/operation/web run lint"
  },
  "engines": { "node": ">=20" }
}
```

### 3.2 `apps/operation/api/package.json`

- Copy **dependencies** + **devDependencies** + `prisma.seed` from the old root `package.json`.
- Set `"prisma": { "schema": "./prisma/schema.prisma", "seed": "tsx prisma/seed.ts" }`.
- Update PM2 `ecosystem.config.js` `cwd` → `apps/operation/api`.

### 3.3 `apps/operation/web/vite.config.ts` — add `base: '/operation/'`

```ts
export default defineConfig({
  base: '/operation/',          // ← NEW: all admin assets under /operation
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } },
  },
})
```

### 3.4 `apps/operation/web/src/lib/api.ts` — switch to `/api` prefix

```ts
const BASE = import.meta.env.VITE_API_BASE ?? '/api'
// every request becomes `${BASE}/auth/login`, `${BASE}/orders`, etc.
```

`.env.example`: `VITE_API_BASE=/api`

### 3.5 `apps/operation/api/src/app.ts` — mount routes under `/api`

```ts
const API_PREFIX = process.env.API_PREFIX ?? '/api'
app.use(`${API_PREFIX}/auth`,       authRouter)
app.use(`${API_PREFIX}/vendors`,    vendorsRouter)
app.use(`${API_PREFIX}/products`,   productsRouter)
app.use(`${API_PREFIX}/orders`,     ordersRouter)
app.use(`${API_PREFIX}/ratings`,    ratingsRouter)
app.use(`${API_PREFIX}/users`,      usersRouter)
app.use(`${API_PREFIX}/categories`, categoriesRouter)
app.use(`${API_PREFIX}/dashboard`,  dashboardRouter)
app.get('/health', healthHandler)   // stays at root for uptime checks
```

> **Public rating endpoints** (`POST /ratings`, `GET /orders/rating-form/:token`)
> are consumed by the landing page's rating widget — they stay public, now
> reachable at `rizqunbd.com/api/ratings` and `rizqunbd.com/api/orders/rating-form/:token`.

### 3.6 `apps/operation/api/.env.example` — new vars

```
API_PREFIX=/api
CORS_ORIGINS=https://rizqunbd.com,https://www.rizqunbd.com
APP_BASE_URL=https://rizqunbd.com
WHATSAPP_NUMBER=8801XXXXXXXXX
```

---

## 4. Nginx config — one domain, three locations

```nginx
server {
    listen 443 ssl http2;
    server_name rizqunbd.com www.rizqunbd.com;

    ssl_protocols TLSv1.2 TLSv1.3;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;

    # ── Landing page (rizqunbd.com /) ───────────────────────────────
    root /var/www/rizqun-landing;
    index index.html;
    location = / { try_files /index.html =404; }
    location / { try_files $uri $uri/ /index.html; }

    # ── Admin console (rizqunbd.com/operation) ──────────────────────
    location /operation/ {
        alias /var/www/rizqun-operation/;
        try_files $uri $uri/ /operation/index.html;
    }

    # ── API (rizqunbd.com/api) → Node.js on :3000 ───────────────────
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location = /health { proxy_pass http://127.0.0.1:3000; }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 30d; add_header Cache-Control "public, immutable";
    }
    gzip on; gzip_types text/plain text/css application/json application/javascript;
}
```

**Deploy build:**

```bash
npm run build:landing   # → apps/landing/dist            → /var/www/rizqun-landing
npm run build:web       # → apps/operation/web/dist      → /var/www/rizqun-operation
npm run build:api       # → apps/operation/api/dist
pm2 restart rizqun-api  # runs apps/operation/api/dist/server.js
```

---

## 5. Why this structure

- **Clean URL contract** — `/`, `/operation`, `/api` never overlap.
- **Independent deploys** — landing can ship a typo fix without touching admin/API.
- **No coupling** — landing only knows the WhatsApp number + (later) public rating endpoints.
- **Preserves the existing admin** — same Express + Vite code, just relocated and namespaced.
- **Workspace tooling** — one `npm install` at root hoists shared deps.

---

## 6. Migration checklist

- [ ] Run the `git mv` block in §2.
- [ ] Create root `package.json` (§3.1) + the three sub-`package.json` files.
- [ ] Add `base: '/operation/'` to admin Vite config (§3.3).
- [ ] Switch admin API client to `/api` prefix (§3.4).
- [ ] Mount Express routes under `/api` (§3.5).
- [ ] Update `ecosystem.config.js` `cwd` → `apps/operation/api`.
- [ ] Replace `deploy/nginx/rizqun.conf` (§4).
- [ ] `npm install` at root; smoke-test admin (`dev:api` + `dev:web`).
- [ ] Scaffold `apps/landing/` per `docs/LANDING-IMPLEMENTATION-PLAN.md`.
- [ ] Commit on branch `chore/monorepo-reorg`, open PR.
