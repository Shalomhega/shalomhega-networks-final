# SHALOMHEGA NETWORKS

## Phase 4B, Supabase Review System

### 1. Create a Supabase project
Create a project in Supabase, then open Project Settings, API.

### 2. Add environment variables
Copy `.env.example` to `.env` and add:

```text
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Never put the Supabase service role key in a Vite environment variable.

### 3. Run the database setup
Open the Supabase SQL Editor and run the complete file:

`supabase/setup.sql`

It creates:
- `reviews`
- `admin_users`
- Row Level Security policies
- the `review-profile-images` bucket
- storage policies

### 4. Create the administrator
In Supabase Authentication, Users, create your admin email and password manually. Do not add public registration to the website.

Copy the user's UUID, then run:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

### 5. Admin access
Open:

`/admin`

Only an authenticated user whose UUID exists in `admin_users` can manage reviews.

### 6. Test the workflow
1. Open `/leave-a-review`.
2. Submit a review, optionally with a JPEG, PNG, or WEBP profile image up to 5 MB.
3. Log into `/admin`.
4. Open the pending review.
5. Approve it.
6. Open `/reviews` and confirm it is visible publicly.
7. Reject or unpublish a review and confirm it disappears from public feedback.

## Security model
- Anonymous visitors can submit pending reviews.
- Anonymous visitors can read only approved reviews.
- Pending and rejected reviews are protected by Row Level Security.
- Approval, rejection, deletion, and full management require both authentication and membership in `admin_users`.
- The frontend never uses the Supabase service role key.

## Phase 4C, Project Inquiry System

### Supabase SQL
Run the following in the Supabase SQL Editor after the Phase 4B setup:

```sql
create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  email text not null,
  project_directions text[] not null check (cardinality(project_directions) > 0),
  community_type text not null,
  project_details text not null check (char_length(trim(project_details)) >= 20),
  community_direction text,
  budget_approach text,
  status text not null default 'new' check (status in ('new','contacted','in_discussion','confirmed','closed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_inquiries enable row level security;

create policy "public can submit inquiries"
on public.project_inquiries
for insert to anon, authenticated
with check (
  status = 'new'
  and notes is null
);

create policy "admins can read inquiries"
on public.project_inquiries
for select to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

create policy "admins can update inquiries"
on public.project_inquiries
for update to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

create policy "admins can delete inquiries"
on public.project_inquiries
for delete to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
```

### Test
1. Add your Supabase URL and anon key to `.env`.
2. Run the SQL above.
3. Submit an inquiry from `/start-your-project`.
4. Sign in at `/admin` with the administrator account created in Phase 4B.
5. Open **Project Inquiries**.
6. Update a status and save internal notes.
7. Confirm that an anonymous visitor cannot select or read inquiry records.

Internal notes are protected by the same administrator only read and update policies and are never rendered on public pages.

## Phase 5A, Admin Control Center

The protected admin area now provides an Admin Control Center with real Supabase backed review and inquiry counts, an Attention Required section, recent activity derived from existing records, a private notifications view, improved status filters, review management, inquiry management, protected internal notes, loading states, empty states, and realtime refresh subscriptions when Supabase Realtime is enabled for the relevant tables.

Access the admin area at `/admin` using an administrator account already authorized in the existing `admin_users` security model. Public visitors cannot access this dashboard through the public navigation.

### Testing

1. Sign in at `/admin`.
2. Confirm pending reviews and new inquiries appear in Attention Required.
3. Open Reviews and approve, reject, unpublish, or delete a review.
4. Open Project Inquiries and update an inquiry status.
5. Save an internal note and confirm it persists after refresh.
6. Submit a new review or inquiry from the public website and confirm the admin data refreshes when Realtime is enabled, otherwise refresh the dashboard.
7. Confirm unauthenticated visitors are redirected away from protected admin pages.

## Phase 5B, Media, Portfolio, Images and Video Experience

Phase 5B adds the public portfolio and media presentation layer without inventing portfolio projects or using fake client media.

### Current behavior

- The Our Work page is now a premium portfolio experience.
- Portfolio categories and reusable project cards are ready for real projects.
- Images use lightweight thumbnails and lazy loading when real media is added.
- Videos are designed to open only after a visitor chooses to watch, preventing unnecessary autoplay and improving page performance.
- The portfolio intentionally remains empty until real SHALOMHEGA NETWORKS work is published.

### Where real media will go next

Phase 5C will connect portfolio records, images, thumbnails, and video references to Supabase Storage and the protected Admin Control Center. That will allow SHALOM to add, edit, publish, hide, and remove real portfolio media without editing website code.

## Complete master build
This package combines the implemented pages from the supplied project phases and preserves the Phase 5B media, Supabase, reviews, inquiry, and admin systems.
