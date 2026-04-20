import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import { ExternalLink, Linkedin, Calendar, Sparkles, ArrowRight, Sun, Moon, Users } from 'lucide-react';

// Fallback data if table isn't set up yet
const FALLBACK_PROFESSIONALS = [
  {
    id: 'utkarsh-srivastava',
    name: 'Utkarsh Srivastava',
    role: 'SDE-3',
    company: 'CWAN',
    topmate_url: 'https://topmate.io/utkarsh_srivastava101/',
    linkedin_url: null,
    avatar_url: null,
    bio: 'SDE-3 at CWAN helping engineers crack product company interviews. Expertise in DSA, System Design, and career transitions from service to product companies. Mentored 50+ engineers in their switch to top product firms.',
    tags: ['DSA', 'System Design', 'Career Guidance', 'Interview Prep'],
    sessions_count: 50,
    is_active: true,
  },
];

const TAG_COLORS = {
  'DSA':            { bg: 'rgba(99,102,241,0.12)',  color: '#a5b4fc',  border: 'rgba(99,102,241,0.25)'  },
  'System Design':  { bg: 'rgba(16,185,129,0.12)',  color: '#34d399',  border: 'rgba(16,185,129,0.25)'  },
  'Career Guidance':{ bg: 'rgba(245,158,11,0.12)',  color: '#fbbf24',  border: 'rgba(245,158,11,0.25)'  },
  'Interview Prep': { bg: 'rgba(236,72,153,0.12)',  color: '#f472b6',  border: 'rgba(236,72,153,0.25)'  },
  'Java':           { bg: 'rgba(239,68,68,0.12)',   color: '#fca5a5',  border: 'rgba(239,68,68,0.25)'   },
  'Python':         { bg: 'rgba(234,179,8,0.12)',   color: '#fde047',  border: 'rgba(234,179,8,0.25)'   },
  'React':          { bg: 'rgba(6,182,212,0.12)',   color: '#67e8f9',  border: 'rgba(6,182,212,0.25)'   },
};

function getTagStyle(tag) {
  return TAG_COLORS[tag] ?? { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8', border: 'rgba(100,116,139,0.2)' };
}

function avatarGradient(name) {
  const colors = [
    ['#6366f1', '#8b5cf6'], ['#10b981', '#059669'], ['#ec4899', '#db2777'],
    ['#f59e0b', '#d97706'], ['#3b82f6', '#2563eb'], ['#ef4444', '#dc2626'],
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return `linear-gradient(135deg, ${colors[idx][0]}, ${colors[idx][1]})`;
}

function ProfessionalCard({ pro }) {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group glass-hover">
      {/* Subtle gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #6366f1, #10b981)' }} />

      {/* Avatar + basic info */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-lg"
          style={{ background: pro.avatar_url ? undefined : avatarGradient(pro.name) }}
        >
          {pro.avatar_url
            ? <img src={pro.avatar_url} alt={pro.name} className="w-14 h-14 rounded-xl object-cover" />
            : pro.name.split(' ').map(w => w[0]).join('').slice(0, 2)
          }
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-white text-base leading-tight">{pro.name}</h3>
          <p className="text-sm font-mono mt-0.5" style={{ color: 'var(--c-text-2)' }}>
            {pro.role} <span className="text-indigo-400">@</span> {pro.company}
          </p>
          {pro.sessions_count > 0 && (
            <p className="text-xs font-mono mt-1" style={{ color: 'var(--c-text-3)' }}>
              <span className="text-emerald-400">✓</span> {pro.sessions_count}+ sessions
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--c-text-2)' }}>
        {pro.bio}
      </p>

      {/* Tags */}
      {pro.tags && pro.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pro.tags.map(tag => {
            const style = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        {pro.topmate_url && (
          <a
            href={pro.topmate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-1.5 text-xs flex-1 justify-center"
          >
            <Calendar size={13} />
            Book a Session
          </a>
        )}
        {pro.linkedin_url && (
          <a
            href={pro.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={15} style={{ color: '#60a5fa' }} />
          </a>
        )}
        {pro.topmate_url && (
          <a
            href={pro.topmate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            title="View Profile"
          >
            <ExternalLink size={15} style={{ color: 'var(--c-text-3)' }} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Professionals() {
  const navigate  = useNavigate();
  const { user }  = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [pros, setPros]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('professionals')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error || !data || data.length === 0) {
        setPros(FALLBACK_PROFESSIONALS);
      } else {
        setPros(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-mesh" style={{ color: 'var(--c-text-1)' }}>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <button onClick={() => navigate(user ? '/dashboard' : '/')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Logo size={26} />
          <span className="font-bold text-white">UpLevel</span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
          </button>
          {user
            ? <button onClick={() => navigate('/dashboard')} className="btn-ghost text-sm">Dashboard</button>
            : <button onClick={() => navigate('/auth')} className="btn-primary flex items-center gap-1.5 text-sm">Get Started <ArrowRight size={13} /></button>
          }
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-indigo-400 text-xs font-medium mb-4 font-mono">
            <Users size={12} />
            <span>Real engineers · Verified experience</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Connect with <span className="gradient-text">Senior Engineers</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Get 1-on-1 guidance from engineers who've already made the leap — from service to top product companies.
            Book a session, get unstuck, and accelerate your journey.
          </p>
        </div>

        {/* Professionals grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 fade-in">
            {pros.map(pro => <ProfessionalCard key={pro.id} pro={pro} />)}
          </div>
        )}

        {/* Get Featured CTA */}
        <div className="glass rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto glow-indigo fade-in">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }}>
            <Sparkles size={22} className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Are you a senior engineer?</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Get your profile featured and connect with 800+ engineers who are actively looking for mentors.
            One-time listing fee of ₹499. We review every application.
          </p>
          <button
            onClick={() => navigate('/get-featured')}
            className="btn-primary flex items-center gap-2 mx-auto text-base px-7 py-3"
          >
            Apply to Get Featured <ArrowRight size={15} />
          </button>
          <p className="text-xs font-mono mt-3" style={{ color: 'var(--c-text-3)' }}>
            // fee: ₹499 one-time · review_time: 48hrs · listing: lifetime
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs font-mono mt-8" style={{ borderColor: 'var(--c-border)', color: 'var(--c-text-3)' }}>
        <div className="flex items-center justify-center gap-2">
          <Logo size={14} />
          <span>UpLevel · Built for Indian engineers</span>
        </div>
      </footer>
    </div>
  );
}
