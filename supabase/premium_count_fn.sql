-- ═══════════════════════════════════════════════════════════
-- UPLEVEL — Premium count function (bypasses RLS safely)
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════

-- Returns the count of users with is_premium = TRUE.
-- SECURITY DEFINER lets any authenticated user call this
-- without needing to read all profiles directly.
CREATE OR REPLACE FUNCTION get_premium_count()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::integer FROM profiles WHERE is_premium = TRUE;
$$;
