create table public.notes (
  id bigserial primary key,
  title text
);

alter table public.notes enable row level security;

create policy "Allow public read access"
  on public.notes
  for select
  using (true);
