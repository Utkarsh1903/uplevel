import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Send, CheckCircle2, Sun, Moon, Sparkles, Users, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const PERKS = [
  { icon: '👁️', text: 'Your profile featured to 800+ engineers actively job hunting' },
  { icon: '📅', text: 'Direct booking links to your Topmate / Calendly' },
  { icon: '🚀', text: 'Reach engineers at the exact moment they need a mentor' },
  { icon: '💬', text: 'We promote new mentors across our community channels' },
];

export default function FeaturedForm() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', role: '', company: '',
    topmate_url: '', linkedin_url: '', message: '',
  });

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.role || !form.company) {
      toast.error('Please fill all required fields');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('feature_requests').insert({
      name:         form.name,
      email:        form.email,
      role:         form.role,
      company:      form.company,
      topmate_url:  form.topmate_url || null,
      linkedin_url: form.linkedin_url || null,
      message:      form.message || null,
    });
    setSaving(false);
    if (error) { toast.error('Submission failed. Try again.'); return; }
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-mesh" style={{ color: 'var(--c-text-1)' }}>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Logo size={26} />
          <span className="font-bold text-white">UpLevel</span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
          </button>
          <button onClick={() => navigate(-1)} className="btn-ghost flex items-center gap-1.5 text-sm">
            <ArrowLeft size={14} /> Back
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {submitted ? (
          /* ── Success state ── */
          <div className="max-w-lg mx-auto text-center fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-3">Application Submitted!</h1>
            <p className="text-slate-400 mb-2">
              We've received your details. Our team will review your profile and reach out to <span className="text-white font-medium">{form.email}</span> within 48 hours.
            </p>
            <p className="text-slate-500 text-sm mb-8 font-mono">
              // next_step: we'll send payment link (₹499) after review
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/')} className="btn-ghost">Back to Home</button>
              <button onClick={() => navigate('/professionals')} className="btn-primary">View Mentors</button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* ── Left: Info ── */}
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-amber-400 text-xs font-medium mb-6 font-mono" style={{ borderColor: 'rgba(251,191,36,0.2)' }}>
                <Sparkles size={12} />
                <span>Get Featured · ₹499 / one-time</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Mentor the next<br />
                <span className="gradient-text">generation of engineers</span>
              </h1>

              <p className="text-slate-400 leading-relaxed mb-8">
                UpLevel is used by 800+ engineers actively making the switch from service companies to top product firms.
                Get your profile in front of people who genuinely need mentorship right now.
              </p>

              <div className="space-y-3 mb-8">
                {PERKS.map(p => (
                  <div key={p.text} className="flex items-start gap-3 text-sm">
                    <span className="text-lg shrink-0">{p.icon}</span>
                    <span className="text-slate-300">{p.text}</span>
                  </div>
                ))}
              </div>

              {/* Pricing callout */}
              <div className="glass rounded-2xl p-5 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={15} className="text-amber-400" />
                  <span className="text-white font-semibold">One-time listing fee</span>
                </div>
                <p className="text-3xl font-extrabold gradient-text-gold mb-1">₹499</p>
                <p className="text-slate-400 text-sm">Lifetime listing. No recurring charges. We reach out with payment link after reviewing your profile.</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6 text-sm font-mono" style={{ color: 'var(--c-text-3)' }}>
                <span className="flex items-center gap-1.5"><Users size={13} className="text-indigo-400" /> 800+ engineers</span>
                <span className="flex items-center gap-1.5"><TrendingUp size={13} className="text-emerald-400" /> Growing daily</span>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="glass rounded-2xl p-6 fade-in">
              <p className="code-tag text-sm mb-4">// apply_to_get_featured</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Priya Sharma" className="input" required />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="priya@company.com" className="input" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Current Role <span className="text-red-400">*</span></label>
                    <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="SDE-2, Staff Engineer…" className="input" required />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Company <span className="text-red-400">*</span></label>
                    <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Amazon, Flipkart…" className="input" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Topmate Profile URL</label>
                  <input value={form.topmate_url} onChange={e => set('topmate_url', e.target.value)} placeholder="https://topmate.io/yourname" className="input" />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">LinkedIn Profile URL</label>
                  <input value={form.linkedin_url} onChange={e => set('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/yourname" className="input" />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Why do you want to mentor? (optional)</label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="What topics you'd cover, your experience helping others, etc."
                    className="input"
                    rows={3}
                  />
                </div>

                <button type="submit" disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <Send size={14} />
                  }
                  {saving ? 'Submitting…' : 'Submit Application'}
                </button>

                <p className="text-xs text-center font-mono" style={{ color: 'var(--c-text-3)' }}>
                  // We review every application within 48hrs
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
