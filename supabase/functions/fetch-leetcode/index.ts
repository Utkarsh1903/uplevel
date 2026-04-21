import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
      userContestRanking {
        rating
      }
    }
  }
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();

    if (!username || typeof username !== 'string') {
      return new Response(JSON.stringify({ error: 'Username required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({ query: QUERY, variables: { username: username.trim() } }),
    });

    const json = await res.json();

    if (!json.data?.matchedUser) {
      return new Response(JSON.stringify({ error: 'LeetCode user not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const lc     = json.data.matchedUser;
    const stats  = lc.submitStats?.acSubmissionNum ?? [];
    const easy   = stats.find((s: any) => s.difficulty === 'Easy')?.count   ?? 0;
    const medium = stats.find((s: any) => s.difficulty === 'Medium')?.count ?? 0;
    const hard   = stats.find((s: any) => s.difficulty === 'Hard')?.count   ?? 0;
    const rating = Math.round(lc.userContestRanking?.rating ?? 0);
    const ranking = lc.profile?.ranking ?? 0;

    return new Response(
      JSON.stringify({ easy, medium, hard, rating, ranking, username: lc.username }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message ?? 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
