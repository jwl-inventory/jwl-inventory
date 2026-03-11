# JWL

Inventory management software for high-end jewelry ateliers.

## Local dev setup

```bash
# 1. Install deps
npm install

# 2. Create a local Postgres database
createdb jwl

# 3. Run the schema
psql jwl < migrations/001_init.sql

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`.env.local` ships with `DATABASE_URL=postgres://localhost:5432/jwl` — the only env var needed locally.

## Project layout

```
jwl/
├── app/
│   ├── page.tsx              # Landing page (Art Deco, waitlist form)
│   ├── dashboard/page.tsx    # App dashboard
│   ├── inventory/page.tsx    # Piece inventory
│   ├── orders/page.tsx       # Custom order workflow
│   ├── clients/page.tsx      # Client records
│   └── api/waitlist/route.ts # Email capture → writes to waitlist table
├── lib/db.ts                 # postgres client (single pool)
├── migrations/001_init.sql   # Full schema
└── outreach/                 # Phase 2 & 3 templates
```

## Production deploy (Vercel)

1. Add a managed Postgres (Neon, Railway, Render, or any provider)
2. Set `DATABASE_URL` in Vercel env vars — nothing else needed
3. Run migrations against the production DB once

## Roadmap

| Phase | Status |
|-------|--------|
| Landing page + waitlist | ✅ Built |
| Outreach campaign | 📋 Templates ready |
| Discovery interviews | 📋 Guide ready |
| MVP app shell | 🏗 Ready, needs DB wiring per page |
| Stripe billing | — |
