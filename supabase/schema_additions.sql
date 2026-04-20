-- ═══════════════════════════════════════════════════════════
-- UPLEVEL — Schema Additions (run AFTER schema.sql)
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════

-- ── updated_at column for daily_logs (if not already added) ──────────────────
ALTER TABLE daily_logs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ── PROFESSIONALS table ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS professionals (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL,
  company       TEXT NOT NULL,
  topmate_url   TEXT,
  linkedin_url  TEXT,
  avatar_url    TEXT,
  bio           TEXT,
  tags          TEXT[] DEFAULT '{}',
  sessions_count INTEGER DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
GRANT ALL ON professionals TO authenticated;
GRANT SELECT ON professionals TO anon;

DROP POLICY IF EXISTS "professionals_public_read" ON professionals;
CREATE POLICY "professionals_public_read" ON professionals
  FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "admin_all_professionals" ON professionals;
CREATE POLICY "admin_all_professionals" ON professionals
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com');

-- ── FEATURE REQUESTS table ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS feature_requests (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  role         TEXT NOT NULL,
  company      TEXT NOT NULL,
  topmate_url  TEXT,
  linkedin_url TEXT,
  message      TEXT,
  status       TEXT DEFAULT 'pending',  -- pending | contacted | featured | rejected
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;
GRANT ALL ON feature_requests TO authenticated;
GRANT INSERT ON feature_requests TO anon;

DROP POLICY IF EXISTS "anyone_submit_feature_request" ON feature_requests;
CREATE POLICY "anyone_submit_feature_request" ON feature_requests
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "admin_read_feature_requests" ON feature_requests;
CREATE POLICY "admin_read_feature_requests" ON feature_requests
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com');

DROP POLICY IF EXISTS "admin_update_feature_requests" ON feature_requests;
CREATE POLICY "admin_update_feature_requests" ON feature_requests
  FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com');

-- ── Admin: read all profiles ──────────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_read_all_profiles" ON profiles;
CREATE POLICY "admin_read_all_profiles" ON profiles
  FOR SELECT TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com'
    OR auth.uid() = id
  );

-- ── Admin: read all daily_logs ────────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_read_all_logs" ON daily_logs;
CREATE POLICY "admin_read_all_logs" ON daily_logs
  FOR SELECT TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com'
    OR auth.uid() = user_id
  );

-- ── Admin: read all dsa_progress ─────────────────────────────────────────────
DROP POLICY IF EXISTS "admin_read_all_dsa" ON dsa_progress;
CREATE POLICY "admin_read_all_dsa" ON dsa_progress
  FOR SELECT TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'Sri.utkarsh1903@gmail.com'
    OR auth.uid() = user_id
  );

-- ── Seed Utkarsh's profile ────────────────────────────────────────────────────
INSERT INTO professionals (name, role, company, topmate_url, bio, tags, sort_order)
VALUES (
  'Utkarsh Srivastava',
  'SDE-3',
  'CWAN',
  'https://topmate.io/utkarsh_srivastava101/',
  'SDE-3 at CWAN helping engineers crack product company interviews. Expertise in DSA, System Design, and career transitions from service to product companies. Mentored 50+ engineers in their switch to top product firms.',
  ARRAY['DSA', 'System Design', 'Career Guidance', 'Interview Prep'],
  1
);
