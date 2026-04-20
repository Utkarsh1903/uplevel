import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Sparkles, CheckCircle2, Send } from 'lucide-react';

const FEATURES_FREE = [
  'DSA Tracker — 120+ topics',
  'Career Roadmaps (3 paths)',
  'Curated Free Resources',
  'Daily Progress Log',
  'Dashboard & Streaks',
];

const FEATURES_PREMIUM = [
  'Everything in Free',
  'Interview Prep Vault',
  'STAR Story Templates (10+)',
  'HLD Cheatsheets (10+ systems)',
  'Salary Negotiation Scripts',
  'System Design Roadmap',
  'Priority WhatsApp Support',
  'New content every month',
];

export default function Premium() {
  const { user, profile, isPremium } = useAuth();
  const [form, setForm] = useState({
    name: profile?.name ?? '',
    contact: '',
    contact_type: 'whatsapp',
    plan_period: 'monthly',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) {
      toast.error('Name and contact are required');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('premium_requests').insert({
      user_id: user.id,
      name: form.name.trim(),
      contact: form.contact.trim(),
      contact_type: form.contact_type,
      plan_period: form.plan_period,
      message: form.message.trim() || null,
    });
    if (error) {
      if (error.code === '23505') toast.error('You already have a pending request. We will reach out shortly!');
      else toast.error('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  }

  if (isPremium) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 fade-in">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 glow-indigo">
          <Sparkles size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-3">You are Premium! ✨</h1>
        <p className="text-slate-400 leading-relaxed">
          You have full access to UpLevel Premium including Interview Prep Vault, HLD Cheatsheets,
          STAR templates and more. Thank you for supporting UpLevel!
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 fade-in">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-3">Request Received!</h1>
        <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">
          We will reach out to you within 24 hours on {form.contact_type === 'whatsapp' ? 'WhatsApp' : 'the contact you provided'}.
          Once payment is confirmed, your account will be upgraded instantly.
        </p>
        <p className="text-slate-500 text-sm mt-4">
          Pay via UPI/GPay/PhonePe. No auto-renewals. Cancel anytime.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <Sparkles size={14} />
          Premium — ₹99/month
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Unlock your full potential</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Less than the cost of a pizza. More value than any ₹5000 course. We know because we have been where you are.
        </p>
      </div>

      {/* Pricing comparison */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-1">Free</h3>
          <p className="text-3xl font-extrabold text-white mb-4">₹0</p>
          <ul className="space-y-2.5">
            {FEATURES_FREE.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6 border border-amber-500/25">
          <div className="flex items-center justify-between mb-1">
            <h3 className="gradient-text-gold font-bold text-lg">Premium</h3>
            <span className="badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>BEST VALUE</span>
          </div>
          <p className="text-3xl font-extrabold text-white mb-4">₹99 <span className="text-slate-500 text-sm font-normal">/month</span></p>
          <ul className="space-y-2.5">
            {FEATURES_PREMIUM.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <Sparkles size={13} className="text-amber-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Request form */}
      <div className="glass rounded-2xl p-6 max-w-xl mx-auto w-full">
        <h2 className="font-bold text-white text-lg mb-1">Request Premium Access</h2>
        <p className="text-slate-400 text-sm mb-6">
          Fill this out. We will reach out to you within 24 hours with payment details.
          Once paid, your account is upgraded — instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Your name</label>
            <input
              type="text"
              className="input"
              placeholder="Rahul Kumar"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Contact preference</label>
            <div className="flex gap-2 mb-2">
              {[['whatsapp', '📱 WhatsApp'], ['email', '📧 Email'], ['linkedin', '💼 LinkedIn']].map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, contact_type: val }))}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                    form.contact_type === val
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="input"
              placeholder={
                form.contact_type === 'whatsapp' ? '+91 9876543210'
                : form.contact_type === 'email' ? 'you@gmail.com'
                : 'linkedin.com/in/yourname'
              }
              value={form.contact}
              onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Plan period</label>
            <select
              className="input"
              value={form.plan_period}
              onChange={e => setForm(f => ({ ...f, plan_period: e.target.value }))}
            >
              <option value="monthly">Monthly — ₹99/month</option>
              <option value="quarterly">Quarterly — ₹249 (save ₹48)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Anything to add? (optional)</label>
            <textarea
              className="input"
              placeholder="Current company, target company, or questions…"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              rows={3}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {loading
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
              : <><Send size={15} /> Send Request</>
            }
          </button>

          <p className="text-xs text-slate-500 text-center">
            No automatic charges. We contact you → you pay → we upgrade your account.
          </p>
        </form>
      </div>
    </div>
  );
}
