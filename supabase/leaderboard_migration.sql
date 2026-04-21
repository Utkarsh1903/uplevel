-- ─────────────────────────────────────────────
-- 1. Add LeetCode + leaderboard columns to profiles
-- ─────────────────────────────────────────────
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS leetcode_username    TEXT,
  ADD COLUMN IF NOT EXISTS leetcode_easy        INT  DEFAULT 0,
  ADD COLUMN IF NOT EXISTS leetcode_medium      INT  DEFAULT 0,
  ADD COLUMN IF NOT EXISTS leetcode_hard        INT  DEFAULT 0,
  ADD COLUMN IF NOT EXISTS leetcode_rating      INT  DEFAULT 0,
  ADD COLUMN IF NOT EXISTS leetcode_updated_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS leaderboard_opt_in   BOOLEAN DEFAULT false;

-- ─────────────────────────────────────────────
-- 2. Leaderboard view
--    Score = (dsa_done×10) + (roadmap_done×5) + (grind_sessions×3)
--          + (lc_easy×2)   + (lc_medium×5)    + (lc_hard×10)
-- ─────────────────────────────────────────────
CREATE OR REPLACE VIEW leaderboard_view AS
SELECT
  p.id                                        AS user_id,
  p.name,
  p.avatar_url,
  p.leetcode_username,
  COALESCE(p.leetcode_easy,   0)              AS lc_easy,
  COALESCE(p.leetcode_medium, 0)              AS lc_medium,
  COALESCE(p.leetcode_hard,   0)              AS lc_hard,
  COALESCE(p.leetcode_rating, 0)              AS lc_rating,
  COALESCE(dsa.done_count,    0)              AS dsa_done,
  COALESCE(rm.steps_done,     0)              AS roadmap_done,
  COALESCE(gs.total_sessions, 0)              AS grind_sessions,
  (
    COALESCE(dsa.done_count,    0) * 10 +
    COALESCE(rm.steps_done,     0) *  5 +
    COALESCE(gs.total_sessions, 0) *  3 +
    COALESCE(p.leetcode_easy,   0) *  2 +
    COALESCE(p.leetcode_medium, 0) *  5 +
    COALESCE(p.leetcode_hard,   0) * 10
  )                                           AS score
FROM profiles p
LEFT JOIN (
  SELECT user_id, COUNT(*) AS done_count
  FROM   dsa_progress
  WHERE  status = 'done'
  GROUP  BY user_id
) dsa ON dsa.user_id = p.id
LEFT JOIN (
  SELECT user_id, COUNT(*) AS steps_done
  FROM   roadmap_progress
  WHERE  done = true
  GROUP  BY user_id
) rm ON rm.user_id = p.id
LEFT JOIN (
  SELECT user_id, COUNT(*) AS total_sessions
  FROM   grind_sessions
  GROUP  BY user_id
) gs ON gs.user_id = p.id
WHERE p.leaderboard_opt_in = true
  AND p.name IS NOT NULL;
