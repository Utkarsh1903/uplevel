import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Save, LogOut } from 'lucide-react';
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
  const { user, profile, isPremium, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:         profile?.name         ?? '',
    curr_role: profile?.curr_role ?? 'Junior Developer',
    target_role:  profile?.target_role  ?? 'SDE-2 at Product Company',
    company:      profile?.company      ?? '',
    yoe:          profile?.yoe          ?? 0,
  });
  const [saving, setSaving] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      name:         form.name.trim()         || null,
      curr_role: form.curr_role,
      target_role:  form.target_role,
      company:      form.company.trim()      || null,
      yoe:          parseInt(form.yoe)       || 0,
    }).eq('id', user.id);

    if (error) toast.error('Failed to save');
    else { toast.success('Profile saved!'); await refreshProfile(); }
    setSaving(false);
  }

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

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
            : <span className="text-slate-500">Free plan · <a href="/premium" className="text-indigo-400 hover:underline">Upgrade</a></span>
          }</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="glass rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-white mb-2">Your Profile</h2>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Display name</label>
          <input
            type="text"
            className="input"
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
              type="number"
              min="0"
              max="30"
              className="input"
              value={form.yoe}
              onChange={e => setForm(f => ({ ...f, yoe: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Current company</label>
          <input
            type="text"
            className="input"
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
