create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  city text,
  user_type text not null check (user_type in ('user', 'curator')),
  referral text,
  created_at timestamp with time zone default now()
);

create index if not exists subscribers_email_idx on public.subscribers(email);
create index if not exists subscribers_created_at_idx on public.subscribers(created_at desc);