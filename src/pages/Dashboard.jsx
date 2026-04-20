import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { DSA_CATEGORIES, TOTAL_TOPICS } from '../lib/dsa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Flame, Code2, CheckCircle2, BookOpen, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';

const MOODS = [
  { value: 'blocked',     emoji: '😵', label: 'Blocked'     },
  { value: 'distracted',  emoji: '😶', label: 'Distracted'  },
  { value: 'focused',     emoji: '🎯', label: 'Focused'     },
  { value: 'flow',        emoji: '🚀', label: 'Flow state'  },
];

export default function Dashboard() {
  const { user, profile, isPremium } = useAuth();
  const navigate = useNavigate();

  const [dsaProgress, setDsaProgress] = useState({});
  const [streak, setStreak] = useState(0);
  const [todayLog, setTodayLog] = useState(null);
  const [logForm, setLogForm] = useState({ problems_solved: '', study_minutes: '', mood: 'focused', note: '' });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  async function loadData() {
    setLoading(true);
    const [progRes, logRes, logsRes] = await Promise.all([
      supabase.from('dsa_progress').select('topic_id, status').eq('user_id', user.id),
      supabase.from('daily_logs').select('*').eq('user_id', user.id).eq('date', today).maybeSingle(),
      supabase.from('daily_logs').select('date').eq('user_id', user.id).order('date', { ascending: false }).limit(60),
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
        study_minutes: logRes.data.study_minutes,
        mood: logRes.data.mood,
        note: logRes.data.note ?? '',
      });
    }
    if (logsRes.data) setStreak(calcStreak(logsRes.data.map(r => r.date)));
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

  async function saveLog() {
    setSaving(true);
    const payload = {
      user_id: user.id,
      date: today,
      problems_solved: parseInt(logForm.problems_solved) || 0,
      study_minutes: parseInt(logForm.study_minutes) || 0,
      mood: logForm.mood,
      note: logForm.note || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('daily_logs').upsert(payload, { onConflict: 'user_id,date' });
    if (error) toast.error('Failed to save log');
    else { toast.success('Log saved!'); await loadData(); }
    setSaving(false);
  }

  const done    = Object.values(dsaProgress).filter(s => s === 'done').length;
  const learning= Object.values(dsaProgress).filter(s => s === 'learning').length;
  const pct     = Math.round((done / TOTAL_TOPICS) * 100);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

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
        <StatCard icon={<Flame size={20} className="text-orange-400 animate-fire" />} value={streak} label="Day streak" color="#f97316" />
        <StatCard icon={<CheckCircle2 size={20} className="text-emerald-400" />} value={done} label={`/ ${TOTAL_TOPICS} done`} color="#10b981" />
        <StatCard icon={<BookOpen size={20} className="text-indigo-400" />} value={learning} label="In progress" color="#6366f1" />
        <StatCard icon={<TrendingUp size={20} className="text-amber-400" />} value={`${pct}%`} label="DSA mastery" color="#f59e0b" />
      </div>

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
          {DSA_CATEGORIES.map(cat => {
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

      {/* Today's Log */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Today's Log</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Problems solved today</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={logForm.problems_solved}
              onChange={e => setLogForm(f => ({ ...f, problems_solved: e.target.value }))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Study time (minutes)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
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
            className="input"
            rows={2}
          />
        </div>

        <button onClick={saveLog} disabled={saving} className="btn-emerald flex items-center gap-2 disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
          {saving ? 'Saving…' : todayLog ? 'Update Log' : 'Save Log'}
        </button>
      </div>

      {/* Premium CTA (non-premium only) */}
      {!isPremium && (
        <div className="glass rounded-2xl p-5 border border-amber-500/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-amber-400" />
                <h3 className="font-semibold text-white">Unlock Interview Prep Vault</h3>
              </div>
              <p className="text-slate-400 text-sm">HLD cheatsheets, STAR story templates, salary negotiation scripts and more. Just ₹99/month.</p>
            </div>
            <button onClick={() => navigate('/premium')} className="btn-primary shrink-0 whitespace-nowrap">
              Upgrade
            </button>
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
