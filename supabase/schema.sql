-- 오늘부동산 뉴스레터 스키마
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.

-- 1) 뉴스레터 글 테이블
create table if not exists public.newsletter_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text default '',
  cover_image  text default '',
  body         text default '',            -- 마크다운 본문
  status       text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  views        integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists newsletter_posts_status_pub_idx
  on public.newsletter_posts (status, published_at desc);

-- updated_at 자동 갱신
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists trg_newsletter_touch on public.newsletter_posts;
create trigger trg_newsletter_touch before update on public.newsletter_posts
  for each row execute function public.touch_updated_at();

-- 2) RLS: 누구나 '발행된' 글만 읽기 / 로그인한 관리자만 전체 조회·쓰기
alter table public.newsletter_posts enable row level security;

drop policy if exists "public reads published" on public.newsletter_posts;
create policy "public reads published"
  on public.newsletter_posts for select
  using ( status = 'published' );

drop policy if exists "admin full access" on public.newsletter_posts;
create policy "admin full access"
  on public.newsletter_posts for all
  using ( auth.role() = 'authenticated' )
  with check ( auth.role() = 'authenticated' );

-- 3) 이미지 저장용 스토리지 버킷 (공개 읽기)
insert into storage.buckets (id, name, public)
values ('newsletter', 'newsletter', true)
on conflict (id) do nothing;

drop policy if exists "public reads newsletter images" on storage.objects;
create policy "public reads newsletter images"
  on storage.objects for select
  using ( bucket_id = 'newsletter' );

drop policy if exists "admin uploads newsletter images" on storage.objects;
create policy "admin uploads newsletter images"
  on storage.objects for insert
  with check ( bucket_id = 'newsletter' and auth.role() = 'authenticated' );

drop policy if exists "admin manages newsletter images" on storage.objects;
create policy "admin manages newsletter images"
  on storage.objects for all
  using ( bucket_id = 'newsletter' and auth.role() = 'authenticated' )
  with check ( bucket_id = 'newsletter' and auth.role() = 'authenticated' );
