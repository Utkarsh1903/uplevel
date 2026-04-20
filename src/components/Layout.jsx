import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import {
  LayoutDashboard, Code2, Map, BookOpen, Mic2,
  Sparkles, Settings, LogOut, Menu, X, Sun, Moon
} from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { to: '/dashboard',      icon: LayoutDashboard, label: 'Dashboard'      },
  { to: '/dsa',            icon: Code2,            label: 'DSA Tracker'   },
  { to: '/roadmaps',       icon: Map,              label: 'Roadmaps'      },
  { to: '/resources',      icon: BookOpen,          label: 'Resources'     },
  { to: '/interview-prep', icon: Mic2,             label: 'Interview Prep', premium: true },
];

export default function Layout() {
  const { profile, isPremium, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  const Sidebar = ({ onClose }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5" style={{ borderBottom: '1px solid var(--c-border)' }}>
        <Logo size={28} />
        <div>
          <span className="font-bold text-white text-base tracking-tight">UpLevel</span>
          <span className="code-tag block text-xs leading-none">v1.0</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto" style={{ color: 'var(--c-text-3)' }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label, premium }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={17} />
            <span>{label}</span>
            {premium && !isPremium && (
              <span className="ml-auto badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)', fontSize: '0.6rem' }}>PRO</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5" style={{ borderTop: '1px solid var(--c-border)', paddingTop: '0.75rem' }}>
        {!isPremium && (
          <NavLink to="/premium" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Sparkles size={17} className="text-amber-400" />
            <span>Go Premium</span>
          </NavLink>
        )}
        <NavLink to="/settings" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={17} />
          <span>Settings</span>
        </NavLink>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="nav-item w-full text-left"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark'
            ? <Sun size={17} className="text-amber-400" />
            : <Moon size={17} className="text-indigo-400" />
          }
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button onClick={handleSignOut} className="nav-item w-full text-left hover:text-red-400">
          <LogOut size={17} />
          <span>Sign out</span>
        </button>
      </div>

      {/* Profile chip */}
      <div className="mx-3 mb-4 p-3 glass rounded-xl flex items-center gap-3">
        {profile?.avatar_url
          ? <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30" />
          : <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">{profile?.name?.[0] ?? '?'}</div>
        }
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{profile?.name ?? 'User'}</p>
          <p className="text-xs truncate" style={{ color: 'var(--c-text-3)' }}>{isPremium ? '✨ Premium' : 'Free plan'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-mesh">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 glass sticky top-0 h-screen" style={{ borderRight: '1px solid var(--c-border)' }}>
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 glass flex flex-col" style={{ borderRight: '1px solid var(--c-border)' }}>
            <Sidebar onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 glass sticky top-0 z-40" style={{ borderBottom: '1px solid var(--c-border)' }}>
          <button onClick={() => setMobileOpen(true)} style={{ color: 'var(--c-text-2)' }}>
            <Menu size={20} />
          </button>
          <Logo size={22} />
          <span className="font-bold text-white">UpLevel</span>
          <button onClick={toggleTheme} className="ml-auto" style={{ color: 'var(--c-text-2)' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
