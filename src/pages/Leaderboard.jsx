import { usePageTitle } from '../hooks/usePageTitle';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Trophy, Code2, Flame, Settings, RefreshCw } from 'lucide-react';

const TABS = [
  { id: 'overall',  label: 'Overall',   icon: Trophy,   color: '#f59e0b' },
  { id: 'dsa',      label: 'DSA',       icon: Code2,    color: '#6366f1' },
  { id: 'grind',    label: 'Grind',     icon: Flame,    color: '#f97316' },
  { id: 'leetcode', label: 'LeetCode',  icon: Code2,    color: '#10b981' },
];

const RANK_STYLES = [
  { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', text: '#fbbf24', label: '🥇' },
  { bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.4)', text: '#94a3b8', label: '🥈' },
  { bg: 'rgba(180,83,9,0.15)',   border: 'rgba(180,83,9,0.4)',   text: '#b45309', label: '🥉' },
];

function getRankStyle(rank) {
  if (rank <= 3) return RANK_STYLES[rank - 1];
  return null;
}

function getSortValue(row, tab) {
  switch (tab) {
    case 'dsa':      return row.dsa_done;
    case 'grind':    return row.grind_sessions;
    case 'leetcode': return (row.lc_easy ?? 0) + (row.lc_medium ?? 0) + (row.lc_hard ?? 0);
    default:         return row.score;
  }
}

function getSubLabel(row, tab) {
  switch (tab) {
    case 'dsa':      return `${row.dsa_done} topics done`;
    case 'grind':    return `${row.grind_sessions} sessions logged`;
    case 'leetcode': {
      const total = (row.lc_easy ?? 0) + (row.lc_medium ?? 0) + (row.lc_hard ?? 0);
      if (!total && !row.leetcode_username) return 'No LC linked';
      return `${row.lc_easy}E · ${row.lc_medium}M · ${row.lc_hard}H`;
    }
    default:         return `${row.score} pts`;
  }
}

export default function Leaderboard() {
  usePageTitle('Leaderboard');
  const { user, profile } = useAuth();
  const [tab, setTab]         = useState('overall');
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { load(); }, []);

  async function load(refresh = false) {
    if (refresh) setRefreshing(true); else setLoading(true);
    const { data } = await supabase
      .from('leaderboard_view')
      .select('*')
      .order('score', { ascending: false })
      .limit(100);
    if (data) setRows(data);
    if (refresh) setRefreshing(false); else setLoading(false);
  }

  const sorted = [...rows].sort((a, b) => getSortValue(b, tab) - getSortValue(a, tab));
  const myRank = sorted.findIndex(r => r.user_id === user?.id) + 1;
  const myRow  = sorted.find(r => r.user_id === user?.id);
  const isOptedIn = profile?.leaderboard_opt_in ?? false;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Trophy size={22} className="text-amber-400" /> Leaderboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">Rankings across the UpLevel community. Opt in via Settings.</p>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          className="glass p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw size={15} className={`text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* My rank card (if opted in) */}
      {isOptedIn && myRow ? (
        <div className="glass rounded-2xl p-4 border border-indigo-500/20"
          style={{ background: 'rgba(99,102,241,0.06)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {profile?.avatar_url
                ? <img src={profile.avatar_url} alt="" className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/40" />
                : <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">{profile?.name?.[0] ?? '?'}</div>
              }
              <div>
                <p className="text-white font-semibold text-sm">You · {profile?.name}</p>
                <p className="text-xs text-indigo-300 font-mono">{getSubLabel(myRow, tab)}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-white">#{myRank}</div>
              <div className="text-xs text-slate-400">your rank</div>
            </div>
          </div>
        </div>
      ) : !isOptedIn ? (
        <div className="glass rounded-2xl p-4 border border-amber-500/20 flex items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-semibold">You're not on the leaderboard yet</p>
            <p className="text-slate-400 text-xs mt-0.5">Opt in from Settings to show your rank publicly.</p>
          </div>
          <Link to="/settings" className="btn-primary flex items-center gap-1.5 shrink-0 text-sm">
            <Settings size={13} /> Settings
          </Link>
        </div>
      ) : null}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                tab === t.id
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <Icon size={13} style={{ color: tab === t.id ? undefined : t.color }} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Score formula note */}
      <p className="text-xs text-slate-600 font-mono">
        {tab === 'overall' && '// score = (dsa×10) + (roadmap×5) + (grind×3) + (lc easy×2) + (lc med×5) + (lc hard×10)'}
        {tab === 'dsa'      && '// ranked by DSA topics marked done'}
        {tab === 'grind'    && '// ranked by total grind sessions logged'}
        {tab === 'leetcode' && '// ranked by total LeetCode problems solved (easy+medium+hard)'}
      </p>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Trophy size={32} className="text-amber-400/30 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No one on the leaderboard yet.</p>
          <p className="text-slate-500 text-xs mt-1">Be the first — enable it in Settings.</p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          {sorted.map((row, idx) => {
            const rank      = idx + 1;
            const rankStyle = getRankStyle(rank);
            const isMe      = row.user_id === user?.id;
            const sortVal   = getSortValue(row, tab);

            return (
              <div
                key={row.user_id}
                className={`flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.04] last:border-0 transition-colors ${
                  isMe ? 'bg-indigo-500/[0.06]' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Rank */}
                <div className="w-8 shrink-0 text-center">
                  {rankStyle ? (
                    <span className="text-lg">{rankStyle.label}</span>
                  ) : (
                    <span className="text-sm font-mono text-slate-500">#{rank}</span>
                  )}
                </div>

                {/* Avatar */}
                {row.avatar_url
                  ? <img src={row.avatar_url} alt="" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                  : <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {row.name?.[0] ?? '?'}
                    </div>
                }

                {/* Name + sublabel */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold truncate ${isMe ? 'text-indigo-300' : 'text-white'}`}>
                      {row.name}{isMe ? ' (you)' : ''}
                    </span>
                    {row.leetcode_username && tab === 'leetcode' && (
                      <span className="text-xs text-slate-500 font-mono hidden sm:inline truncate">
                        @{row.leetcode_username}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{getSubLabel(row, tab)}</div>
                </div>

                {/* Score / value */}
                <div className="text-right shrink-0">
                  <div
                    className="text-base font-extrabold"
                    style={{ color: rankStyle?.text ?? (isMe ? '#818cf8' : '#e2e8f0') }}
                  >
                    {sortVal.toLocaleString()}
                  </div>
                  {tab === 'overall' && (
                    <div className="text-xs text-slate-500 font-mono">pts</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer note */}
      <p className="text-xs text-slate-600 text-center font-mono pb-2">
        // scores update in real-time · LeetCode stats refresh when you sync in Settings
      </p>
    </div>
  );
}
