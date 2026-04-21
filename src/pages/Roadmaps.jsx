import { usePageTitle } from '../hooks/usePageTitle';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { ROADMAPS } from '../lib/roadmaps';
import { TRACKS } from '../lib/resources';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Lock, Play, FileText, ExternalLink, BookOpen, Sparkles } from 'lucide-react';

// Roadmap tracks (exclude 'all' — we show all by default when no track selected)
const ROADMAP_TRACKS = TRACKS.filter(t => t.id !== 'all');

export default function Roadmaps() {
  usePageTitle('Career Roadmaps');
  const { user, isPremium } = useAuth();
  const location = useLocation();
  // Restore context when returning from an article page
  const [progress, setProgress]       = useState({});
  const [expanded, setExpanded]       = useState(() => ({ [location.state?.roadmapId ?? 'sde2-product']: true }));
  const [selected, setSelected]       = useState(() => location.state?.roadmapId ?? 'sde2-product');
  const [activeTrack, setActiveTrack] = useState(() => location.state?.trackId   ?? 'sde');
  const [saving, setSaving]           = useState(null);

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
              <p className="text-slate-400 text-sm mb-6">This roadmap is available for Premium members. Upgrade for ₹499 one-time — pay once, access forever.</p>
              <a href="/premium" className="btn-primary inline-flex">Unlock — ₹499 one-time</a>
            </div>
          ) : (
            <div className="space-y-4">
              {roadmap.phases.map((phase, idx) => {
                const phDone      = phase.steps.filter(s => roadmapProg[s.id]).length;
                const isOpen      = expanded[phase.id] !== false;
                const freePhases  = roadmap.freePhases ?? roadmap.phases.length;
                const phLocked    = !isPremium && idx >= freePhases;

                return (
                  <div key={phase.id} className="glass rounded-2xl overflow-hidden">
                    {/* Phase header — always visible */}
                    <button
                      onClick={() => !phLocked && setExpanded(e => ({ ...e, [phase.id]: !isOpen }))}
                      className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors ${phLocked ? 'cursor-default opacity-60' : 'hover:bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                          style={{ background: phase.color + '30', border: `1px solid ${phase.color}40` }}>
                          {phLocked ? <Lock size={14} /> : idx + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            {phase.label}
                            {phLocked && (
                              <span className="text-xs font-normal px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}>
                                Premium
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">Week {phase.weeks} · {phase.steps.length} steps</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {!phLocked && (
                          <div className="progress-track h-1.5 w-16">
                            <div className="progress-fill h-1.5" style={{ width: `${Math.round((phDone/phase.steps.length)*100)}%`, background: phase.color }} />
                          </div>
                        )}
                        {!phLocked && (isOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />)}
                      </div>
                    </button>

                    {/* Locked phase — blurred preview + CTA */}
                    {phLocked && (
                      <div className="relative border-t border-white/[0.06]" style={{ minHeight: '210px' }}>
                        {/* blurred ghost of steps */}
                        <div className="px-5 py-3 space-y-3 select-none pointer-events-none" style={{ filter: 'blur(4px)', opacity: 0.35 }}>
                          {phase.steps.slice(0, 3).map(step => (
                            <div key={step.id} className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded border border-white/20 shrink-0" />
                              <div className="h-3 rounded bg-white/10 flex-1" />
                            </div>
                          ))}
                        </div>
                        {/* overlay CTA */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="glass rounded-2xl px-5 py-5 text-center" style={{ border: '1px solid rgba(251,191,36,0.3)', minWidth: '220px' }}>
                            <Lock size={20} className="text-amber-400 mx-auto mb-2" />
                            <p className="text-white text-sm font-semibold mb-0.5">Premium phase</p>
                            <p className="text-slate-400 text-xs mb-3">Unlock all phases for ₹499 — one-time, forever.</p>
                            <a href="/premium" className="btn-primary text-xs px-4 py-1.5 inline-flex items-center gap-1.5 whitespace-nowrap">
                              <Sparkles size={11} /> Unlock ₹499
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Open free phase — full content */}
                    {!phLocked && isOpen && (
                      <div className="border-t border-white/[0.06]">
                        {phase.steps.map(step => {
                          const done = roadmapProg[step.id] ?? false;
                          const busy = saving === `${roadmap.id}:${step.id}`;
                          const hasResources = step.resources?.length > 0;
                          return (
                            <div key={step.id} className="border-b border-white/[0.04] last:border-0">
                              <div
                                onClick={() => !busy && toggleStep(roadmap.id, step.id)}
                                className="flex items-start gap-3 px-5 py-3 hover:bg-white/[0.02] cursor-pointer transition-colors"
                              >
                                <div className="mt-0.5 shrink-0">
                                  {busy
                                    ? <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                    : <input type="checkbox" checked={done} readOnly className="checkbox" />
                                  }
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className={`text-sm ${done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                    {step.label}
                                  </span>
                                  {hasResources && (
                                    <div className="flex flex-wrap gap-1.5 mt-2" onClick={e => e.stopPropagation()}>
                                      {step.resources.map((res, i) => {
                                        if (res.type === 'article') {
                                          return (
                                            <Link
                                              key={i}
                                              to={res.url}
                                              state={{ roadmapId: roadmap.id, trackId: activeTrack }}
                                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors hover:opacity-90"
                                              style={{ background: 'rgba(16,185,129,0.12)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.2)' }}
                                            >
                                              <BookOpen size={9} />
                                              {res.label}
                                            </Link>
                                          );
                                        }
                                        return (
                                          <a
                                            key={i}
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors hover:opacity-90"
                                            style={res.type === 'video'
                                              ? { background: 'rgba(236,72,153,0.12)', color: '#f472b6', border: '1px solid rgba(236,72,153,0.2)' }
                                              : { background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }
                                            }
                                          >
                                            {res.type === 'video'
                                              ? <Play size={9} fill="currentColor" />
                                              : <FileText size={9} />
                                            }
                                            {res.label}
                                            <ExternalLink size={8} className="opacity-60" />
                                          </a>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
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
