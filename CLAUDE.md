# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint check

# Database
pnpm db:push      # Push schema changes without migrations
pnpm db:migrate   # Run Prisma migrations
pnpm db:generate  # Regenerate Prisma client after schema changes
pnpm db:studio    # Open Prisma GUI
pnpm db:seed      # Seed DB (admin user + sample content + 160 Bible editions)

# Bulk scripts (require .env.local)
pnpm bibles:upload         # Upload Bible PDFs to UploadThing
pnpm epub-bibles:upload    # Upload EPUB Bible files
pnpm covers:extract        # Extract EPUB covers
pnpm pdf-covers:extract    # Extract PDF covers
```

## Architecture

**Stack:** Next.js 14 App Router, TypeScript, Prisma + PostgreSQL, NextAuth v5, UploadThing, Stripe, Tailwind CSS

**Path alias:** `@/*` → `src/*`

### App Router Structure

Routes use route groups for layout separation:
- `(marketing)/` — public landing page
- `(auth)/` — login and register pages
- `knowledge/[slug]` — content hub (VIDEO, BOOK, PODCAST, GUIDE)
- `courses/[slug]/lessons/[lessonId]` — lesson viewer
- `bibles/[slug]/read` — Bible reader (react-reader)
- `dashboard/` — protected user pages
- `admin/` — admin-only CRUD panel

Mutations in the admin panel use **server actions** defined in `src/app/admin/_actions.ts`.

### Authentication & Authorization

NextAuth v5 is configured in `src/lib/auth.ts` with:
- Credentials provider (bcrypt password verification)
- Google OAuth provider
- Prisma adapter for persistence
- JWT sessions with `user.id` and `user.role` added in session callback

Middleware (`src/middleware.ts`) protects:
- `/admin/*` — requires ADMIN role
- `/dashboard/*` — requires any authenticated session

Redirects unauthorized users to `/login?callbackUrl=...`.

### Database Schema (Key Models)

- **User** — roles: `USER | ADMIN | MODERATOR`
- **Content** — types: `VIDEO | BOOK | COURSE | PODCAST | GUIDE`; has `slug`, `premium`, `published`, `featured` flags
- **Series** — groups Content items
- **CourseChapter / CourseLesson** — nested under Content (type=COURSE); lesson types: `VIDEO | READING | QUIZ | ASSIGNMENT | IMAGE`
- **BibleEdition** — 160+ translations with cover URLs, file URLs, gradient colors, canon ratings
- **Subscription** — Stripe plans: `FREE | SUPPORTER | PARTNER`; statuses: `ACTIVE | CANCELED | PAST_DUE | TRIALING | INCOMPLETE`
- **UserProgress** — `progress: Float` (0.0–1.0) + `completed: Boolean` per user-content pair
- **SiteSettings** — singleton row (`id = "singleton"`) for site-wide config

After any schema change run `pnpm db:generate` to regenerate the Prisma client.

### File Uploads (UploadThing)

Routes defined in `src/lib/uploadthing.ts`. All routes require admin auth. Size limits:
- Videos: 4 GB
- PDFs: 64 MB
- Images: 8 MB
- Audio: 512 MB

### Stripe Payments

Config in `src/lib/stripe.ts`. Plans map to Stripe price IDs from env vars (`STRIPE_SUPPORTER_PRICE_ID`, `STRIPE_PARTNER_PRICE_ID`). Webhook handler at `src/app/api/webhooks/stripe/` updates `Subscription` records.

### Client State

- **Zustand** (`src/stores/playerStore.ts`) — media player state (currentContentId, playing, volume)
- **TanStack Query** — server state for content fetching

### Key Environment Variables

```
DATABASE_URL
AUTH_SECRET
GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
UPLOADTHING_TOKEN
STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET / NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SUPPORTER_PRICE_ID / STRIPE_PARTNER_PRICE_ID
RESEND_API_KEY / EMAIL_FROM
NEXT_PUBLIC_APP_URL
```

### Dev Seed Credentials

- **Admin:** `admin@godstruth.net` / `GodsTruth2025!Admin`

### No Test Suite

No Jest or Vitest configured. Linting is the only automated check (`pnpm lint`).