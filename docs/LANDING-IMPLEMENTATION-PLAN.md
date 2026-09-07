# Rizqun Landing Page — Phase-by-Phase Implementation Plan

A **single-page, mobile-first, WhatsApp-funnel landing page** for
`rizqunbd.com`. No cart, no checkout, no login. Every CTA opens WhatsApp with a
prefilled Bengali message. Built as a static site (Vite + React + Tailwind, or
Next.js static export) so it loads fast on Feni-grade mobile internet and can be
installed as a PWA.

The build is split into **8 sessions**. Each session is independently shippable
and reviewable.

---

## Design system (locked in Session 1, used everywhere)

| Token | Value | Use |
|-------|-------|-----|
| Primary | Emerald `#0f766e` / `oklch(0.51 0.11 172)` | headers, primary buttons, accents |
| Primary-deep | `#064e3b` | hero gradient base |
| Background | Cream `#fbf7ef` | page background (soft, not pure white) |
| Surface | `#ffffff` | cards |
| Accent (gold/sand) | `#c8a24a` / `#b8860b` | "Neki" highlights, dividers |
| Text | `#1c2b27` (deep green-black) | body |
| Muted | `#5b6b66` | secondary text |
| Font (Bengali) | `Hind Siliguri`, fallback `Kalpurush` | all Bengali text |
| Font (Latin/numerals) | `Inter` or system | prices, numbers |
| Radius | `0.75rem–1rem` | cards, buttons |
| Touch target | `min 44px` | all interactive elements |

WhatsApp link (reused everywhere):

```
https://wa.me/8801XXXXXXXXX?text=আসসালামু%20আলাইকুম,%20আমি%20রিজকুনে%20অর্ডার%20করতে%20চাই
```

Centralised in `src/lib/whatsapp.ts` so the number changes in one place.

---

## Session 0 — Repo reorganization (prerequisite)

See `docs/REPO-REORGANIZATION.md`. Creates the `apps/landing/` workspace slot.
**Exit criteria:** `apps/landing/` exists with its own `package.json` and
`vite.config.ts` (`base: '/'`).

---

## Session 1 — Foundation & design system

**Goal:** a runnable, empty-but-styled shell that renders the font + palette and
a sticky header/footer skeleton.

**Files:**
- `apps/landing/index.html` — loads `Hind Siliguri` from Google Fonts, sets `lang="bn"`, viewport meta, theme-color.
- `apps/landing/src/main.tsx`, `src/App.tsx`.
- `apps/landing/src/index.css` — Tailwind v4 `@theme` tokens for the palette above.
- `apps/landing/src/lib/whatsapp.ts` — `waLink(message?)` builder.
- `apps/landing/src/components/site-header.tsx` — sticky top bar: logo (রিজকুন wordmark) + small WhatsApp button.
- `apps/landing/src/components/site-footer.tsx` — sticky-bottom footer (per layout rules): contact, hours, quick links, copyright.
- `apps/landing/public/manifest.webmanifest` + `icons/` (192/512) — PWA scaffold.

**Exit criteria:** page loads on mobile width with correct Bengali font, cream
background, sticky header & footer, no layout shift. Lighthouse mobile
performance ≥ 90 on the empty shell.

---

## Session 2 — Hero section (Discovery & Connection)

**Goal:** the 3-second hook. Visitor instantly knows *what* Rizqun is and *how* to order.

**Layout:** mobile-first. Text left, hero image right on `md+`.

**Content (Bengali, from the concept):**
- H1: `আপনার বাজার করার ঝামেলা, এখন আমাদের। আপনার পরিবারের নিরাপত্তা আর সময়—দুটোই বাঁচছে।`
- Sub (3F formula): Feelings → Frustration → Future Hope (the three lines from the concept).
- Primary CTA: big emerald button → WhatsApp. Label: `অর্ডার করতে হোয়াটসঅ্যাপে নক করুন`.
- Trust micro-row under CTA: `বাজার মূল্য • যাচাই করা পণ্য • নিরাপদ ডেলিভারি`.

**Files:** `src/sections/hero.tsx`, hero image asset.

**Exit criteria:** hero renders full-viewport on mobile, CTA opens WhatsApp with
prefilled message, no horizontal scroll, image lazy-loaded.

---

## Session 3 — Neki Magic (Trust & Magnetism)

**Goal:** explain the "charity portion" mechanic — the brand's differentiator.

**Content:**
- Heading: `রিজকুন শুধু একটি ডেলিভারি সার্ভিস নয়।`
- Body: every purchase sends a fixed % to the "Neki Basket" fund for scholars/madrasa.
- Visual: SVG infographic — a basket of daily goods splitting into two flows: one to the customer's door, one (gold) to a madrasa/scholar icon. Plus a **Neki Meter** progress bar showing the fund filling.
- Secondary CTA: `বিস্তারিত জানুন` (scrolls to trust section or opens a modal).

**Files:** `src/sections/neki-magic.tsx`, `src/components/neki-meter.tsx`, SVG/`neki-basket.png`.

**Exit criteria:** infographic is crisp on mobile, Neki Meter animates on scroll-into-view, copy is accurate.

---

## Session 4 — Service categories (Core Offer)

**Goal:** show *what* you can order — without listing prices or a catalog.

**Cards (4):**
1. গ্রোসারি ও কাঁচাবাজার — icon `Leaf` / fresh-veg image.
2. মেডিসিন — icon `Pill` / pharmacy image.
3. হোম সার্ভিস ও ইলেকট্রিক সাপোর্ট — icon `Wrench` / `Plug`.
4. জরুরি সেবা (এম্বুলেন্স ও ব্লাড) — icon `Ambulance` / `Droplet`.

Footer line: `আপনার দৈনন্দিন যেকোনো প্রয়োজন—আমরা বিশ্বস্তভাবে আপনার দরজায় পৌঁছে দেব।`

Each card has a small `অর্ডার করুন` link → WhatsApp with a category-specific prefilled message.

**Files:** `src/sections/services.tsx`, `src/components/service-card.tsx`.

**Exit criteria:** 2×2 grid on mobile, 4-across on desktop, each card tappable, hover/tap feedback.

---

## Session 5 — Amanat & Purity (Why Choose Us)

**Goal:** Satisfaction. Four trust pillars with icons.

**Points:**
1. বাজার মূল্য — `আপনি বাজারের চেয়ে এক টাকাও বেশি দেবেন না।` icon `BadgePercent`.
2. যাচাই করা পণ্য — `মেয়াদ শেষ বা ভেজাল পণ্যের কোনো সম্ভাবনা নেই।` icon `ShieldCheck`.
3. নিরাপদ ডেলিভারি — `আমাদের কর্মীরা আমানতদার এবং বিনয়ী।` icon `Truck`.
4. হোয়াটসঅ্যাপ সাপোর্ট — `কোনো ঝামেলা ছাড়াই সরাসরি মেসেজে অর্ডার।` icon `MessageCircle`.

**Files:** `src/sections/trust.tsx`, `src/components/trust-item.tsx`.

**Exit criteria:** 1-col mobile / 2×2 desktop, icons render in emerald, consistent spacing.

---

## Session 6 — Founder message & social proof (Loyalty & Advocacy)

**Goal:** H2H (Heart to Heart) voice; build emotional trust.

**Content:**
- Founder card: short message — `আমরা চাই, আপনার পরিবারের সাথে আমাদের সম্পর্ক হোক H2H (Heart to Heart)...` (full line from concept).
- If real ratings exist: pull from `/api/ratings` public summary (avg stars + count) — optional, behind a feature flag.
- If no ratings yet: show a tasteful "আপনার বিশ্বস্ততাই আমাদের আখিরাতের সওয়াবের কারণ।" quote block.

**Files:** `src/sections/founder.tsx`, `src/components/star-rating.tsx`.

**Exit criteria:** message reads sincerely, no placeholder lorem, mobile typography comfortable for reading.

---

## Session 7 — Final CTA + floating WhatsApp + scroll polish

**Goal:** convert the bottom-of-page visitor.

**Content:**
- Full-width emerald band: `একটি ক্লিকেই আপনার প্রয়োজন আমাদের জানান।` + giant `আজই অর্ডার করুন` button → WhatsApp.
- **Floating WhatsApp button**: fixed bottom-right, always visible, pulse animation, opens WhatsApp. Respects safe-area inset on iOS.
- Smooth-scroll for in-page nav links (header → sections).
- Framer Motion: subtle fade/slide-up on section enter (respect `prefers-reduced-motion`).

**Files:** `src/sections/final-cta.tsx`, `src/components/floating-whatsapp.tsx`, `src/components/section-reveal.tsx`.

**Exit criteria:** floating button never overlaps footer CTA awkwardly; animations don't cause layout shift; reduced-motion users see static content.

---

## Session 8 — PWA, SEO, performance, launch

**Goal:** installable, discoverable, fast.

**Tasks:**
- `manifest.webmanifest`: name `রিজকুন`, short `রিজকুন`, display `standalone`, theme/background colors, icons 192/512 (maskable).
- Service worker via `vite-plugin-pwa` (or Next.js PWA): precache shell + images, runtime cache fonts.
- SEO: `<title>রিজকুন — ঘরে বসে বাজার, মেডিসিন ও জরুরি সেবা</title>`, meta description (Bengali), `og:` tags, `og:image` (hero), `lang="bn"`, JSON-LD `LocalBusiness`.
- Performance: lazy-load below-fold images (`loading="lazy"`), `preload` hero image + Hind Siliguri subsets, inline critical CSS, compress images to WebP/AVIF.
- Accessibility: all buttons have `aria-label`, color contrast ≥ 4.5:1, keyboard-focusable, `prefers-reduced-motion` honored.
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO = 100, PWA installable.

**Exit criteria:** "Add to Home Screen" works on Android + iOS Safari; Lighthouse passes; Bengali OG card renders correctly when sharing on WhatsApp/Facebook.

---

## Post-launch (optional, later)

- Wire the public rating widget (`/api/orders/rating-form/:token`) so delivered customers can rate from the landing — reuses the existing rating endpoints.
- Add a lightweight "অফার/নোটিশ" banner slot (CMS-driven via admin, read from `/api/...`).
- Analytics: privacy-friendly event tracking on WhatsApp clicks (Plausible/Umami).
