# Gods Truth — Build Progress
> Project: Gods Truth (www.godstruth.net)
> Stack: Next.js 14 · TypeScript · Tailwind · Prisma · NextAuth · UploadThing · Stripe
> Last updated: 2026-03-30

---

## ✅ COMPLETED

### All Build Tasks (1–10)

- [x] **Task 1 — Foundation**: All lib files, config, middleware, globals, layout, types
- [x] **Task 2 — Providers & API Core**: Auth, UploadThing, Stripe webhook, Content, Progress routes
- [x] **Task 3 — Shared Components**: Full UI library (Button, Badge, Input, Card, Dialog, Select, Switch, Tabs, Avatar, Toast) + Navbar + Footer
- [x] **Task 4 — Marketing Landing Page**: Hero, Feature columns, CTA sections
- [x] **Task 5 — Auth Pages**: Login, Register (credentials + Google OAuth)
- [x] **Task 6 — Knowledge Section**: Hub page, content detail, ContentCard/Grid/Filter, VideoPlayer, AudioPlayer, PDFViewer
- [x] **Task 7 — Admin Panel**: Dashboard stats, Content CRUD, User role management, Site settings + server actions
- [x] **Task 8 — User Dashboard**: Profile/progress page, Account settings, Zustand store, useProgress hook
- [x] **Task 9 — Payments**: Stripe Checkout session, webhook handler (Subscription model)
- [x] **Task 10 — Polish & SEO**: sitemap.ts, robots.ts, OG metadata, loading skeletons
- [x] **Task 11 — Bibles Section**: Full Bible library with Swiper slider, History tab, Verse Omissions tab, individual Bible detail pages with canon proximity ratings, UploadThing upload script for 160+ Bible PDFs

---

## 🔄 REMAINING (External Services)

Before deploying to www.godstruth.net:

| Service | What's needed | Status |
|---------|--------------|--------|
| **PostgreSQL** | `DATABASE_URL` | ⬜ Create at Railway / Supabase / Neon |
| **Google OAuth** | `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` | ⬜ console.cloud.google.com |
| **Stripe** | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, Price IDs | ⬜ dashboard.stripe.com |
| **Resend (email)** | `RESEND_API_KEY` | ⬜ resend.com |
| **UploadThing** | `UPLOADTHING_TOKEN` | ✅ Done (in .env.local) |
| **NextAuth secret** | Run `openssl rand -base64 32` → `AUTH_SECRET` | ⬜ Generate & add to .env.local |
| **Vercel** | Connect repo, add env vars, add `godstruth.net` domain | ⬜ When ready to deploy |

### First-run commands (after setting DATABASE_URL):
```bash
pnpm db:push           # Push schema to database
pnpm db:seed           # Create admin user + sample content + 160 Bible editions
pnpm bibles:upload     # Upload all PDFs from bibles/ to UploadThing (needs UPLOADTHING_TOKEN)
pnpm dev               # Start dev server on localhost:3000
```

---

## 📁 FILE TREE

```
/home/pope/sites/godstruth/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
├── .env.local
├── PROGRESS.md
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── bibles-data.ts        (160+ Bible edition records)
├── scripts/
│   └── upload-bibles.ts      (UploadThing bulk PDF uploader)
└── src/
    ├── middleware.ts
    ├── types/index.ts
    ├── lib/
    │   ├── utils.ts
    │   ├── db.ts
    │   ├── auth.ts
    │   ├── uploadthing.ts
    │   └── stripe.ts
    ├── stores/playerStore.ts
    ├── hooks/
    │   ├── use-toast.ts
    │   └── useProgress.ts
    ├── components/
    │   ├── ui/          (button, badge, input, card, label, dialog, select, switch, tabs, avatar, toast, toaster)
    │   ├── shared/      (Navbar, Footer, AnnouncementBar)
    │   ├── content/     (ContentCard, ContentGrid, ContentFilter)
    │   ├── player/      (VideoPlayer, AudioPlayer, PDFViewer)
    │   ├── marketing/   (HeroSection, FeatureColumns, CtaSections)
    │   ├── admin/       (Sidebar, StatsCard, UploadZone)
    │   └── bibles/      (BibleSlider, BibleTabs)
    └── app/
        ├── layout.tsx
        ├── globals.css
        ├── sitemap.ts
        ├── robots.ts
        ├── (marketing)/     (layout, page)
        ├── (auth)/          (layout, login/page, register/page)
        ├── knowledge/       (layout, page, [slug]/page)
        ├── bibles/          (layout, page, [slug]/page)
        ├── dashboard/       (layout, profile/page, settings/page)
        ├── admin/           (layout, page, content/page, content/new/page, content/[id]/page, users/page, settings/page, _actions.ts)
        └── api/
            ├── auth/[...nextauth]/route.ts
            ├── auth/register/route.ts
            ├── uploadthing/route.ts
            ├── webhooks/stripe/route.ts
            ├── content/route.ts
            ├── progress/route.ts
            └── checkout/route.ts
```

---

## 🔑 ADMIN CREDENTIALS (Dev)

> Created when `pnpm db:seed` is run.

- **Email:** `admin@godstruth.net`
- **Password:** `GodsTruth2025!Admin`
- **Role:** `ADMIN`

> Change the password immediately after first login in production.
