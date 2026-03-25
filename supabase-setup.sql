-- Run this in your Supabase SQL Editor to set up the rat-ranking tables.
-- Dashboard → SQL Editor → New query → paste this → Run

-- Words table
create table words (
  id text primary key,
  text text not null,
  score integer not null default 0,
  created_at timestamptz not null default now()
);

-- Comments table
create table comments (
  id text primary key,
  text text not null,
  author text not null default 'anon',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (allow all reads/writes via anon key)
alter table words enable row level security;
alter table comments enable row level security;

create policy "Allow public read on words" on words for select using (true);
create policy "Allow public insert on words" on words for insert with check (true);
create policy "Allow public update on words" on words for update using (true);

create policy "Allow public read on comments" on comments for select using (true);
create policy "Allow public insert on comments" on comments for insert with check (true);

-- Atomic score increment function (used by the API for votes)
create or replace function increment_score(word_id text, amount integer)
returns void as $$
  update words set score = score + amount where id = word_id;
$$ language sql;

-- Seed data
insert into words (id, text, score) values
  -- S tier
  ('s1', 'Honk!', 60),
  ('s2', 'Backchain', 57),
  ('s3', 'Non-trivial', 55),
  ('s4', 'Something like this', 53),
  ('s5', 'AISIs', 51),
  ('s6', 'something something…', 50),
  -- A tier
  ('a1', 'Prior', 48),
  ('a2', 'Update', 46),
  ('a3', 'Heuristic', 44),
  ('a4', 'Counterfactual', 43),
  ('a5', 'Nerd sniped', 42),
  ('a6', 'Directionally', 41),
  ('a7', '+1 / -1', 40),
  ('a8', 'A priori', 39),
  ('a9', 'Revealed preferences', 38),
  ('a10', 'Utils', 37),
  ('a11', '"we should find Jasmine-shaped people"', 35),
  -- B tier
  ('b1', 'Pareto', 30),
  ('b2', '''I claim that''', 28),
  ('b3', 'From first principles', 26),
  ('b4', 'GDM', 24),
  ('b5', 'Plausible', 20),
  -- C tier
  ('c1', 'A priori', 15),
  ('c2', 'this', 10),
  -- D tier
  ('d1', '''Seems good''', 8),
  ('d2', '''Seems right''', 5),
  ('d3', 'p(doom)', 2),
  -- E tier
  ('e1', 'Orthogonal', -5),
  -- F tier
  ('f1', '''Or something'' 😭', -11),
  ('f2', '''I guess''', -13),
  ('f3', '+10', -14),
  ('f4', '-10', -15),
  ('f5', 'Trivial', -16),
  ('f6', 'Forwardchain', -18),
  ('f7', 'idk man (in an argument)', -20);
