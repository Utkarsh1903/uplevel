-- ═══════════════════════════════════════════════════════════
-- UPLEVEL — Online Presence Tracking
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════

-- Add last_seen column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ;

-- Index for fast "who is online" queries
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON profiles(last_seen DESC);

-- The existing RLS policies already cover this:
--   "own_profile"            FOR ALL USING (auth.uid()=id)         → users can update their own last_seen
--   "admin_read_all_profiles" FOR SELECT (admin email check)       → admin can read all last_seen values
-- No new policies needed.
