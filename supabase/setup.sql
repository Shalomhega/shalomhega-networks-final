-- SHALOMHEGA NETWORKS Phase 4B, Review system
create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  profile_image_url text,
  project_type text not null check (char_length(trim(project_type)) between 1 and 120),
  review text not null check (char_length(trim(review)) between 10 and 1500),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- Public can submit only pending reviews. Status and timestamps are constrained by policy.
create policy "public submit pending reviews" on public.reviews
for insert to anon, authenticated
with check (status = 'pending' and approved_at is null);

-- Public can only read approved reviews.
create policy "public read approved reviews" on public.reviews
for select to anon, authenticated
using (status = 'approved' or public.is_admin());

create policy "admins manage reviews" on public.reviews
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins can identify themselves" on public.admin_users
for select to authenticated using (user_id = auth.uid());

-- Storage bucket. Create through the dashboard or this statement.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-profile-images','review-profile-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true, file_size_limit=5242880, allowed_mime_types=array['image/jpeg','image/png','image/webp'];

create policy "public upload review profile images" on storage.objects
for insert to anon, authenticated
with check (bucket_id = 'review-profile-images' and lower(storage.extension(name)) in ('jpg','jpeg','png','webp'));

create policy "public read review profile images" on storage.objects
for select to anon, authenticated
using (bucket_id = 'review-profile-images');

create policy "admins manage review profile images" on storage.objects
for all to authenticated
using (bucket_id = 'review-profile-images' and public.is_admin())
with check (bucket_id = 'review-profile-images' and public.is_admin());

-- IMPORTANT ADMIN STEP
-- 1. Create your administrator in Supabase Authentication, Users.
-- 2. Copy that user's UUID.
-- 3. Run:
-- insert into public.admin_users (user_id) values ('PASTE_AUTH_USER_UUID_HERE');
