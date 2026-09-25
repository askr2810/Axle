-- Axle: databaseoppsett for kontoer og synkronisering.
-- Lim inn alt i Supabase → SQL Editor → New query, og trykk Run. Kan kjøres flere ganger uten skade.

-- Én rad per bruker med hele fremgangen som JSON.
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null,
  updated_at timestamptz not null default now()
);

-- Radnivåsikkerhet: hver bruker kan bare lese og skrive sin egen rad.
alter table public.progress enable row level security;

drop policy if exists "egen fremgang - lese" on public.progress;
drop policy if exists "egen fremgang - lage" on public.progress;
drop policy if exists "egen fremgang - endre" on public.progress;
drop policy if exists "egen fremgang - slette" on public.progress;
create policy "egen fremgang - lese"   on public.progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "egen fremgang - lage"   on public.progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "egen fremgang - endre"  on public.progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "egen fremgang - slette" on public.progress for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.progress from anon;
grant select, insert, update, delete on public.progress to authenticated;

-- «Slett konto» i appen: sletter den innloggede brukeren (og fremgangen, via on delete cascade).
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'ikke innlogget';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
