import { useState, useEffect, useRef, useCallback } from 'react';

const BUG_TYPES = [
  { name: 'NullPointerException', color: '#ff4444' },
  { name: 'undefined is not a function', color: '#ff8c00' },
  { name: 'segfault (core dumped)', color: '#ff0080' },
  { name: '404 Not Found', color: '#facc15' },
  { name: 'Stack Overflow', color: '#00ff88' },
  { name: 'Infinite Loop ∞', color: '#00f5ff' },
  { name: 'merge conflict', color: '#a855f7' },
  { name: 'TypeError: undefined', color: '#fb923c' },
  { name: 'CORS Error', color: '#f472b6' },
  { name: 'git push --force', color: '#ef4444' },
];

let _id = 0;

export default function BugSquash({ onGameOver }) {
  const [bugs, setBugs]           = useState([]);
  const [score, setScore]         = useState(0);
  const [lives, setLives]         = useState(3);
  const [started, setStarted]     = useState(false);
  const [over, setOver]           = useState(false);
  const scoreRef  = useRef(0);
  const livesRef  = useRef(3);
  const activeRef = useRef(false);

  const squash = useCallback((id) => {
    setBugs(prev => {
      if (!prev.find(b => b.id === id)) return prev;
      scoreRef.current += 1;
      setScore(scoreRef.current);
      return prev.filter(b => b.id !== id);
    });
  }, []);

  useEffect(() => {
    if (!started || over) return;
    activeRef.current = true;

    // Spawn
    let spawnTimer;
    const spawn = () => {
      if (!activeRef.current) return;
      setBugs(prev => [...prev, {
        id: ++_id,
        x: 4 + Math.random() * 72,
        y: -10,
        speed: 0.22 + Math.random() * 0.18 + Math.floor(scoreRef.current / 8) * 0.025,
        type: BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)],
      }]);
      spawnTimer = setTimeout(spawn, Math.max(550, 1500 - Math.floor(scoreRef.current / 5) * 90));
    };
    spawnTimer = setTimeout(spawn, 800);

    // Move
    const move = setInterval(() => {
      setBugs(prev => {
        let escaped = 0;
        const next = prev
          .map(b => ({ ...b, y: b.y + b.speed }))
          .filter(b => { if (b.y >= 95) { escaped++; return false; } return true; });
        if (escaped > 0) {
          livesRef.current = Math.max(0, livesRef.current - escaped);
          setLives(livesRef.current);
          if (livesRef.current <= 0) { activeRef.current = false; setOver(true); }
        }
        return next;
      });
    }, 48);

    return () => { activeRef.current = false; clearTimeout(spawnTimer); clearInterval(move); };
  }, [started, over]);

  useEffect(() => { if (over) onGameOver(scoreRef.current); }, [over]);

  if (!started) return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-6 text-center">
      <div style={{ fontSize: '3.5rem' }}>🐛</div>
      <h2 className="text-xl font-bold font-mono" style={{ color: '#00ff88' }}>BUG SQUASH</h2>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
        Bugs are crashing production. Click to squash them before they reach the bottom. Miss 3 — game over.
      </p>
      <button onClick={() => setStarted(true)} style={{ padding: '10px 32px', borderRadius: '10px', background: '#00ff88', color: '#000', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 0 24px #00ff8870' }}>
        START
      </button>
    </div>
  );

  if (over) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <div style={{ fontSize: '3rem' }}>💀</div>
      <p className="font-mono font-bold text-red-400 text-xl">GAME OVER</p>
      <div>
        <div className="font-extrabold font-mono text-5xl" style={{ color: '#00ff88' }}>{scoreRef.current}</div>
        <div className="text-slate-500 text-sm mt-1">bugs squashed</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 font-mono text-sm" style={{ borderBottom: '1px solid #00ff8825' }}>
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <span key={i} style={{ opacity: i < lives ? 1 : 0.15, fontSize: '1rem' }}>❤️</span>)}
        </div>
        <div style={{ color: '#00ff88' }} className="font-extrabold text-lg">{score} <span className="text-xs text-slate-600">bugs</span></div>
        <div className="text-xs text-slate-600">LVL {Math.floor(score / 8) + 1}</div>
      </div>

      {/* Arena */}
      <div className="relative flex-1 overflow-hidden select-none" style={{ background: 'linear-gradient(180deg, #010c04 0%, #000a03 100%)', backgroundImage: 'linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)', backgroundSize: '36px 36px' }}>
        {bugs.map(bug => (
          <div
            key={bug.id}
            onClick={() => squash(bug.id)}
            style={{
              position: 'absolute', left: `${bug.x}%`, top: `${bug.y}%`,
              padding: '4px 9px', borderRadius: '6px', cursor: 'pointer',
              fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
              color: bug.type.color, background: `${bug.type.color}12`,
              border: `1px solid ${bug.type.color}45`,
              boxShadow: `0 0 8px ${bug.type.color}35`,
              whiteSpace: 'nowrap', userSelect: 'none', maxWidth: '170px',
              overflow: 'hidden', textOverflow: 'ellipsis',
              transition: 'transform 0.08s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            🐛 {bug.type.name}
          </div>
        ))}
        {/* Danger line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,68,68,0.5)', boxShadow: '0 0 12px rgba(255,68,68,0.4)' }} />
      </div>
    </div>
  );
}
