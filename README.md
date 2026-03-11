# JWL

Inventory management software for high-end jewelry ateliers.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — landing page with waitlist.

## Project layout

```
jwl/
├── app/
│   ├── page.tsx              # Landing page (Art Deco, waitlist form)
│   ├── dashboard/page.tsx    # App dashboard
│   ├── inventory/page.tsx    # Piece inventory
│   ├── orders/page.tsx       # Custom order workflow
│   ├── clients/page.tsx      # Client records
│   └── api/waitlist/route.ts # Email capture endpoint
├── lib/supabase/             # DB client (browser + server)
├── supabase/migrations/      # PostgreSQL schema
└── outreach/                 # Phase 2 & 3 templates
```

## Setup

1. **Supabase** — create a project, run `supabase/migrations/001_init.sql`, copy keys to `.env.local`
2. **Resend** (optional) — sign up at resend.com, add API key to `.env.local`, uncomment the Resend block in `app/api/waitlist/route.ts`
3. **Deploy** — push to GitHub, connect to Vercel, add env vars in the Vercel dashboard

## Roadmap

| Phase | Status |
|-------|--------|
| Landing page + waitlist | ✅ Built |
| Outreach campaign | 📋 Templates ready |
| Discovery interviews | 📋 Guide ready |
| MVP app (dashboard, inventory, orders, clients) | 🏗 Shell ready, needs DB wiring |
| Stripe billing | — |
