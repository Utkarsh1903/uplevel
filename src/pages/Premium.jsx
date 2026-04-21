import { usePageTitle } from '../hooks/usePageTitle';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Sparkles, CheckCircle2, Send, Zap, Gift } from 'lucide-react';

const FEATURES_FREE = [
  'DSA Tracker — 120+ topics',
  'Career Roadmaps — Phase 1 of each track',
  '66+ in-app learning articles',
  'Grind Room & daily streaks',
  'LeetCode integration',
  'Community Leaderboard',
  'Curated Resources Vault',
  'Dashboard & analytics',
];

const FEATURES_PREMIUM = [
  'Everything in Free',
  'Full roadmaps — all phases unlocked',
  'Interview Prep Vault',
  'STAR Story Templates (10+)',
  'HLD Cheatsheets (10+ systems)',
  'Salary Negotiation Scripts',
  'System Design Roadmap',
  'Priority WhatsApp Support',
  'All future content — forever',
];

const OFFER_LIMIT = 100;

export default function Premium() {
  usePageTitle('Go Premium');
  const { user, profile, isPremium } = useAuth();
  const [form, setForm] = useState({
    name: profile?.name ?? '',
    contact: '',
    contact_type: 'whatsapp',
    message: '',
  });
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [requestCount, setRequestCount] = useState(null);

  useEffect(() => {
    supabase
      .from('premium_requests')
      .select('*', { count: 'exact', head: true })
      .then(({ count }) => setRequestCount(count ?? 0));
  }, []);

  const spotsLeft = requestCount !== null ? Math.max(0, OFFER_LIMIT - requestCount) : null;
  const offerActive = spotsLeft === null || spotsLeft > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) {
      toast.error('Name and contact are required');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('premium_requests').insert({
      user_id:      user.id,
      name:         form.name.trim(),
      contact:      form.contact.trim(),
      contact_type: form.contact_type,
      plan_period:  'lifetime',
      message:      form.message.trim() || null,
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
          You have full access to UpLevel — all roadmap phases, Interview Prep Vault, HLD Cheatsheets,
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
          {offerActive
            ? ' If you are within the first 100, your account will be upgraded for free.'
            : ' Once payment is confirmed, your account will be upgraded instantly.'}
        </p>
        <p className="text-slate-500 text-sm mt-4 font-mono">
          // no auto-renewals · no hidden charges · pay once, own forever
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">

      {/* Offer banner */}
      {offerActive && (
        <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(245,158,11,0.06))', border: '1px solid rgba(251,191,36,0.3)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.15)' }}>
            <Gift size={20} className="text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">
              First 100 users get lifetime Premium FREE
            </p>
            <p className="text-slate-400 text-xs mt-0.5">
              {spotsLeft !== null
                ? `${spotsLeft} of ${OFFER_LIMIT} spots remaining — request below and we will upgrade your account.`
                : 'Request below and we will check your eligibility.'}
            </p>
          </div>
          {spotsLeft !== null && (
            <div className="shrink-0 text-right">
              <div className="text-2xl font-extrabold text-amber-400">{spotsLeft}</div>
              <div className="text-xs text-slate-500">spots left</div>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <Sparkles size={14} />
          Premium — ₹499 · one-time · forever
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Unlock your full potential</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Less than the cost of a pizza. Pay once, own it forever. No subscriptions, no renewals, no surprise charges.
        </p>
      </div>

      {/* Pricing comparison */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-1">Free</h3>
          <p className="text-3xl font-extrabold text-white mb-4 font-mono">₹0</p>
          <ul className="space-y-2.5">
            {FEATURES_FREE.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6 relative overflow-hidden" style={{ border: '1px solid rgba(251,191,36,0.25)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(251,191,36,0.06), transparent 70%)' }} />
          <div className="flex items-center justify-between mb-1">
            <h3 className="gradient-text-gold font-bold text-lg">Premium</h3>
            <span className="badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
              {offerActive ? '🎁 FREE for first 100' : 'ONE-TIME'}
            </span>
          </div>
          <div className="mb-4">
            <p className="text-3xl font-extrabold text-white font-mono">
              {offerActive ? <span className="text-emerald-400">FREE</span> : '₹499'}
            </p>
            {offerActive
              ? <p className="text-slate-400 text-xs mt-1">for the first 100 users · <span className="line-through text-slate-500">₹499</span> after</p>
              : <p className="text-slate-500 text-sm font-normal">one-time · no renewals · forever</p>
            }
          </div>
          <ul className="space-y-2.5">
            {FEATURES_PREMIUM.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <Sparkles size={13} className="text-amber-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Value prop */}
      <div className="glass rounded-2xl p-5 flex items-start gap-4">
        <Zap size={20} className="text-indigo-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-white font-semibold text-sm">Why one-time?</p>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
            You are already grinding every day. The last thing you need is another monthly subscription draining your account.
            Pay ₹499 once and focus entirely on the work — no billing reminders, no "cancel before renewal" anxiety.
          </p>
        </div>
      </div>

      {/* Request form */}
      <div className="glass rounded-2xl p-6 max-w-xl mx-auto w-full">
        <h2 className="font-bold text-white text-lg mb-1">
          {offerActive ? 'Claim your free Premium access' : 'Request Premium Access'}
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          {offerActive
            ? 'Fill this out. We will verify your spot and upgrade your account within 24 hours — completely free.'
            : 'Fill this out. We will reach out within 24 hours. Once confirmed, your account is upgraded instantly.'}
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
            <label className="block text-xs text-slate-400 mb-1.5">Best way to reach you</label>
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
                : form.contact_type === 'email'   ? 'you@gmail.com'
                : 'linkedin.com/in/yourname'
              }
              value={form.contact}
              onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
              required
            />
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
              : <><Send size={15} /> {offerActive ? 'Claim Free Premium' : 'Send Request'}</>
            }
          </button>

          <p className="text-xs text-slate-500 text-center font-mono">
            // no automatic charges · we contact you first · upgrade is instant
          </p>
        </form>
      </div>
    </div>
  );
}
