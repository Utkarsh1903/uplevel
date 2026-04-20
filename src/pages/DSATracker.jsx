import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { DSA_CATEGORIES, TOTAL_TOPICS, DIFF_CONFIG, FREQ_CONFIG } from '../lib/dsa';
import toast from 'react-hot-toast';
import { Search, CheckCircle2, Circle, BookOpen, ExternalLink } from 'lucide-react';

const STATUS_CYCLE = { todo: 'learning', learning: 'done', done: 'todo' };

const STATUS_CONFIG = {
  todo:     { label: 'Todo',     className: 'status-todo'     },
  learning: { label: 'Learning', className: 'status-learning' },
  done:     { label: 'Done',     className: 'status-done'     },
};

export default function DSATracker() {
  const { user } = useAuth();
  const [progress, setProgress]   = useState({});
  const [loading, setLoading]     = useState(true);
  const [updating, setUpdating]   = useState(null);
  const [search, setSearch]       = useState('');
  const [filterDiff, setFilterDiff] = useState('all');
  const [filterFreq, setFilterFreq] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { if (user) load(); }, [user]);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('dsa_progress').select('topic_id,status').eq('user_id', user.id);
    if (data) {
      const map = {};
      data.forEach(r => { map[r.topic_id] = r.status; });
      setProgress(map);
    }
    setLoading(false);
  }

  async function cycleStatus(topicId) {
    const current = progress[topicId] ?? 'todo';
    const next    = STATUS_CYCLE[current];
    setUpdating(topicId);
    setProgress(p => ({ ...p, [topicId]: next }));

    const { error } = await supabase.from('dsa_progress').upsert(
      { user_id: user.id, topic_id: topicId, status: next, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,topic_id' }
    );
    if (error) {
      toast.error('Update failed');
      setProgress(p => ({ ...p, [topicId]: current }));
    }
    setUpdating(null);
  }

  const done     = useMemo(() => Object.values(progress).filter(s => s === 'done').length,     [progress]);
  const learning = useMemo(() => Object.values(progress).filter(s => s === 'learning').length, [progress]);
  const pct      = Math.round((done / TOTAL_TOPICS) * 100);

  const filtered = useMemo(() => {
    return DSA_CATEGORIES.map(cat => ({
      ...cat,
      topics: cat.topics.filter(t => {
        const s = progress[t.id] ?? 'todo';
        if (filterStatus !== 'all' && s !== filterStatus) return false;
        if (filterDiff   !== 'all' && t.diff !== filterDiff)   return false;
        if (filterFreq   !== 'all' && t.freq !== filterFreq)   return false;
        if (search && !t.label.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    })).filter(cat => cat.topics.length > 0);
  }, [progress, search, filterDiff, filterFreq, filterStatus]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">DSA Tracker</h1>
        <p className="text-slate-400 text-sm mt-1">120+ topics across 10 categories. Click any topic to cycle status.</p>
      </div>

      {/* Progress overview */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div><span className="text-2xl font-extrabold text-white">{done}</span><span className="text-slate-400 text-sm"> / {TOTAL_TOPICS} done</span></div>
            <div className="flex gap-3 text-xs">
              <span className="status-learning badge px-2 py-0.5">{learning} Learning</span>
              <span className="status-todo badge px-2 py-0.5">{TOTAL_TOPICS - done - learning} Todo</span>
            </div>
          </div>
          <span className="text-slate-400 text-sm">{pct}%</span>
        </div>
        <div className="progress-track h-2">
          <div className="progress-fill h-2" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#6366f1,#10b981)' }} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search topics…"
            className="input pl-8"
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input w-auto">
          <option value="all">All status</option>
          <option value="todo">Todo</option>
          <option value="learning">Learning</option>
          <option value="done">Done</option>
        </select>
        <select value={filterDiff} onChange={e => setFilterDiff(e.target.value)} className="input w-auto">
          <option value="all">All difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select value={filterFreq} onChange={e => setFilterFreq(e.target.value)} className="input w-auto">
          <option value="all">All frequency</option>
          <option value="very-high">Must Know</option>
          <option value="high">Important</option>
          <option value="medium">Good to Know</option>
          <option value="low">Deep Dive</option>
        </select>
      </div>

      {/* Categories */}
      {filtered.map(cat => {
        const catDone = cat.topics.filter(t => progress[t.id] === 'done').length;
        return (
          <div key={cat.id} className="glass rounded-2xl overflow-hidden">
            {/* Category header */}
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <h2 className="font-semibold text-white">{cat.label}</h2>
                  <p className="text-xs text-slate-500">{catDone} / {cat.topics.length} done</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="progress-track h-1.5 w-20">
                  <div
                    className="progress-fill h-1.5"
                    style={{ width: `${Math.round((catDone/cat.topics.length)*100)}%`, background: cat.color }}
                  />
                </div>
              </div>
            </div>

            {/* Topics list */}
            <div className="divide-y divide-white/[0.04]">
              {cat.topics.map(topic => {
                const status = progress[topic.id] ?? 'todo';
                const diff   = DIFF_CONFIG[topic.diff];
                const freq   = FREQ_CONFIG[topic.freq];
                const busy   = updating === topic.id;

                return (
                  <div
                    key={topic.id}
                    onClick={() => !busy && cycleStatus(topic.id)}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] cursor-pointer transition-colors"
                  >
                    {/* Status icon */}
                    <div className="shrink-0">
                      {busy ? (
                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      ) : status === 'done' ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : status === 'learning' ? (
                        <BookOpen size={20} className="text-amber-400" />
                      ) : (
                        <Circle size={20} className="text-slate-600" />
                      )}
                    </div>

                    {/* Label */}
                    <span className={`flex-1 text-sm font-medium ${status === 'done' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {topic.label}
                    </span>

                    {/* Badges */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="badge hidden sm:inline-flex"
                        style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
                      >
                        {diff.label}
                      </span>
                      <span className="text-xs hidden md:inline" style={{ color: freq.color }}>{freq.label}</span>
                      <span
                        className={`badge text-xs ${STATUS_CONFIG[status].className}`}
                        style={{ minWidth: 60, textAlign: 'center' }}
                      >
                        {STATUS_CONFIG[status].label}
                      </span>
                      {topic.link && (
                        <a
                          href={topic.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-indigo-500/20"
                          title="Solve on LeetCode / GFG"
                          style={{ color: 'var(--c-text-3)' }}
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No topics match your filters. <button onClick={() => { setSearch(''); setFilterDiff('all'); setFilterFreq('all'); setFilterStatus('all'); }} className="text-indigo-400 hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  );
}
