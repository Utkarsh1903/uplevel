import { useState, useEffect } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import BugSquash     from '../components/games/BugSquash';
import CodeTyper     from '../components/games/CodeTyper';
import FixTheBug     from '../components/games/FixTheBug';
import BinaryClicker from '../components/games/BinaryClicker';

const GAMES = [
  {
    id: 'bug-squash',
    label: 'Bug Squash',
    emoji: '🐛',
    color: '#00ff88',
    desc: 'Bugs are crashing production. Click to squash them before they reach the bottom. Miss 3 — game over.',
    scoreLabel: 'bugs squashed',
    component: BugSquash,
  },
  {
    id: 'code-typer',
    label: 'Code Typer',
    emoji: '⌨️',
    color: '#00f5ff',
    desc: 'A real code snippet appears. Type it as fast as you can in 60 seconds. Score is your WPM.',
    scoreLabel: 'WPM',
    component: CodeTyper,
  },
  {
    id: 'fix-the-bug',
    label: 'Fix the Bug',
    emoji: '🔍',
    color: '#ff6b35',
    desc: '10 buggy code snippets. Spot the broken line in 20 seconds. Faster = more points.',
    scoreLabel: 'points',
    component: FixTheBug,
  },
  {
    id: 'binary-clicker',
    label: 'Binary Clicker',
    emoji: '💻',
    color: '#a855f7',
    desc: 'Click to ship code. Buy upgrades. Ship the most lines of code in 60 seconds.',
    scoreLabel: 'lines shipped',
    component: BinaryClicker,
  },
];

export default function GameZone() {
  usePageTitle('Game Zone');
  const { user, profile } = useAuth();
  const [highScores, setHighScores] = useState({});
  const [activeGame, setActiveGame] = useState(null);
  const [result, setResult]         = useState(null);

  useEffect(() => { loadScores(); }, []);

  async function loadScores() {
    const { data } = await supabase.from('game_highscores').select('*');
    if (data) {
      const map = {};
      data.forEach(r => { map[r.game_id] = r; });
      setHighScores(map);
    }
  }

  async function handleGameOver(score) {
    const game  = activeGame;
    const final = Math.floor(score);
    setActiveGame(null);

    const current = highScores[game.id]?.score ?? 0;
    let isNewRecord = false;

    if (final > current) {
      const { error } = await supabase.from('game_highscores').upsert({
        game_id:     game.id,
        score:       final,
        user_name:   profile?.name || 'Anonymous',
        user_avatar: profile?.avatar_url || null,
        updated_at:  new Date().toISOString(),
      }, { onConflict: 'game_id' });
      if (!error) { isNewRecord = true; toast.success('New world record! 🎉'); }
    }

    setResult({ game, score: final, isNewRecord, prev: current });
    loadScores();
  }

  const GameComponent = activeGame?.component;

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">

      {/* Header */}
      <div>
        <h1
          className="text-2xl font-extrabold font-mono"
          style={{ background: 'linear-gradient(90deg, #00f5ff, #a855f7, #00ff88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          GAME ZONE
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-mono">// take a break · play a game · come back sharper</p>
      </div>

      {/* 4 game cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {GAMES.map(game => {
          const hs = highScores[game.id];
          return (
            <div
              key={game.id}
              className="relative rounded-2xl overflow-hidden"
              style={{ background: '#07070e', border: `1px solid ${game.color}28`, boxShadow: `0 0 40px ${game.color}0a` }}
            >
              {/* top line glow */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${game.color}70, transparent)` }} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  {/* Icon */}
                  <div style={{ width: 50, height: 50, borderRadius: '13px', background: `${game.color}12`, border: `1px solid ${game.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.65rem', boxShadow: `0 0 18px ${game.color}18` }}>
                    <span className="emoji">{game.emoji}</span>
                  </div>
                  {/* World record */}
                  {hs && hs.score > 0 && (
                    <div className="text-right">
                      <div className="text-xs font-mono text-slate-600">world record</div>
                      <div className="font-extrabold font-mono text-xl" style={{ color: game.color }}>{hs.score.toLocaleString()}</div>
                      <div className="text-xs text-slate-600 font-mono truncate max-w-[110px]">{hs.user_name}</div>
                    </div>
                  )}
                </div>

                <h3 className="text-white font-bold font-mono mb-1">{game.label}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">{game.desc}</p>

                {hs && hs.score > 0 && (
                  <div className="flex items-center gap-1.5 mb-4 text-xs font-mono">
                    <span>🏆</span>
                    <span style={{ color: game.color }}>{hs.score.toLocaleString()}</span>
                    <span className="text-slate-600">{game.scoreLabel} · {hs.user_name}</span>
                  </div>
                )}

                <button
                  onClick={() => { setResult(null); setActiveGame(game); }}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', background: `${game.color}12`, border: `1px solid ${game.color}40`, color: game.color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${game.color}22`; e.currentTarget.style.boxShadow = `0 0 18px ${game.color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${game.color}12`; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  ▶ PLAY
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Active game modal ── */}
      {activeGame && GameComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(10px)' }}>
          <div
            className="w-full flex flex-col overflow-hidden rounded-2xl"
            style={{ maxWidth: '640px', height: 'min(580px, 92vh)', background: '#050510', border: `1px solid ${activeGame.color}28`, boxShadow: `0 0 80px ${activeGame.color}18` }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${activeGame.color}18` }}>
              <span className="font-bold font-mono text-sm" style={{ color: activeGame.color }}>
                <span className="emoji">{activeGame.emoji}</span> {activeGame.label}
              </span>
              <button
                onClick={() => setActiveGame(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                style={{ color: '#475569' }}
              >
                <X size={15} />
              </button>
            </div>
            {/* Game */}
            <div className="flex-1 overflow-hidden">
              <GameComponent onGameOver={handleGameOver} />
            </div>
          </div>
        </div>
      )}

      {/* ── Result modal ── */}
      {result && !activeGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}>
          <div
            className="rounded-2xl p-8 text-center w-full max-w-sm"
            style={{ background: '#07070f', border: `1px solid ${result.game.color}35`, boxShadow: `0 0 60px ${result.game.color}18` }}
          >
            <div style={{ fontSize: '3rem' }} className="mb-3">{result.isNewRecord ? '🏆' : result.game.emoji}</div>

            {result.isNewRecord && (
              <div className="inline-block text-xs font-mono mb-3 px-3 py-1 rounded-full" style={{ background: `${result.game.color}18`, color: result.game.color, border: `1px solid ${result.game.color}35` }}>
                🎉 NEW WORLD RECORD
              </div>
            )}

            <h3 className="text-white font-bold text-xl font-mono mb-4">
              {result.isNewRecord ? 'WORLD RECORD!' : 'GAME OVER'}
            </h3>

            <div className="font-extrabold font-mono text-5xl mb-1" style={{ color: result.game.color }}>
              {result.score.toLocaleString()}
            </div>
            <div className="text-slate-500 text-sm mb-2">{result.game.scoreLabel}</div>

            {!result.isNewRecord && result.prev > 0 && (
              <div className="text-xs font-mono text-slate-600 mb-6">
                world record: {result.prev.toLocaleString()}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setResult(null); setActiveGame(result.game); }}
                style={{ flex: 1, padding: '10px', borderRadius: '10px', background: `${result.game.color}18`, border: `1px solid ${result.game.color}45`, color: result.game.color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                PLAY AGAIN
              </button>
              <button
                onClick={() => setResult(null)}
                style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
