const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
  }
`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username } = req.body ?? {};
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username required' });
  }

  try {
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://leetcode.com',
        'Referer': 'https://leetcode.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: username.trim() },
      }),
    });

    const text = await response.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: 'LeetCode returned unexpected response', raw: text.slice(0, 300) });
    }

    // surface any GraphQL errors
    if (json.errors?.length) {
      return res.status(404).json({ error: json.errors[0]?.message ?? 'LeetCode GraphQL error' });
    }

    if (!json.data?.matchedUser) {
      return res.status(404).json({ error: 'LeetCode user not found. Make sure your profile is public and the username is correct.' });
    }

    const lc    = json.data.matchedUser;
    const stats = lc.submitStats?.acSubmissionNum ?? [];
    const easy   = stats.find(s => s.difficulty === 'Easy')?.count   ?? 0;
    const medium = stats.find(s => s.difficulty === 'Medium')?.count ?? 0;
    const hard   = stats.find(s => s.difficulty === 'Hard')?.count   ?? 0;
    const ranking = lc.profile?.ranking ?? 0;

    return res.status(200).json({ easy, medium, hard, rating: 0, ranking, username: lc.username });
  } catch (err) {
    return res.status(500).json({ error: err.message ?? 'Unknown error' });
  }
}
