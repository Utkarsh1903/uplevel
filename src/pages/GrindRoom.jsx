import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { usePageTitle } from '../hooks/usePageTitle';
import { Flame, Users, Timer, LogOut, TrendingUp } from 'lucide-react';

const FOCUS_OPTIONS = [
  { id: 'dsa',       label: 'DSA / LeetCode',      emoji: '💻', color: '#10b981' },
  { id: 'system',    label: 'System Design',        emoji: '🏗️', color: '#6366f1' },
  { id: 'roadmap',   label: 'Career Roadmap',       emoji: '🗺️', color: '#f59e0b' },
  { id: 'resources', label: 'Reading Resources',    emoji: '📚', color: '#ec4899' },
  { id: 'mock',      label: 'Mock Interview Prep',  emoji: '🎯', color: '#a78bfa' },
  { id: 'resume',    label: 'Resume Building',      emoji: '📝', color: '#06b6d4' },
];

const QUOTES = [
  "The people who make it aren't smarter. They just showed up more consistently.",
  "Your TCS badge won't get you into Flipkart. Your LeetCode count will.",
  "Every problem solved today is a step closer to the offer.",
  "They laughed at service company engineers. Until they got the Amazon offer.",
  "Consistency beats talent when talent doesn't show up.",
  "The grind is temporary. The switch is permanent.",
  "Someone at Swiggy is reviewing resumes right now. Make sure yours is ready.",
];

function fmt(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const TODAY = new Date().toISOString().slice(0, 10);

export default function GrindRoom() {
  usePageTitle('Grind Room');

  const { user, profile } = useAuth();
  const [joined, setJoined]           = useState(false);
  const [selectedFocus, setSelectedFocus] = useState('dsa');
  const [sessions, setSessions]       = useState([]);   // today's grind_sessions rows
  const [elapsed, setElapsed]         = useState(0);
  const [loading, setLoading]         = useState(true);
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const timerRef    = useRef(null);
  const joinTimeRef = useRef(null);

  // Load today's sessions + subscribe to real-time changes
  useEffect(() => {
    loadSessions();

    const sub = supabase
      .channel('grind-sessions-today')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'grind_sessions',
        filter: `date=eq.${TODAY}`,
      }, () => { loadSessions(); })
      .subscribe();

    return () => { sub.unsubscribe(); };
  }, []);

  async function loadSessions() {
    const { data } = await supabase
      .from('grind_sessions')
      .select('user_id, focus')
      .eq('date', TODAY);
    setSessions(data ?? []);
    setLoading(false);

    // Check if current user already joined today
    const mine = (data ?? []).find(s => s.user_id === user.id);
    if (mine) {
      setJoined(true);
      setSelectedFocus(mine.focus);
    }
  }

  async function joinRoom() {
    const { error } = await supabase.from('grind_sessions').upsert(
      { user_id: user.id, date: TODAY, focus: selectedFocus },
      { onConflict: 'user_id,date' }
    );
    if (error) return;
    setJoined(true);
    joinTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - joinTimeRef.current) / 1000));
    }, 1000);
  }

  async function switchFocus(focusId) {
    setSelectedFocus(focusId);
    await supabase.from('grind_sessions')
      .update({ focus: focusId })
      .eq('user_id', user.id)
      .eq('date', TODAY);
  }

  function leaveRoom() {
    clearInterval(timerRef.current);
    setJoined(false);
    setElapsed(0);
    // Row stays — they still count as active today
  }

  useEffect(() => () => clearInterval(timerRef.current), []);

  const total = sessions.length;
  const activeFocus = FOCUS_OPTIONS.find(f => f.id === selectedFocus);

  const focusCounts = FOCUS_OPTIONS.map(f => ({
    ...f,
    count: sessions.filter(s => s.focus === f.id).length,
  })).filter(f => f.count > 0);

  const maxCount = Math.max(...focusCounts.map(f => f.count), 1);

  return (
    <div className="max-w-3xl mx-auto space-y-6 fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame size={22} className="text-orange-400" />
            <h1 className="text-2xl font-extrabold text-white">Grind Room</h1>
          </div>
          <p className="text-slate-400 text-sm">Engineers who showed up today. You're not alone in this.</p>
        </div>
        {joined && (
          <button
            onClick={leaveRoom}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
          >
            <LogOut size={12} /> Leave Session
          </button>
        )}
      </div>

      {/* Daily active count */}
      <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: total > 0
              ? 'radial-gradient(ellipse at 50% 0%, rgba(251,146,60,0.07) 0%, transparent 70%)'
              : 'none'
          }}
        />
        <div className="relative">
          {loading ? (
            <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            <>
              <div
                className="text-7xl font-black text-white font-mono mb-2 tabular-nums"
                style={{ textShadow: total > 0 ? '0 0 40px rgba(251,146,60,0.25)' : 'none' }}
              >
                {total}
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-1">
                <Users size={15} />
                <span>{total === 1 ? 'engineer grinded today' : 'engineers grinded today'}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-mono">
                <TrendingUp size={11} />
                <span>resets at midnight · updates live</span>
              </div>
              {total === 0 && !loading && (
                <p className="text-slate-600 text-xs mt-3 font-mono">// be the first one today</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Focus breakdown */}
      {focusCounts.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <p className="text-xs text-slate-500 font-mono mb-4">// what engineers worked on today</p>
          <div className="space-y-3">
            {focusCounts.map(f => (
              <div key={f.id} className="flex items-center gap-3">
                <span className="text-lg w-7 shrink-0">{f.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">{f.label}</span>
                    <span className="text-xs font-mono text-slate-500">
                      {f.count} {f.count === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06]">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{
                        width: `${(f.count / maxCount) * 100}%`,
                        background: f.color,
                        boxShadow: `0 0 8px ${f.color}60`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Join / Active session panel */}
      {!joined ? (
        <div className="glass rounded-2xl p-6 space-y-5">
          <div>
            <p className="text-white font-semibold mb-1">Log your grind session</p>
            <p className="text-slate-500 text-xs">What are you working on today? You'll be counted in today's total.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FOCUS_OPTIONS.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFocus(f.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                  selectedFocus === f.id
                    ? 'border-indigo-500 bg-indigo-500/20 text-white'
                    : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-base">{f.emoji}</span>
                <span className="truncate">{f.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={joinRoom}
            className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-3"
          >
            <Flame size={16} className="text-orange-300" />
            I'm grinding today
          </button>
        </div>
      ) : (
        <div className="glass rounded-2xl p-6 space-y-4" style={{ border: `1px solid ${activeFocus.color}30` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${activeFocus.color}20`, border: `1px solid ${activeFocus.color}40` }}
              >
                {activeFocus.emoji}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{activeFocus.label}</p>
                <p className="text-xs text-emerald-400 font-mono">✓ logged for today</p>
              </div>
            </div>
            {elapsed > 0 && (
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-white font-mono text-xl font-bold">
                  <Timer size={15} className="text-slate-400" />
                  {fmt(elapsed)}
                </div>
                <p className="text-xs text-slate-500">this session</p>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-2">Switch focus:</p>
            <div className="flex flex-wrap gap-1.5">
              {FOCUS_OPTIONS.map(f => (
                <button
                  key={f.id}
                  onClick={() => switchFocus(f.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    selectedFocus === f.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-white/10 text-slate-500 hover:text-white hover:border-white/20'
                  }`}
                >
                  {f.emoji} {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quote */}
      <div className="glass rounded-2xl p-5" style={{ borderLeft: '3px solid rgba(99,102,241,0.5)' }}>
        <p className="text-slate-300 text-sm leading-relaxed italic">"{quote}"</p>
      </div>
    </div>
  );
}
