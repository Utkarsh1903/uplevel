-- ── Game High Scores ─────────────────────────────────────────────────────────
-- One row per game. Only the global world record is stored.
-- Run this in Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS game_highscores (
  game_id      TEXT PRIMARY KEY,
  score        INTEGER NOT NULL DEFAULT 0,
  user_name    TEXT DEFAULT 'Anonymous',
  user_avatar  TEXT,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Seed one row per game so upsert always finds a row
INSERT INTO game_highscores (game_id) VALUES
  ('bug-squash'),
  ('code-typer'),
  ('fix-the-bug'),
  ('binary-clicker')
ON CONFLICT DO NOTHING;

-- RLS
ALTER TABLE game_highscores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_game_highscores"
  ON game_highscores FOR SELECT TO authenticated USING (true);

CREATE POLICY "write_game_highscores"
  ON game_highscores FOR ALL TO authenticated USING (true) WITH CHECK (true);
