import { supabase } from './supabase';

/**
 * Call the Vercel API route which proxies LeetCode's GraphQL API server-side.
 * Returns { easy, medium, hard, rating, ranking, username }
 */
export async function fetchLeetCodeStats(username) {
  const res = await fetch('/api/leetcode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.trim() }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? 'Failed to fetch LeetCode stats');
  }

  return data;
}

/**
 * Fetch stats and persist them to the profiles row.
 * Returns the stats object on success.
 */
export async function syncLeetCode(userId, username) {
  const stats = await fetchLeetCodeStats(username);
  const { error } = await supabase.from('profiles').update({
    leetcode_username:   username.trim(),
    leetcode_easy:       stats.easy,
    leetcode_medium:     stats.medium,
    leetcode_hard:       stats.hard,
    leetcode_rating:     stats.rating,
    leetcode_updated_at: new Date().toISOString(),
  }).eq('id', userId);
  if (error) throw new Error(error.message);
  return stats;
}
