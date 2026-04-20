import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import { ArrowRight, TrendingUp, Users, Sun, Moon, CheckCircle2, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    emoji: '📊', color: '#10b981', label: 'DSA Tracker',
    desc: '120+ topics across 10 categories. Track every topic from Arrays to DP — click to mark as Learning or Done.',
    tag: 'free',
  },
  {
    emoji: '🗺️', color: '#6366f1', label: 'Career Roadmaps',
    desc: 'Phase-by-phase paths for SDE-2, Frontend, Backend and System Design. Know exactly what to do next.',
    tag: 'free',
  },
  {
    emoji: '📚', color: '#ec4899', label: 'Curated Resources',
    desc: 'The best of Striver, NeetCode, ByteByteGo and more. Handpicked — no noise, no outdated links.',
    tag: 'free',
  },
  {
    emoji: '🎯', color: '#f59e0b', label: 'Interview Prep Vault',
    desc: 'STAR story templates, HLD cheatsheets for 10+ systems, and salary negotiation scripts that actually work.',
    tag: 'premium',
  },
];

const STORIES = [
  { name: 'Priya S.',  from: 'TCS — ₹5.2 LPA',    to: 'Flipkart — ₹28 LPA',  time: '7 months', avatar: 'P', color: '#6366f1' },
  { name: 'Rohit M.',  from: 'Infosys — ₹4.8 LPA', to: 'Amazon — ₹32 LPA',   time: '5 months', avatar: 'R', color: '#10b981' },
  { name: 'Sneha K.',  from: 'Wipro — ₹6 LPA',     to: 'Swiggy — ₹22 LPA',   time: '6 months', avatar: 'S', color: '#ec4899' },
];

const TERMINAL_LINES = [
  { text: '$ uplevel --status', color: '#a5b4fc' },
  { text: '', color: '' },
  { text: '  user      : Utkarsh S.', color: '#94a3b8' },
  { text: '  target    : SDE-2 @ Amazon', color: '#94a3b8' },
  { text: '  streak    : 🔥 14 days', color: '#f97316' },
  { text: '', color: '' },
  { text: '  DSA Progress', color: '#e2e8f0' },
  { text: '  ├─ done       45 / 120  ████████░░░░  38%', color: '#10b981' },
  { text: '  ├─ learning   18        ████░░░░░░░░  15%', color: '#f59e0b' },
  { text: '  └─ todo       57        remaining', color: '#64748b' },
  { text: '', color: '' },
  { text: '  Roadmap: SDE-2 at Product Co.', color: '#e2e8f0' },
  { text: '  Phase 2 of 4 — Core DSA [██████░░] 75%', color: '#6366f1' },
  { text: '', color: '' },
  { text: '> Keep going. You are closer than you think._', color: '#34d399' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-mesh" style={{ color: 'var(--c-text-1)' }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <Logo size={30} />
          <div>
            <span className="font-bold text-white text-lg tracking-tight">UpLevel</span>
            <span className="code-tag block leading-none">for indian devs</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark'
              ? <Sun size={16} className="text-amber-400" />
              : <Moon size={16} className="text-indigo-400" />
            }
          </button>
          <button onClick={() => navigate('/auth')} className="btn-primary flex items-center gap-2">
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 fade-in">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6 font-mono" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>800+ engineers on the path · join them</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Escape the{' '}
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="gradient-text">
                service company
              </span>
              <br />trap. For good.
            </h1>

            <p className="text-lg mb-3" style={{ color: 'var(--c-text-2)', lineHeight: 1.7 }}>
              Thousands of CS grads are stuck at TCS, Infosys & Wipro —
              doing CRUD work for ₹5 LPA while watching others crack Amazon.
            </p>
            <p className="text-lg mb-8 font-mono text-sm" style={{ color: 'var(--c-text-3)' }}>
              UpLevel gives you the exact system they used.
              <span className="text-emerald-400"> No fluff. No 40hr courses.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => navigate('/auth')}
                className="btn-primary text-base px-7 py-3 flex items-center gap-2"
              >
                Start Free — Login with Google
                <ArrowRight size={16} />
              </button>
              <p className="text-xs font-mono" style={{ color: 'var(--c-text-3)' }}>
                $ no_card_required=true · free_forever=true
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm justify-center lg:justify-start" style={{ color: 'var(--c-text-3)' }}>
              <span className="flex items-center gap-1.5 font-mono"><Users size={13} className="text-indigo-400" /> 800+ engineers</span>
              <span className="flex items-center gap-1.5 font-mono"><TrendingUp size={13} className="text-emerald-400" /> 120+ DSA topics</span>
              <span className="flex items-center gap-1.5 font-mono"><Sparkles size={13} className="text-amber-400" /> ₹99/mo premium</span>
            </div>
          </div>

          {/* Right: Terminal mockup */}
          <div className="flex-1 w-full max-w-lg">
            <div className="terminal">
              <div className="terminal-bar">
                <div className="terminal-dot" style={{ background: '#ff5f57' }} />
                <div className="terminal-dot" style={{ background: '#febc2e' }} />
                <div className="terminal-dot" style={{ background: '#28c840' }} />
                <span className="ml-3 text-xs font-mono" style={{ color: '#64748b' }}>uplevel ~ dashboard</span>
              </div>
              <div className="terminal-body">
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i} style={{ color: line.color || 'transparent', minHeight: '1.2em' }}>
                    {line.text}
                    {i === TERMINAL_LINES.length - 1 && (
                      <span className="cursor-blink">█</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <p className="code-tag text-sm mb-2">// features</p>
          <h2 className="text-2xl font-bold text-white">Everything you need. Nothing you don't.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map(({ emoji, color, label, desc, tag }) => (
            <div key={label} className="glass glass-hover rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge font-mono" style={
                  tag === 'premium'
                    ? { background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }
                    : { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }
                }>
                  {tag === 'premium' ? '✦ premium' : '✓ free'}
                </span>
              </div>
              <div className="text-3xl mb-4">{emoji}</div>
              <h3 className="text-white font-semibold mb-2">{label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transformations */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <p className="code-tag text-sm mb-2">// success_stories[]</p>
          <h2 className="text-2xl font-bold text-white">Real transformations. Real numbers.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {STORIES.map(s => (
            <div key={s.name} className="glass glass-hover rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: s.color + '33', border: `1px solid ${s.color}40` }}>
                  {s.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{s.name}</p>
                  <p className="font-mono text-xs" style={{ color: 'var(--c-text-3)' }}>{s.time}</p>
                </div>
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#f87171' }}>- </span>
                  <span style={{ color: 'var(--c-text-2)' }}>{s.from}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#10b981' }}>+ </span>
                  <span className="font-semibold text-emerald-400">{s.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <p className="code-tag text-sm mb-2">// pricing.json</p>
          <h2 className="text-2xl font-bold text-white">Honest pricing for honest engineers</h2>
          <p className="text-sm mt-2" style={{ color: 'var(--c-text-3)' }}>You're saving for the grind. We kept it fair.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-6">
            <p className="font-mono text-xs text-emerald-400 mb-2">// plan: "free"</p>
            <h3 className="text-white font-bold text-xl mb-1">Free</h3>
            <p className="text-3xl font-extrabold text-white mb-5 font-mono">₹0 <span className="text-sm font-normal" style={{ color: 'var(--c-text-3)' }}>/forever</span></p>
            <ul className="space-y-2.5 text-sm mb-6">
              {['DSA Tracker — 120+ topics', 'Career Roadmaps (3 paths)', 'Free Resources Vault', 'Daily Log & Streaks', 'Dashboard & Analytics'].map(f => (
                <li key={f} className="flex items-center gap-2" style={{ color: 'var(--c-text-2)' }}>
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/auth')} className="btn-ghost w-full">Start Free</button>
          </div>

          <div className="glass rounded-2xl p-6 relative overflow-hidden" style={{ borderColor: 'rgba(251,191,36,0.25)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(251,191,36,0.06), transparent 70%)' }} />
            <p className="font-mono text-xs text-amber-400 mb-2">// plan: "premium"</p>
            <div className="flex items-center justify-between mb-1">
              <h3 className="gradient-text-gold font-bold text-xl">Premium</h3>
              <span className="badge font-mono" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>BEST VALUE</span>
            </div>
            <p className="text-3xl font-extrabold text-white mb-5 font-mono">₹99 <span className="text-sm font-normal" style={{ color: 'var(--c-text-3)' }}>/month</span></p>
            <ul className="space-y-2.5 text-sm mb-6">
              {['Everything in Free', 'Interview Prep Vault', 'HLD Cheatsheets (10+ systems)', 'STAR Story Templates', 'Salary Negotiation Scripts', 'System Design Roadmap', 'WhatsApp Support'].map(f => (
                <li key={f} className="flex items-center gap-2" style={{ color: 'var(--c-text-2)' }}>
                  <Sparkles size={13} className="text-amber-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/auth')} className="btn-primary w-full">Unlock Premium</button>
            <p className="text-xs text-center mt-2 font-mono" style={{ color: 'var(--c-text-3)' }}>pay_via=UPI · auto_renew=false</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-10 text-center glow-indigo">
          <p className="code-tag text-sm mb-4">// the_truth.txt</p>
          <h2 className="text-3xl font-extrabold text-white mb-3">Stop waiting for the right time.</h2>
          <p className="mb-8 leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
            6 months from now, you could be at Amazon, Flipkart, or Swiggy — or still<br />
            in the same seat at the same service company. The difference is starting today.
          </p>
          <button onClick={() => navigate('/auth')} className="btn-primary text-base px-8 py-3 flex items-center gap-2 mx-auto">
            Start Free with Google <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-xs font-mono" style={{ borderColor: 'var(--c-border)', color: 'var(--c-text-3)' }}>
        <div className="max-w-4xl mx-auto px-6 space-y-2">
          <p className="text-white font-semibold text-sm flex items-center justify-center gap-2">
            <Logo size={18} />
            UpLevel
          </p>
          <p>Built with ❤️ for Indian engineers who deserve better.</p>
          <p>
            Developed by{' '}
            <a
              href="https://linkedin.com/in/utkarshsrivastava"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Utkarsh Srivastava
            </a>
          </p>
          <p style={{ color: 'var(--c-text-3)', opacity: 0.5 }}>© 2025 UpLevel · Zero infra cost · 100% honest</p>
        </div>
      </footer>
    </div>
  );
}
