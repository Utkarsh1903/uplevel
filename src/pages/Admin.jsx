import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';
import {
  Users, FileText, Briefcase, BarChart2,
  CheckCircle2, XCircle, Clock, Plus, Trash2,
  RefreshCw, ArrowLeft, Shield, Sparkles, Phone,
  Mail, Linkedin, ExternalLink, Star
} from 'lucide-react';

const ADMIN_EMAIL = 'sri.utkarsh1903@gmail.com';

const MENTOR_STATUS = {
  pending:   { label: 'Pending',   style: { background:'rgba(251,191,36,0.1)',  color:'#fbbf24', border:'1px solid rgba(251,191,36,0.25)' } },
  contacted: { label: 'Contacted', style: { background:'rgba(99,102,241,0.12)', color:'#a5b4fc', border:'1px solid rgba(99,102,241,0.25)' } },
  featured:  { label: 'Featured',  style: { background:'rgba(16,185,129,0.12)', color:'#6ee7b7', border:'1px solid rgba(16,185,129,0.25)' } },
  rejected:  { label: 'Rejected',  style: { background:'rgba(239,68,68,0.1)',   color:'#fca5a5', border:'1px solid rgba(239,68,68,0.2)'  } },
};

const PREMIUM_STATUS = {
  pending:   { label: 'Pending',   style: { background:'rgba(251,191,36,0.1)',  color:'#fbbf24', border:'1px solid rgba(251,191,36,0.25)' } },
  contacted: { label: 'Contacted', style: { background:'rgba(99,102,241,0.12)', color:'#a5b4fc', border:'1px solid rgba(99,102,241,0.25)' } },
  activated: { label: 'Activated', style: { background:'rgba(16,185,129,0.12)', color:'#6ee7b7', border:'1px solid rgba(16,185,129,0.25)' } },
  rejected:  { label: 'Rejected',  style: { background:'rgba(239,68,68,0.1)',   color:'#fca5a5', border:'1px solid rgba(239,68,68,0.2)'  } },
};

const CONTACT_ICONS = { whatsapp: Phone, email: Mail, linkedin: Linkedin };

function StatCard({ icon, value, label, color }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3" style={{ color }}>{icon}</div>
      <div className="text-2xl font-extrabold text-white font-mono">{value ?? '—'}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function StatusBadge({ status, map }) {
  const s = map[status] ?? map.pending;
  return (
    <span className="badge text-xs" style={s.style}>{s.label}</span>
  );
}

export default function Admin() {
  const { profile } = useAuth();
  const navigate    = useNavigate();
  const [tab, setTab] = useState('overview');
  const [loading, setLoading]       = useState(true);
  const [profiles, setProfiles]     = useState([]);
  const [mentorReqs, setMentorReqs] = useState([]);
  const [premiumReqs, setPremiumReqs] = useState([]);
  const [pros, setPros]             = useState([]);
  const [stats, setStats]           = useState({});

  const [showAddPro, setShowAddPro] = useState(false);
  const [proForm, setProForm] = useState({
    name: '', role: '', company: '', topmate_url: '', linkedin_url: '', bio: '', tags: '',
  });
  const [savingPro, setSavingPro] = useState(false);

  const isAdmin = profile?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (profile && !isAdmin) { navigate('/dashboard', { replace: true }); }
    if (isAdmin) loadAll();
  }, [profile]);

  async function loadAll() {
    setLoading(true);
    const today   = format(new Date(), 'yyyy-MM-dd');
    const weekAgo = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    const [profilesRes, logsRes, logsAllRes, mentorRes, premiumRes, prosRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('daily_logs').select('user_id').eq('date', today),
      supabase.from('daily_logs').select('problems_solved, study_minutes, date').gte('date', weekAgo),
      supabase.from('feature_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('premium_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('professionals').select('*').order('sort_order', { ascending: true }),
    ]);

    const allProfiles  = profilesRes.data  ?? [];
    const todayLogs    = logsRes.data       ?? [];
    const recentLogs   = logsAllRes.data    ?? [];
    const mentorData   = mentorRes.data     ?? [];
    const premiumData  = premiumRes.data    ?? [];

    setProfiles(allProfiles);
    setMentorReqs(mentorData);
    setPremiumReqs(premiumData);
    setPros(prosRes.data ?? []);

    const totalProblems    = recentLogs.reduce((s, l) => s + (l.problems_solved || 0), 0);
    const pendingMentors   = mentorData.filter(r => r.status === 'pending').length;
    const pendingPremiums  = premiumData.filter(r => r.status === 'pending').length;

    setStats({
      totalUsers:      allProfiles.length,
      activeToday:     todayLogs.length,
      problemsThisWeek: totalProblems,
      pendingMentors,
      pendingPremiums,
    });
    setLoading(false);
  }

  async function updateMentorStatus(id, status) {
    const { error } = await supabase.from('feature_requests').update({ status }).eq('id', id);
    if (error) { toast.error('Update failed'); return; }
    setMentorReqs(r => r.map(req => req.id === id ? { ...req, status } : req));
    toast.success(`Marked as ${status}`);
  }

  async function updatePremiumStatus(id, status) {
    const { error } = await supabase.from('premium_requests').update({ status }).eq('id', id);
    if (error) { toast.error('Update failed'); return; }
    setPremiumReqs(r => r.map(req => req.id === id ? { ...req, status } : req));
    toast.success(`Marked as ${status}`);
  }

  async function togglePro(id, current) {
    const { error } = await supabase.from('professionals').update({ is_active: !current }).eq('id', id);
    if (error) { toast.error('Update failed'); return; }
    setPros(p => p.map(pro => pro.id === id ? { ...pro, is_active: !current } : pro));
    toast.success(current ? 'Hidden from site' : 'Now visible');
  }

  async function deletePro(id) {
    if (!window.confirm('Delete this professional?')) return;
    const { error } = await supabase.from('professionals').delete().eq('id', id);
    if (error) { toast.error('Delete failed'); return; }
    setPros(p => p.filter(pro => pro.id !== id));
    toast.success('Deleted');
  }

  async function addProfessional(e) {
    e.preventDefault();
    if (!proForm.name || !proForm.role || !proForm.company) {
      toast.error('Name, role and company are required');
      return;
    }
    setSavingPro(true);
    const tags = proForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const { data, error } = await supabase.from('professionals').insert({
      name: proForm.name, role: proForm.role, company: proForm.company,
      topmate_url: proForm.topmate_url || null, linkedin_url: proForm.linkedin_url || null,
      bio: proForm.bio || null, tags, sort_order: pros.length + 1,
    }).select().single();
    setSavingPro(false);
    if (error) { toast.error('Failed to add'); return; }
    setPros(p => [...p, data]);
    setProForm({ name: '', role: '', company: '', topmate_url: '', linkedin_url: '', bio: '', tags: '' });
    setShowAddPro(false);
    toast.success('Professional added!');
  }

  if (!profile || !isAdmin) return null;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const TABS = [
    { id: 'overview',       label: 'Users',             icon: Users,    badge: null },
    { id: 'premium-reqs',   label: 'Premium Requests',  icon: Sparkles, badge: stats.pendingPremiums },
    { id: 'mentor-reqs',    label: 'Mentor Applications', icon: Star,   badge: stats.pendingMentors },
    { id: 'professionals',  label: 'Professionals',     icon: Briefcase, badge: null },
  ];

  return (
    <div className="min-h-screen bg-mesh p-4 md:p-8" style={{ color: 'var(--c-text-1)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <Shield size={20} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
              <p className="text-xs font-mono" style={{ color: 'var(--c-text-3)' }}>// access_level: superadmin · {profile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadAll} className="btn-ghost flex items-center gap-1.5 text-sm">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-ghost flex items-center gap-1.5 text-sm">
              <ArrowLeft size={14} /> Dashboard
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={20} />}    value={stats.totalUsers}        label="Total Users"         color="#6366f1" />
          <StatCard icon={<CheckCircle2 size={20}/>} value={stats.activeToday}    label="Active Today"        color="#10b981" />
          <StatCard icon={<Sparkles size={20} />} value={stats.pendingPremiums}   label="Pending Premium Reqs" color="#f59e0b" />
          <StatCard icon={<Star size={20} />}     value={stats.pendingMentors}    label="Pending Mentor Apps" color="#ec4899" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                tab === id
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Icon size={14} />{label}
              {badge > 0 && (
                <span className="badge text-xs" style={{ background: 'rgba(236,72,153,0.15)', color: '#f472b6', border: '1px solid rgba(236,72,153,0.25)', minWidth: 20, justifyContent: 'center' }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TAB: Users ── */}
        {tab === 'overview' && (
          <div className="glass rounded-2xl overflow-hidden fade-in">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <h2 className="font-semibold text-white">All Users ({profiles.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-white/[0.04]">
                    <th className="text-left px-5 py-3 font-medium">User</th>
                    <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Role</th>
                    <th className="text-left px-5 py-3 font-medium">Plan</th>
                    <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {profiles.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {p.name?.[0] ?? '?'}
                          </div>
                          <div>
                            <p className="text-white font-medium text-xs">{p.name ?? 'Unknown'}</p>
                            <p className="text-slate-500 text-xs">{p.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs hidden md:table-cell">{p.curr_role ?? '—'}</td>
                      <td className="px-5 py-3">
                        <span className={`badge text-xs ${p.is_premium ? 'status-done' : 'status-todo'}`}>
                          {p.is_premium ? '✦ Premium' : 'Free'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs hidden sm:table-cell font-mono">
                        {p.created_at ? format(new Date(p.created_at), 'MMM d, yyyy') : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: Premium Requests ── */}
        {tab === 'premium-reqs' && (
          <div className="space-y-4 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold">Premium Upgrade Requests</h2>
                <p className="text-slate-500 text-xs mt-0.5">Users who filled the "Request Premium Access" form on the Premium page.</p>
              </div>
              <span className="badge" style={{ background:'rgba(251,191,36,0.1)', color:'#fbbf24', border:'1px solid rgba(251,191,36,0.25)' }}>
                {premiumReqs.length} total · {stats.pendingPremiums} pending
              </span>
            </div>

            {premiumReqs.length === 0 ? (
              <div className="glass rounded-2xl p-10 text-center text-slate-500">No premium requests yet.</div>
            ) : premiumReqs.map(req => {
              const ContactIcon = CONTACT_ICONS[req.contact_type] ?? Phone;
              return (
                <div key={req.id} className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {req.name?.[0] ?? '?'}
                        </div>
                        <div>
                          <span className="text-white font-semibold">{req.name}</span>
                          <StatusBadge status={req.status ?? 'pending'} map={PREMIUM_STATUS} />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <ContactIcon size={11} className="text-indigo-400 shrink-0" />
                          <span className="font-mono">{req.contact}</span>
                          <span className="text-slate-600">({req.contact_type})</span>
                        </div>
                        <div className="text-slate-400">
                          Plan: <span className="text-white font-medium capitalize">{req.plan_period ?? 'monthly'}</span>
                        </div>
                      </div>

                      {req.message && (
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed border-l-2 border-indigo-500/30 pl-3 italic">
                          "{req.message}"
                        </p>
                      )}
                      <p className="text-xs text-slate-600 mt-2 font-mono">
                        {req.created_at ? format(new Date(req.created_at), 'MMM d, yyyy · HH:mm') : '—'}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 min-w-[130px]">
                      {req.status !== 'contacted' && (
                        <button onClick={() => updatePremiumStatus(req.id, 'contacted')} className="btn-ghost text-xs px-3 py-1.5 w-full">
                          Mark Contacted
                        </button>
                      )}
                      {req.status !== 'activated' && (
                        <button
                          onClick={() => updatePremiumStatus(req.id, 'activated')}
                          className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-1 w-full"
                        >
                          <CheckCircle2 size={12} /> Activate Premium
                        </button>
                      )}
                      {req.status !== 'rejected' && (
                        <button
                          onClick={() => updatePremiumStatus(req.id, 'rejected')}
                          className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1 w-full"
                        >
                          <XCircle size={12} /> Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB: Mentor Applications ── */}
        {tab === 'mentor-reqs' && (
          <div className="space-y-4 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold">Mentor Feature Applications</h2>
                <p className="text-slate-500 text-xs mt-0.5">Mentors who submitted the "Get Featured" form requesting their Topmate to be listed.</p>
              </div>
              <span className="badge" style={{ background:'rgba(236,72,153,0.12)', color:'#f472b6', border:'1px solid rgba(236,72,153,0.25)' }}>
                {mentorReqs.length} total · {stats.pendingMentors} pending
              </span>
            </div>

            {mentorReqs.length === 0 ? (
              <div className="glass rounded-2xl p-10 text-center text-slate-500">No mentor applications yet.</div>
            ) : mentorReqs.map(req => (
              <div key={req.id} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {req.name?.[0] ?? '?'}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-semibold">{req.name}</span>
                        <StatusBadge status={req.status ?? 'pending'} map={MENTOR_STATUS} />
                      </div>
                    </div>

                    <p className="text-xs font-mono text-slate-400">{req.email} · {req.role} @ {req.company}</p>

                    <div className="flex flex-wrap gap-3 mt-2">
                      {req.topmate_url && (
                        <a href={req.topmate_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                          <ExternalLink size={10} /> Topmate
                        </a>
                      )}
                      {req.linkedin_url && (
                        <a href={req.linkedin_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                          <Linkedin size={10} /> LinkedIn
                        </a>
                      )}
                    </div>

                    {req.message && (
                      <p className="text-sm text-slate-300 mt-2 leading-relaxed border-l-2 border-pink-500/30 pl-3 italic">
                        "{req.message}"
                      </p>
                    )}
                    <p className="text-xs text-slate-600 mt-2 font-mono">
                      {req.created_at ? format(new Date(req.created_at), 'MMM d, yyyy · HH:mm') : '—'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0 min-w-[130px]">
                    {req.status !== 'contacted' && (
                      <button onClick={() => updateMentorStatus(req.id, 'contacted')} className="btn-ghost text-xs px-3 py-1.5 w-full">
                        Mark Contacted
                      </button>
                    )}
                    {req.status !== 'featured' && (
                      <button
                        onClick={() => updateMentorStatus(req.id, 'featured')}
                        className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-1 w-full"
                      >
                        <Star size={12} /> Feature Mentor
                      </button>
                    )}
                    {req.status !== 'rejected' && (
                      <button
                        onClick={() => updateMentorStatus(req.id, 'rejected')}
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1 w-full"
                      >
                        <XCircle size={12} /> Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB: Professionals ── */}
        {tab === 'professionals' && (
          <div className="space-y-4 fade-in">
            <div className="flex justify-end">
              <button onClick={() => setShowAddPro(v => !v)} className="btn-primary flex items-center gap-2 text-sm">
                <Plus size={14} /> Add Professional
              </button>
            </div>

            {showAddPro && (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">New Professional</h3>
                <form onSubmit={addProfessional} className="space-y-3">
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Name *</label>
                      <input value={proForm.name} onChange={e => setProForm(f => ({ ...f, name: e.target.value }))} className="input" placeholder="Priya Sharma" required />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Role *</label>
                      <input value={proForm.role} onChange={e => setProForm(f => ({ ...f, role: e.target.value }))} className="input" placeholder="SDE-2, Staff Eng…" required />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Company *</label>
                      <input value={proForm.company} onChange={e => setProForm(f => ({ ...f, company: e.target.value }))} className="input" placeholder="Amazon, Flipkart…" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Topmate URL</label>
                      <input value={proForm.topmate_url} onChange={e => setProForm(f => ({ ...f, topmate_url: e.target.value }))} className="input" placeholder="https://topmate.io/…" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">LinkedIn URL</label>
                      <input value={proForm.linkedin_url} onChange={e => setProForm(f => ({ ...f, linkedin_url: e.target.value }))} className="input" placeholder="https://linkedin.com/in/…" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Bio</label>
                    <textarea value={proForm.bio} onChange={e => setProForm(f => ({ ...f, bio: e.target.value }))} className="input" rows={2} placeholder="Brief bio…" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tags (comma-separated)</label>
                    <input value={proForm.tags} onChange={e => setProForm(f => ({ ...f, tags: e.target.value }))} className="input" placeholder="DSA, System Design, Career Guidance" />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button type="button" onClick={() => setShowAddPro(false)} className="btn-ghost text-sm">Cancel</button>
                    <button type="submit" disabled={savingPro} className="btn-primary text-sm flex items-center gap-2 disabled:opacity-60">
                      {savingPro && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                      Add
                    </button>
                  </div>
                </form>
              </div>
            )}

            {pros.length === 0 ? (
              <div className="glass rounded-2xl p-10 text-center text-slate-500">No professionals yet.</div>
            ) : pros.map(pro => (
              <div key={pro.id} className="glass rounded-2xl p-5 flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-white font-semibold">{pro.name}</span>
                    <span className={`badge text-xs ${pro.is_active ? 'status-done' : 'status-todo'}`}>
                      {pro.is_active ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">{pro.role} @ {pro.company}</p>
                  {pro.topmate_url && (
                    <a href={pro.topmate_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 mt-1">
                      <ExternalLink size={10} /> {pro.topmate_url}
                    </a>
                  )}
                  {pro.tags?.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {pro.tags.map(t => <span key={t} className="text-xs text-slate-500 bg-white/[0.04] px-2 py-0.5 rounded">#{t}</span>)}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => togglePro(pro.id, pro.is_active)} className="btn-ghost text-xs px-3 py-1.5">
                    {pro.is_active ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => deletePro(pro.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
