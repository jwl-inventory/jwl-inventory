-- ============================================================
-- JWL — Initial Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── clients ──────────────────────────────────────────────────
create table if not exists clients (
  id         uuid primary key default gen_random_uuid(),
  name       text        not null,
  email      text        unique,
  phone      text,
  notes      text,
  created_at timestamptz not null default now()
);

-- ── pieces ───────────────────────────────────────────────────
create type piece_status as enum ('active', 'in_progress', 'sold', 'archived');

create table if not exists pieces (
  id             uuid primary key default gen_random_uuid(),
  name           text         not null,
  description    text,
  status         piece_status not null default 'active',
  materials_cost numeric(12,2) not null default 0,
  labor_cost     numeric(12,2) not null default 0,
  margin         numeric(5,2)  not null default 30,   -- percentage
  client_id      uuid references clients(id) on delete set null,
  photos         text[],                              -- array of storage URLs
  created_at     timestamptz  not null default now(),
  updated_at     timestamptz  not null default now()
);

-- ── gemstones ────────────────────────────────────────────────
create table if not exists gemstones (
  id       uuid primary key default gen_random_uuid(),
  piece_id uuid not null references pieces(id) on delete cascade,
  type     text not null,       -- sapphire, diamond, emerald, etc.
  carat    numeric(8,3),
  cut      text,                -- round, oval, cushion, etc.
  origin   text,                -- Burma, Colombia, etc.
  color    text,
  clarity  text,
  cost     numeric(12,2) not null default 0,
  notes    text
);

-- ── orders ───────────────────────────────────────────────────
create type order_stage as enum (
  'Inquiry',
  'Design',
  'Client Approval',
  'Production',
  'QC',
  'Delivery'
);

create table if not exists orders (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null references clients(id) on delete restrict,
  piece_id   uuid references pieces(id) on delete set null,
  stage      order_stage not null default 'Inquiry',
  due_date   date,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── waitlist ─────────────────────────────────────────────────
create table if not exists waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz not null default now()
);

-- ── updated_at trigger ───────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger pieces_updated_at
  before update on pieces
  for each row execute procedure set_updated_at();

create trigger orders_updated_at
  before update on orders
  for each row execute procedure set_updated_at();

-- ── Row Level Security ───────────────────────────────────────
alter table clients   enable row level security;
alter table pieces    enable row level security;
alter table gemstones enable row level security;
alter table orders    enable row level security;
alter table waitlist  enable row level security;

-- Authenticated users can read/write their own data.
-- For a multi-tenant setup, add an `org_id` column and scope policies to it.
-- For MVP single-tenant: allow all authenticated users full access.

create policy "auth users full access" on clients
  for all to authenticated using (true) with check (true);

create policy "auth users full access" on pieces
  for all to authenticated using (true) with check (true);

create policy "auth users full access" on gemstones
  for all to authenticated using (true) with check (true);

create policy "auth users full access" on orders
  for all to authenticated using (true) with check (true);

-- Waitlist is insert-only from anonymous (landing page form)
create policy "anon insert waitlist" on waitlist
  for insert to anon with check (true);

create policy "auth read waitlist" on waitlist
  for select to authenticated using (true);
