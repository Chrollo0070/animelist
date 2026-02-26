-- ============================================================
-- MangaList — Supabase Schema
-- Run this ONCE in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

create table if not exists manga_list (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  mal_id        integer,
  title         text not null,
  author        text default '',
  year          integer,
  genres        text[] default '{}',
  status        text default 'Plan to Read',
  chapters_read integer default 0,
  total_chapters integer default 0,
  volumes_read  integer default 0,
  total_volumes integer default 0,
  rating        integer default 0,
  notes         text default '',
  synopsis      text default '',
  cover_url     text default '',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Auto-update updated_at on every row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger manga_list_updated_at
  before update on manga_list
  for each row execute function update_updated_at();

-- Enable Row Level Security (each user only sees their own data)
alter table manga_list enable row level security;

create policy "select_own" on manga_list
  for select using (auth.uid() = user_id);

create policy "insert_own" on manga_list
  for insert with check (auth.uid() = user_id);

create policy "update_own" on manga_list
  for update using (auth.uid() = user_id);

create policy "delete_own" on manga_list
  for delete using (auth.uid() = user_id);
