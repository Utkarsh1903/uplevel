import { usePageTitle } from '../hooks/usePageTitle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { DSA_CATEGORIES, TOTAL_TOPICS } from '../lib/dsa';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import toast from 'react-hot-toast';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  Flame, Code2, CheckCircle2, BookOpen,
  TrendingUp, ChevronRight, Sparkles, History,
  CalendarDays, Trophy,
} from 'lucide-react';

const MOODS = [
  { value: 'blocked',    emoji: '😵', label: 'Blocked'    },
  { value: 'distracted', emoji: '😶', label: 'Distracted' },
  { value: 'focused',    emoji: '🎯', label: 'Focused'    },
  { value: 'flow',       emoji: '🚀', label: 'Flow state' },
];

const MOOD_COLORS = {
  blocked: '#ef4444', distracted: '#f59e0b',
  focused: '#6366f1', flow: '#10b981',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs" style={{ border: '1px solid rgba(99,102,241,0.3)' }}>
      <p className="text-slate-400 font-mono mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  usePageTitle('Dashboard');
  const { user, profile, isPremium } = useAuth();
  const navigate = useNavigate();

  const [dsaProgress, setDsaProgress] = useState({});
  const [streak, setStreak]           = useState(0);
  const [todayLog, setTodayLog]       = useState(null);
  const [logForm, setLogForm]         = useState({ problems_solved: '', study_minutes: '', mood: 'focused', note: '' });
  const [saving, setSaving]           = useState(false);
  const [loading, setLoading]         = useState(true);
  const [pastLogs, setPastLogs]       = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [leaderRank, setLeaderRank]   = useState(null);

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => { if (user) loadData(); }, [user]);

  async function loadData() {
    setLoading(true);
    const thirtyDaysAgo = format(subDays(new Date(), 29), 'yyyy-MM-dd');

    const [progRes, logRes, logsRes, lbRes] = await Promise.all([
      supabase.from('dsa_progress').select('topic_id, status').eq('user_id', user.id),
      supabase.from('daily_logs').select('*').eq('user_id', user.id).eq('date', today).maybeSingle(),
      supabase.from('daily_logs').select('*')
        .eq('user_id', user.id)
        .gte('date', thirtyDaysAgo)
        .order('date', { ascending: false }),
      supabase.from('leaderboard_view').select('user_id,score').order('score', { ascending: false }).limit(100),
    ]);

    if (progRes.data) {
      const map = {};
      progRes.data.forEach(r => { map[r.topic_id] = r.status; });
      setDsaProgress(map);
    }
    if (logRes.data) {
      setTodayLog(logRes.data);
      setLogForm({
        problems_solved: logRes.data.problems_solved,
        study_minutes:   logRes.data.study_minutes,
        mood:            logRes.data.mood,
        note:            logRes.data.note ?? '',
      });
    }
    if (logsRes.data) {
      setPastLogs(logsRes.data);
      setStreak(calcStreak(logsRes.data.map(r => r.date)));
    }
    if (lbRes.data) {
      const rank = lbRes.data.findIndex(r => r.user_id === user.id) + 1;
      setLeaderRank(rank > 0 ? rank : null);
    }
    setLoading(false);
  }

  function calcStreak(dates) {
    if (!dates.length) return 0;
    let count = 0;
    let check = new Date();
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    for (const d of sorted) {
      const expected = format(check, 'yyyy-MM-dd');
      if (d === expected) { count++; check.setDate(check.getDate() - 1); }
      else if (d < expected) break;
    }
    return count;
  }

  // Build 30-day chart data (fill missing days with 0)
  const chartData = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date(),
  }).map(day => {
    const key  = format(day, 'yyyy-MM-dd');
    const log  = pastLogs.find(l => l.date === key);
    return {
      date: format(day, 'MMM d'),
      problems: log?.problems_solved ?? 0,
      minutes:  log?.study_minutes   ?? 0,
    };
  });

  async function saveLog() {
    setSaving(true);
    const payload = {
      user_id:         user.id,
      date:            today,
      problems_solved: parseInt(logForm.problems_solved) || 0,
      study_minutes:   parseInt(logForm.study_minutes)   || 0,
      mood:            logForm.mood,
      note:            logForm.note || null,
      updated_at:      new Date().toISOString(),
    };
    const { error } = await supabase.from('daily_logs').upsert(payload, { onConflict: 'user_id,date' });
    if (error) toast.error('Failed to save log');
    else { toast.success('Log saved!'); await loadData(); }
    setSaving(false);
  }

  const done     = Object.values(dsaProgress).filter(s => s === 'done').length;
  const learning = Object.values(dsaProgress).filter(s => s === 'learning').length;
  const pct      = Math.round((done / TOTAL_TOPICS) * 100);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const totalProblems = pastLogs.reduce((s, l) => s + (l.problems_solved || 0), 0);
  const totalMinutes  = pastLogs.reduce((s, l) => s + (l.study_minutes  || 0), 0);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">
          {greeting()}, {profile?.name?.split(' ')[0] ?? 'Coder'} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {format(new Date(), 'EEEE, MMMM d, yyyy')} · {streak > 0 ? `${streak}-day streak 🔥` : 'Start your streak today'}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={<Flame size={20} className="text-orange-400 animate-fire" />}     value={streak}          label="Day streak"    color="#f97316" />
        <StatCard icon={<CheckCircle2 size={20} className="text-emerald-400" />}           value={done}            label={`/ ${TOTAL_TOPICS} done`} color="#10b981" />
        <StatCard icon={<BookOpen size={20} className="text-indigo-400" />}                value={learning}        label="In progress"   color="#6366f1" />
        <StatCard icon={<TrendingUp size={20} className="text-amber-400" />}               value={`${pct}%`}       label="DSA mastery"   color="#f59e0b" />
      </div>

      {/* LeetCode + Leaderboard row */}
      {(profile?.leetcode_username || leaderRank) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {profile?.leetcode_username && (
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code2 size={15} className="text-amber-400" />
                  <span className="text-sm font-semibold text-white">LeetCode</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">@{profile.leetcode_username}</span>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 text-center">
                  <div className="text-xl font-extrabold" style={{ color: '#4ade80' }}>{profile.leetcode_easy ?? 0}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Easy</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xl font-extrabold" style={{ color: '#fb923c' }}>{profile.leetcode_medium ?? 0}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Medium</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xl font-extrabold" style={{ color: '#f87171' }}>{profile.leetcode_hard ?? 0}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Hard</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xl font-extrabold text-white">
                    {(profile.leetcode_easy ?? 0) + (profile.leetcode_medium ?? 0) + (profile.leetcode_hard ?? 0)}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Total</div>
                </div>
              </div>
            </div>
          )}
          {leaderRank && (
            <div className="glass rounded-2xl p-4 cursor-pointer hover:bg-white/[0.03] transition-colors" onClick={() => navigate('/leaderboard')}>
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={15} className="text-amber-400" />
                <span className="text-sm font-semibold text-white">Your Rank</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-white">#{leaderRank}</div>
                  <div className="text-xs text-slate-400 mt-0.5">on the leaderboard</div>
                </div>
                <div className="text-xs text-indigo-400 flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DSA Progress bar */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">DSA Progress</h2>
          <button onClick={() => navigate('/dsa')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            View all <ChevronRight size={13} />
          </button>
        </div>
        <div className="progress-track h-2.5 mb-4">
          <div className="progress-fill h-2.5" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#6366f1,#10b981)' }} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DSA_CATEGORIES.slice(0, 10).map(cat => {
            const catDone = cat.topics.filter(t => dsaProgress[t.id] === 'done').length;
            const catPct  = Math.round((catDone / cat.topics.length) * 100);
            return (
              <div key={cat.id} className="text-center p-2 glass rounded-xl">
                <div className="text-lg mb-1">{cat.emoji}</div>
                <div className="text-xs text-slate-400 mb-1 truncate">{cat.label.split(' ')[0]}</div>
                <div className="text-xs font-bold" style={{ color: cat.color }}>{catPct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Activity Charts ── */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <CalendarDays size={16} className="text-indigo-400" />
            Last 30 Days Activity
          </h2>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span><span className="text-indigo-400 font-bold">{totalProblems}</span> problems</span>
            <span><span className="text-emerald-400 font-bold">{Math.round(totalMinutes / 60)}h</span> studied</span>
          </div>
        </div>

        {/* Problems chart */}
        <div className="mb-2">
          <p className="text-xs text-slate-500 mb-2 font-mono">// problems_solved per day</p>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="problemsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} interval={6} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="problems" name="Problems" stroke="#6366f1" strokeWidth={2} fill="url(#problemsGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Study minutes chart */}
        <div>
          <p className="text-xs text-slate-500 mb-2 font-mono">// study_minutes per day</p>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} interval={6} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="minutes" name="Minutes" fill="#10b981" opacity={0.7} radius={[3, 3, 0, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Log */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Today's Log</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Problems solved today</label>
            <input
              type="number" min="0" placeholder="0"
              value={logForm.problems_solved}
              onChange={e => setLogForm(f => ({ ...f, problems_solved: e.target.value }))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Study time (minutes)</label>
            <input
              type="number" min="0" placeholder="0"
              value={logForm.study_minutes}
              onChange={e => setLogForm(f => ({ ...f, study_minutes: e.target.value }))}
              className="input"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-2">Today's mood</label>
          <div className="flex gap-2 flex-wrap">
            {MOODS.map(m => (
              <button
                key={m.value}
                onClick={() => setLogForm(f => ({ ...f, mood: m.value }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  logForm.mood === m.value
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-1.5">Note (optional)</label>
          <textarea
            placeholder="What did you learn today? Any blockers?"
            value={logForm.note}
            onChange={e => setLogForm(f => ({ ...f, note: e.target.value }))}
            className="input" rows={2}
          />
        </div>

        <button onClick={saveLog} disabled={saving} className="btn-emerald flex items-center gap-2 disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
          {saving ? 'Saving…' : todayLog ? 'Update Log' : 'Save Log'}
        </button>
      </div>

      {/* ── Past Logs History ── */}
      <div className="glass rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowHistory(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-2">
            <History size={16} className="text-indigo-400" />
            <span className="font-semibold text-white">Activity History</span>
            <span className="text-slate-500 text-sm">({pastLogs.length} logs)</span>
          </div>
          <ChevronRight size={16} className={`text-slate-500 transition-transform ${showHistory ? 'rotate-90' : ''}`} />
        </button>

        {showHistory && (
          <div>
            {pastLogs.length === 0 ? (
              <div className="px-5 py-8 text-center text-slate-500 text-sm">No logs yet. Start logging daily!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 border-y border-white/[0.04]">
                      <th className="text-left px-5 py-2.5 font-medium">Date</th>
                      <th className="text-left px-5 py-2.5 font-medium">Problems</th>
                      <th className="text-left px-5 py-2.5 font-medium hidden sm:table-cell">Study</th>
                      <th className="text-left px-5 py-2.5 font-medium hidden sm:table-cell">Mood</th>
                      <th className="text-left px-5 py-2.5 font-medium hidden md:table-cell">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    {pastLogs.map(log => {
                      const moodObj = MOODS.find(m => m.value === log.mood) ?? MOODS[2];
                      return (
                        <tr key={log.id ?? log.date} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-3">
                            <span className="font-mono text-xs text-slate-300">
                              {format(new Date(log.date), 'MMM d, yyyy')}
                            </span>
                            {log.date === today && (
                              <span className="ml-2 badge status-done" style={{ fontSize: '0.6rem' }}>Today</span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            <span className="font-bold font-mono" style={{ color: log.problems_solved > 0 ? '#6366f1' : '#475569' }}>
                              {log.problems_solved ?? 0}
                            </span>
                          </td>
                          <td className="px-5 py-3 hidden sm:table-cell">
                            <span className="text-xs font-mono" style={{ color: log.study_minutes > 0 ? '#10b981' : '#475569' }}>
                              {log.study_minutes ?? 0}m
                            </span>
                          </td>
                          <td className="px-5 py-3 hidden sm:table-cell">
                            <span
                              className="text-xs flex items-center gap-1"
                              style={{ color: MOOD_COLORS[log.mood] ?? '#94a3b8' }}
                            >
                              {moodObj.emoji} {moodObj.label}
                            </span>
                          </td>
                          <td className="px-5 py-3 hidden md:table-cell">
                            <span className="text-xs text-slate-500 truncate block max-w-[200px]">
                              {log.note || '—'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Premium CTA */}
      {!isPremium && (
        <div className="glass rounded-2xl p-5 border border-amber-500/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-amber-400" />
                <h3 className="font-semibold text-white">Unlock Interview Prep Vault</h3>
              </div>
              <p className="text-slate-400 text-sm">Full roadmaps, Interview Prep Vault, HLD cheatsheets, STAR templates. ₹499 one-time — first 100 users get it free.</p>
            </div>
            <button onClick={() => navigate('/premium')} className="btn-primary shrink-0 whitespace-nowrap">Upgrade</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}
