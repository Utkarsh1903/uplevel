import { usePageTitle } from '../hooks/usePageTitle';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { syncLeetCode } from '../lib/leetcode';
import toast from 'react-hot-toast';
import { Save, LogOut, RefreshCw, Trophy, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ROLES = [
  'Junior Developer', 'Software Engineer', 'SDE-1', 'SDE-2', 'Senior Engineer',
  'Tech Lead', 'Engineering Manager',
];

const TARGET_ROLES = [
  'SDE-1 at Product Company', 'SDE-2 at Product Company', 'Senior SDE at FAANG',
  'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer',
  'Data Engineer', 'DevOps / Platform Engineer',
];

export default function Settings() {
  usePageTitle('Settings');
  const { user, profile, isPremium, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:        profile?.name        ?? '',
    curr_role:   profile?.curr_role   ?? 'Junior Developer',
    target_role: profile?.target_role ?? 'SDE-2 at Product Company',
    company:     profile?.company     ?? '',
    yoe:         profile?.yoe         ?? 0,
  });
  const [saving, setSaving]         = useState(false);
  const [lcUsername, setLcUsername] = useState(profile?.leetcode_username ?? '');
  const [syncing, setSyncing]       = useState(false);
  const [lcStats, setLcStats]       = useState(
    profile?.leetcode_easy != null
      ? { easy: profile.leetcode_easy, medium: profile.leetcode_medium, hard: profile.leetcode_hard, rating: profile.leetcode_rating }
      : null
  );
  const [optIn, setOptIn] = useState(profile?.leaderboard_opt_in ?? false);
  const [savingOptIn, setSavingOptIn] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      name:        form.name.trim()    || null,
      curr_role:   form.curr_role,
      target_role: form.target_role,
      company:     form.company.trim() || null,
      yoe:         parseInt(form.yoe)  || 0,
    }).eq('id', user.id);
    if (error) toast.error('Failed to save');
    else { toast.success('Profile saved!'); await refreshProfile(); }
    setSaving(false);
  }

  async function handleSyncLC() {
    if (!lcUsername.trim()) { toast.error('Enter your LeetCode username first'); return; }
    setSyncing(true);
    try {
      const stats = await syncLeetCode(user.id, lcUsername.trim());
      setLcStats(stats);
      await refreshProfile();
      toast.success('LeetCode stats synced!');
    } catch (err) {
      toast.error(err.message ?? 'Sync failed');
    }
    setSyncing(false);
  }

  async function handleOptInToggle() {
    const next = !optIn;
    setSavingOptIn(true);
    const { error } = await supabase.from('profiles')
      .update({ leaderboard_opt_in: next })
      .eq('id', user.id);
    if (error) { toast.error('Failed to update'); }
    else { setOptIn(next); await refreshProfile(); toast.success(next ? 'You\'re on the leaderboard!' : 'Removed from leaderboard'); }
    setSavingOptIn(false);
  }

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  const lcTotal = (lcStats?.easy ?? 0) + (lcStats?.medium ?? 0) + (lcStats?.hard ?? 0);

  return (
    <div className="max-w-xl mx-auto space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your profile and account preferences.</p>
      </div>

      {/* Profile card */}
      <div className="glass rounded-2xl p-5 flex items-center gap-4">
        {profile?.avatar_url
          ? <img src={profile.avatar_url} alt="" className="w-14 h-14 rounded-2xl object-cover" />
          : <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">{profile?.name?.[0] ?? '?'}</div>
        }
        <div>
          <p className="text-white font-semibold">{profile?.name}</p>
          <p className="text-slate-400 text-sm">{user?.email}</p>
          <p className="text-xs mt-1">{isPremium
            ? <span className="text-amber-400 font-semibold">✨ Premium member</span>
            : <span className="text-slate-500">Free plan · <a href="/premium" className="text-indigo-400 hover:underline">Upgrade — ₹499 one-time</a></span>
          }</p>
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSave} className="glass rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-white mb-2">Your Profile</h2>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Display name</label>
          <input
            type="text" className="input"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Current role</label>
            <select className="input" value={form.curr_role} onChange={e => setForm(f => ({ ...f, curr_role: e.target.value }))}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Years of experience</label>
            <input
              type="number" min="0" max="30" className="input"
              value={form.yoe}
              onChange={e => setForm(f => ({ ...f, yoe: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Current company</label>
          <input
            type="text" className="input"
            value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="TCS, Infosys, Wipro…"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Target role</label>
          <select className="input" value={form.target_role} onChange={e => setForm(f => ({ ...f, target_role: e.target.value }))}>
            {TARGET_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>

      {/* LeetCode integration */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Code2 size={16} className="text-amber-400" />
          <h2 className="font-semibold text-white">LeetCode Integration</h2>
        </div>
        <p className="text-slate-400 text-xs">Connect your public LeetCode profile to show your solve stats on the leaderboard.</p>

        <div className="flex gap-2">
          <input
            type="text"
            className="input flex-1"
            placeholder="your-leetcode-username"
            value={lcUsername}
            onChange={e => setLcUsername(e.target.value)}
          />
          <button
            onClick={handleSyncLC}
            disabled={syncing}
            className="btn-primary flex items-center gap-2 shrink-0 disabled:opacity-60"
          >
            {syncing
              ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <RefreshCw size={14} />
            }
            {syncing ? 'Syncing…' : 'Sync'}
          </button>
        </div>

        {lcStats && (
          <div className="grid grid-cols-4 gap-2 pt-1">
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-lg font-extrabold text-white">{lcTotal}</div>
              <div className="text-xs text-slate-500 mt-0.5">Total</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-lg font-extrabold" style={{ color: '#4ade80' }}>{lcStats.easy}</div>
              <div className="text-xs text-slate-500 mt-0.5">Easy</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-lg font-extrabold" style={{ color: '#fb923c' }}>{lcStats.medium}</div>
              <div className="text-xs text-slate-500 mt-0.5">Medium</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="text-lg font-extrabold" style={{ color: '#f87171' }}>{lcStats.hard}</div>
              <div className="text-xs text-slate-500 mt-0.5">Hard</div>
            </div>
          </div>
        )}
        {lcStats && (
          <p className="text-xs text-slate-600 font-mono">
            // synced from leetcode.com/{lcUsername} · contest rating: {lcStats.rating || 'N/A'}
          </p>
        )}
      </div>

      {/* Leaderboard opt-in */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Trophy size={18} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="font-semibold text-white">Show me on the Leaderboard</h2>
              <p className="text-slate-400 text-xs mt-0.5">Let others see your rank. Only your name, avatar, and score are visible.</p>
            </div>
          </div>
          <button
            onClick={handleOptInToggle}
            disabled={savingOptIn}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 disabled:opacity-60 ${
              optIn ? 'bg-indigo-500' : 'bg-white/10'
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              optIn ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="glass rounded-2xl p-5 border border-red-500/15">
        <h2 className="font-semibold text-white mb-3">Account</h2>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut size={15} /> Sign out of UpLevel
        </button>
      </div>
    </div>
  );
}
