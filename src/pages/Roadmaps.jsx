import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { ROADMAPS } from '../lib/roadmaps';
import { TRACKS } from '../lib/resources';
import toast from 'react-hot-toast';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';

// Roadmap tracks (exclude 'all' — we show all by default when no track selected)
const ROADMAP_TRACKS = TRACKS.filter(t => t.id !== 'all');

export default function Roadmaps() {
  const { user, isPremium } = useAuth();
  const [progress, setProgress]     = useState({});
  const [expanded, setExpanded]     = useState({ 'sde2-product': true });
  const [selected, setSelected]     = useState('sde2-product');
  const [activeTrack, setActiveTrack] = useState('sde');
  const [saving, setSaving]         = useState(null);

  useEffect(() => { if (user) load(); }, [user]);

  async function load() {
    const { data } = await supabase
      .from('roadmap_progress')
      .select('roadmap_id,step_id,done')
      .eq('user_id', user.id);
    if (data) {
      const map = {};
      data.forEach(r => {
        if (!map[r.roadmap_id]) map[r.roadmap_id] = {};
        map[r.roadmap_id][r.step_id] = r.done;
      });
      setProgress(map);
    }
  }

  async function toggleStep(roadmapId, stepId) {
    const key = `${roadmapId}:${stepId}`;
    const current = progress[roadmapId]?.[stepId] ?? false;
    const next = !current;
    setSaving(key);
    setProgress(p => ({ ...p, [roadmapId]: { ...(p[roadmapId] ?? {}), [stepId]: next } }));

    const { error } = await supabase.from('roadmap_progress').upsert(
      { user_id: user.id, roadmap_id: roadmapId, step_id: stepId, done: next, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,roadmap_id,step_id' }
    );
    if (error) {
      toast.error('Update failed');
      setProgress(p => ({ ...p, [roadmapId]: { ...(p[roadmapId] ?? {}), [stepId]: current } }));
    }
    setSaving(null);
  }

  // Filter roadmaps by active track, then pick the selected one
  const trackRoadmaps = ROADMAPS.filter(r => r.track === activeTrack);

  // When the track changes, auto-select the first roadmap in that track
  function handleTrackChange(trackId) {
    setActiveTrack(trackId);
    const first = ROADMAPS.find(r => r.track === trackId);
    if (first) setSelected(first.id);
  }

  const roadmap = ROADMAPS.find(r => r.id === selected);
  const roadmapProg = progress[selected] ?? {};
  const allSteps = roadmap?.phases.flatMap(ph => ph.steps) ?? [];
  const doneCount = allSteps.filter(s => roadmapProg[s.id]).length;
  const pct = allSteps.length ? Math.round((doneCount / allSteps.length) * 100) : 0;
  const locked = roadmap?.premium && !isPremium;

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Career Roadmaps</h1>
        <p className="text-slate-400 text-sm mt-1">Step-by-step paths to your target role. Check off steps as you complete them.</p>
      </div>

      {/* Track selector */}
      <div className="flex gap-2 flex-wrap">
        {ROADMAP_TRACKS.map(t => (
          <button
            key={t.id}
            onClick={() => handleTrackChange(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
              activeTrack === t.id
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Roadmap selector — only shows roadmaps for the active track */}
      {trackRoadmaps.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {trackRoadmaps.map(r => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                selected === r.id
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span>{r.emoji}</span>
              <span className="hidden sm:inline">{r.label}</span>
              {r.premium && !isPremium && <Lock size={12} className="text-amber-400" />}
            </button>
          ))}
        </div>
      )}

      {roadmap && (
        <>
          {/* Roadmap header */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{roadmap.emoji}</span>
                  <h2 className="text-lg font-bold text-white">{roadmap.label}</h2>
                  {roadmap.premium && !isPremium && (
                    <span className="badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', fontSize: '0.6rem' }}>PRO</span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">{roadmap.description}</p>
                <p className="text-slate-500 text-xs mt-1">Estimated: {roadmap.duration}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl font-extrabold text-white">{pct}%</div>
                <div className="text-xs text-slate-400">{doneCount}/{allSteps.length} done</div>
              </div>
            </div>
            <div className="progress-track h-2">
              <div className="progress-fill h-2" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${roadmap.color}, #10b981)` }} />
            </div>
          </div>

          {/* Locked overlay for premium roadmaps */}
          {locked ? (
            <div className="glass rounded-2xl p-10 text-center border border-amber-500/20">
              <Lock size={32} className="text-amber-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Premium Roadmap</h3>
              <p className="text-slate-400 text-sm mb-6">This roadmap is available for Premium members. Upgrade for just ₹99/month.</p>
              <a href="/premium" className="btn-primary inline-flex">Unlock for ₹99/mo</a>
            </div>
          ) : (
            <div className="space-y-4">
              {roadmap.phases.map((phase, idx) => {
                const phDone = phase.steps.filter(s => roadmapProg[s.id]).length;
                const isOpen = expanded[phase.id] !== false;
                return (
                  <div key={phase.id} className="glass rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpanded(e => ({ ...e, [phase.id]: !isOpen }))}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                          style={{ background: phase.color + '30', border: `1px solid ${phase.color}40` }}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{phase.label}</div>
                          <div className="text-xs text-slate-500">Week {phase.weeks} · {phDone}/{phase.steps.length} done</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="progress-track h-1.5 w-16">
                          <div className="progress-fill h-1.5" style={{ width: `${Math.round((phDone/phase.steps.length)*100)}%`, background: phase.color }} />
                        </div>
                        {isOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/[0.06] divide-y divide-white/[0.04]">
                        {phase.steps.map(step => {
                          const done = roadmapProg[step.id] ?? false;
                          const busy = saving === `${roadmap.id}:${step.id}`;
                          return (
                            <div
                              key={step.id}
                              onClick={() => !busy && toggleStep(roadmap.id, step.id)}
                              className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] cursor-pointer transition-colors"
                            >
                              {busy
                                ? <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0" />
                                : <input type="checkbox" checked={done} readOnly className="checkbox shrink-0" />
                              }
                              <span className={`text-sm flex-1 ${done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
