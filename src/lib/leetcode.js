import { supabase } from './supabase';

/**
 * Call the Supabase Edge Function which proxies LeetCode's GraphQL API.
 * Returns { easy, medium, hard, rating, ranking, username }
 */
export async function fetchLeetCodeStats(username) {
  const { data, error } = await supabase.functions.invoke('fetch-leetcode', {
    body: { username: username.trim() },
  });
  if (error) throw new Error(error.message ?? 'Edge function error');
  if (data?.error) throw new Error(data.error);
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
