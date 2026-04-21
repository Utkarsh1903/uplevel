# UpLevel — Career Acceleration Platform for Indian Developers

> Built for the thousands of CS grads stuck at TCS, Infosys & Wipro who want to crack product companies like Amazon, Flipkart, and Swiggy.

UpLevel is a full-stack web application that gives developers a structured, distraction-free system to prepare for product company interviews — DSA tracking, curated roadmaps, in-app learning articles, daily accountability, LeetCode integration, a community leaderboard, and access to mentors, all in one place.

---

## Features

### Free

| Feature | Description |
|---|---|
| **Grind Room** | Log daily sessions, see how many engineers are grinding live, build streaks |
| **DSA Tracker** | 120+ topics across 10 categories (Arrays → DP). Mark as Learning or Done |
| **Career Roadmaps** | 5 structured tracks — SDE-2, Frontend, Backend, DevOps, Data Analyst |
| **In-App Articles** | 66+ deep-dive articles covering every roadmap topic, zero external redirects |
| **LeetCode Integration** | Sync your public LC profile to track Easy / Medium / Hard solve counts |
| **Community Leaderboard** | Rank against peers on overall score, DSA, grind sessions, and LeetCode solves |
| **Curated Resources** | Best of Striver, NeetCode, ByteByteGo — handpicked per roadmap step |
| **Mentor Network** | Connect with engineers who have cracked the switch to product companies |
| **Dashboard & Analytics** | Streaks, 30-day activity charts, DSA mastery overview, leaderboard rank |

### Premium (₹99/month)

| Feature | Description |
|---|---|
| **Interview Prep Vault** | STAR story templates, salary negotiation scripts |
| **HLD Cheatsheets** | High-level design references for 10+ real systems |
| **System Design Roadmap** | Dedicated premium track — scalability, caching, CAP theorem, databases |
| **WhatsApp Support** | Direct support channel |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, React Router v6 |
| Styling | Tailwind CSS v3, custom CSS (glassmorphism design) |
| Backend / DB | Supabase (Postgres + Auth + RLS) |
| Auth | Google OAuth via Supabase |
| Serverless API | Vercel Functions (`/api/*`) |
| Charts | Recharts |
| Icons | Lucide React |
| Markdown | react-markdown |
| Deployment | Vercel |

---

## Project Structure

```
uplevel/
├── api/
│   └── leetcode.js          # Vercel serverless function — LeetCode proxy
├── src/
│   ├── components/
│   │   ├── Layout.jsx        # Sidebar + mobile nav shell
│   │   └── Logo.jsx
│   ├── context/
│   │   ├── AuthContext.jsx   # User session, profile, isPremium
│   │   └── ThemeContext.jsx  # Dark / light mode
│   ├── hooks/
│   │   └── usePageTitle.js
│   ├── lib/
│   │   ├── articles.js       # 66 static in-app articles (bundled)
│   │   ├── dsa.js            # 120+ DSA topics static data
│   │   ├── leetcode.js       # fetchLeetCodeStats, syncLeetCode helpers
│   │   ├── resources.js      # Curated resource links
│   │   ├── roadmaps.js       # 6 roadmap definitions with phases and steps
│   │   └── supabase.js       # Supabase client
│   ├── pages/
│   │   ├── Landing.jsx       # Pre-login marketing page
│   │   ├── Auth.jsx          # Google sign-in
│   │   ├── Dashboard.jsx     # Home — stats, charts, daily log
│   │   ├── GrindRoom.jsx     # Daily session logger + live grinder count
│   │   ├── DSATracker.jsx    # Topic tracker by category
│   │   ├── Roadmaps.jsx      # Career roadmap with progress tracking
│   │   ├── ArticlePage.jsx   # In-app article renderer (react-markdown)
│   │   ├── Leaderboard.jsx   # Community rankings — 4 tabs
│   │   ├── Resources.jsx     # Curated resource library
│   │   ├── Professionals.jsx # Mentor network
│   │   ├── InterviewPrep.jsx # Premium — STAR, HLD, salary scripts
│   │   ├── Settings.jsx      # Profile, LeetCode sync, leaderboard opt-in
│   │   ├── Premium.jsx       # Upgrade page
│   │   └── Admin.jsx         # Admin panel (restricted to admin email)
│   └── App.jsx               # Route definitions
├── supabase/
│   ├── schema.sql                # Full database schema + RLS policies
│   ├── schema_additions.sql      # Grind sessions table
│   └── leaderboard_migration.sql # LeetCode columns + leaderboard view
├── vercel.json                   # SPA rewrite (excludes /api/*)
└── vite.config.js
```

---

## Database Schema

### Tables

| Table | Purpose |
|---|---|
| `profiles` | User info, role, LeetCode stats, leaderboard opt-in |
| `dsa_progress` | Per-user DSA topic status (todo / learning / done) |
| `roadmap_progress` | Per-user roadmap step completion |
| `daily_logs` | Daily study log — problems, minutes, mood, note |
| `grind_sessions` | Daily grind room check-ins |
| `premium_requests` | Upgrade payment requests |

### Views

| View | Purpose |
|---|---|
| `leaderboard_view` | Computed community rankings — filters opt-in users only |

### Leaderboard Score Formula

```
score = (dsa_topics_done × 10)
      + (roadmap_steps_done × 5)
      + (grind_sessions × 3)
      + (lc_easy × 2)
      + (lc_medium × 5)
      + (lc_hard × 10)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier is fine)
- A [Vercel](https://vercel.com) account for deployment

### 1. Clone and install

```bash
git clone https://github.com/Utkarsh1903/uplevel.git
cd uplevel
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Both values are found in **Supabase Dashboard → Project Settings → API**.

### 3. Set up the database

In the Supabase SQL Editor, run the following files **in order**:

```
supabase/schema.sql                # Core tables + RLS + triggers
supabase/schema_additions.sql      # grind_sessions table
supabase/leaderboard_migration.sql # LeetCode columns + leaderboard_view
```

### 4. Configure Google OAuth

1. Go to **Supabase Dashboard → Authentication → Providers → Google**
2. Enable Google and add your OAuth credentials from [Google Cloud Console](https://console.cloud.google.com)
3. Add your site URL to **Supabase → Authentication → URL Configuration**
   - Site URL: `http://localhost:5173` (dev) or your Vercel URL (prod)
   - Redirect URL: `http://localhost:5173/auth/callback`

### 5. Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`.

> **Note:** The `/api/leetcode` serverless function only runs on Vercel. For local testing of LeetCode sync, deploy to Vercel or test via `vercel dev`.

---

## Deployment

The project deploys automatically to Vercel on every push to `main`.

### Initial Vercel setup

```bash
npm install -g vercel
vercel
```

Add environment variables in **Vercel Dashboard → Project → Settings → Environment Variables**:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

The `vercel.json` is already configured:
- `/api/*` routes are handled as serverless functions
- All other routes fall through to `index.html` (SPA behaviour)

### Grant a user Premium access

Run in the Supabase SQL Editor:

```sql
UPDATE profiles
SET is_premium = TRUE, premium_since = NOW()
WHERE email = 'user@example.com';
```

---

## Architecture Notes

### Static data (no DB reads)
All DSA topics, roadmap definitions, and articles are bundled as static JS — `src/lib/dsa.js`, `src/lib/roadmaps.js`, `src/lib/articles.js`. This means zero latency on first render and zero database reads for content that never changes.

### LeetCode proxy
LeetCode's GraphQL API blocks direct browser requests (CORS). The Vercel serverless function at `api/leetcode.js` makes the request server-side and returns only the public stats (easy / medium / hard solve counts). No auth credentials are stored or required — only public profile data is fetched.

### Leaderboard privacy
The `leaderboard_view` filters `WHERE leaderboard_opt_in = true`. Users are invisible on the leaderboard by default. They can opt in from Settings at any time. Only name, avatar, and scores are ever shown — no email or contact info.

### Article routing
Articles live at `/learn/:slug` inside the protected `Layout` route so the sidebar stays visible while reading. When a user opens an article from a roadmap, the current `roadmapId` and `trackId` are passed as React Router `state`. The back button uses this state to restore the exact roadmap the user came from.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and run `npm run build` to verify
4. Push and open a pull request

---

## Authors

Built with dedication for Indian engineers who deserve better.

- [Utkarsh Srivastava](https://www.linkedin.com/in/utkarsh-srivastava-686b35153/)
- [Pranjal Srivastava](https://www.linkedin.com/in/pranjalsrivastava1312/)

---

## License

Private. All rights reserved.
