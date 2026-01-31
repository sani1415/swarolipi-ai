-- ============================================================
-- RUN THIS ONCE in Supabase SQL Editor if you already have
-- users + notes from the old schema and want to add folders.
-- ============================================================
-- What happens:
--   • Creates public.folders (skipped if it already exists)
--   • Creates the folders policy (replaces if already exists)
--   • Adds folder_id to public.notes (skipped if column exists)
-- Your existing users, notes, and data are NOT deleted or replaced.
-- ============================================================

create table if not exists public.folders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

alter table public.folders enable row level security;

drop policy if exists "Users can manage their own folders" on public.folders;
create policy "Users can manage their own folders"
on public.folders for all
using (
  exists (select 1 from public.users u where u.id = folders.user_id and u.auth_user_id = auth.uid())
)
with check (
  exists (select 1 from public.users u where u.id = folders.user_id and u.auth_user_id = auth.uid())
);

alter table public.notes add column if not exists folder_id uuid references public.folders (id) on delete set null;
