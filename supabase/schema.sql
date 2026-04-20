-- ═══════════════════════════════════════════════════════════
-- UPLEVEL — Supabase Schema
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════

-- ── Fix schema permissions (required for newer Supabase projects) ─────────────
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY,
  email         TEXT,
  name          TEXT,
  avatar_url    TEXT,
  curr_role     TEXT DEFAULT 'Junior Developer',
  target_role   TEXT DEFAULT 'SDE-2 at Product Company',
  company       TEXT,
  yoe           INTEGER DEFAULT 0,
  is_premium    BOOLEAN DEFAULT FALSE,
  premium_since TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── DSA PROGRESS ─────────────────────────────────────────────
-- topic_id is the string key from frontend static data (e.g. "two-pointers")
CREATE TABLE IF NOT EXISTS dsa_progress (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  topic_id   TEXT NOT NULL,
  status     TEXT DEFAULT 'todo' CHECK (status IN ('todo','learning','done')),
  notes      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- ── ROADMAP PROGRESS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS roadmap_progress (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  roadmap_id TEXT NOT NULL,
  step_id    TEXT NOT NULL,
  done       BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, roadmap_id, step_id)
);

-- ── DAILY LOGS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_logs (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date             DATE NOT NULL,
  problems_solved  INTEGER DEFAULT 0,
  study_minutes    INTEGER DEFAULT 0,
  topics_covered   TEXT[] DEFAULT '{}',
  mood             TEXT DEFAULT 'focused' CHECK (mood IN ('blocked','distracted','focused','flow')),
  note             TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ── PREMIUM REQUESTS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS premium_requests (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name         TEXT NOT NULL,
  contact      TEXT NOT NULL,
  contact_type TEXT DEFAULT 'whatsapp',
  plan_period  TEXT DEFAULT 'monthly',
  message      TEXT,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','contacted','paid','declined')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ══ ROW LEVEL SECURITY ═══════════════════════════════════════
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_profile"       ON profiles        FOR ALL USING (auth.uid()=id);
CREATE POLICY "own_dsa"           ON dsa_progress    FOR ALL USING (auth.uid()=user_id);
CREATE POLICY "own_roadmap"       ON roadmap_progress FOR ALL USING (auth.uid()=user_id);
CREATE POLICY "own_logs"          ON daily_logs       FOR ALL USING (auth.uid()=user_id);
CREATE POLICY "own_requests"      ON premium_requests FOR ALL USING (auth.uid()=user_id);

-- ══ INDEXES ══════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_dsa_user    ON dsa_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_rmap_user   ON roadmap_progress(user_id, roadmap_id);
CREATE INDEX IF NOT EXISTS idx_logs_user   ON daily_logs(user_id, date DESC);

-- ══ ADMIN: GRANT PREMIUM ══════════════════════════════════════
-- Run this to give a user premium access:
-- UPDATE profiles SET is_premium=TRUE, premium_since=NOW() WHERE email='user@gmail.com';
--
-- Revoke:
-- UPDATE profiles SET is_premium=FALSE WHERE email='user@gmail.com';
