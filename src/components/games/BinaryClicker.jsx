import { useState, useEffect, useRef, useCallback } from 'react';

const UPGRADES = [
  { id: 'coffee',    emoji: '☕', label: 'Coffee',          cost: 30,   desc: '+3 per click',    click: 3,   auto: 0   },
  { id: 'snippet',   emoji: '📋', label: 'Code Snippet',    cost: 100,  desc: '+10 per click',   click: 10,  auto: 0   },
  { id: 'junior',    emoji: '👶', label: 'Junior Dev',      cost: 280,  desc: '+5 lines/sec',    click: 0,   auto: 5   },
  { id: 'sof',       emoji: '📚', label: 'Stack Overflow',  cost: 700,  desc: '+20 lines/sec',   click: 0,   auto: 20  },
  { id: 'senior',    emoji: '🧠', label: 'Senior Dev',      cost: 1800, desc: '+60 lines/sec',   click: 0,   auto: 60  },
  { id: 'copilot',   emoji: '🤖', label: 'AI Copilot',      cost: 5000, desc: '+200 lines/sec',  click: 0,   auto: 200 },
];

let floatId = 0;

export default function BinaryClicker({ onGameOver }) {
  const [lines, setLines]       = useState(0);
  const [clickPow, setClickPow] = useState(1);
  const [autoRate, setAutoRate] = useState(0);
  const [owned, setOwned]       = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted]   = useState(false);
  const [over, setOver]         = useState(false);
  const [floats, setFloats]     = useState([]);

  const linesRef   = useRef(0);
  const clickRef   = useRef(1);
  const autoRef    = useRef(0);

  // Auto-clicker tick
  useEffect(() => {
    if (!started || over || autoRef.current === 0) return;
    const t = setInterval(() => {
      linesRef.current += autoRef.current;
      setLines(linesRef.current);
    }, 1000);
    return () => clearInterval(t);
  }, [started, over, autoRate]);

  // Timer
  useEffect(() => {
    if (!started || over) return;
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { setOver(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, over]);

  useEffect(() => { if (over) onGameOver(Math.floor(linesRef.current)); }, [over]);

  const handleClick = useCallback((e) => {
    if (over) return;
    const gain = clickRef.current;
    linesRef.current += gain;
    setLines(linesRef.current);
    const btn = e.currentTarget.getBoundingClientRect();
    const id = ++floatId;
    setFloats(f => [...f, { id, x: e.clientX - btn.left - 20, y: e.clientY - btn.top - 20, val: gain }]);
    setTimeout(() => setFloats(f => f.filter(c => c.id !== id)), 750);
  }, [over]);

  function buy(upg) {
    if (owned[upg.id] || linesRef.current < upg.cost) return;
    linesRef.current -= upg.cost;
    setLines(linesRef.current);
    setOwned(o => ({ ...o, [upg.id]: true }));
    if (upg.click) { clickRef.current += upg.click; setClickPow(clickRef.current); }
    if (upg.auto)  { autoRef.current  += upg.auto;  setAutoRate(autoRef.current);  }
  }

  if (!started) return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-6 text-center">
      <div style={{ fontSize: '3.5rem' }}>💻</div>
      <h2 className="text-xl font-bold font-mono" style={{ color: '#a855f7' }}>BINARY CLICKER</h2>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
        Click to ship code. Buy upgrades to ship faster. 60 seconds. How many lines can you ship?
      </p>
      <button onClick={() => setStarted(true)} style={{ padding: '10px 32px', borderRadius: '10px', background: '#a855f7', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 0 24px #a855f770' }}>
        START SHIPPING
      </button>
    </div>
  );

  if (over) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <div style={{ fontSize: '3rem' }}>🚀</div>
      <p className="font-mono font-bold text-xl" style={{ color: '#a855f7' }}>SHIPPED!</p>
      <div>
        <div className="font-extrabold font-mono text-5xl" style={{ color: '#a855f7' }}>{Math.floor(linesRef.current).toLocaleString()}</div>
        <div className="text-slate-500 text-sm mt-1">lines of code</div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full" style={{ background: '#06030d' }}>
      {/* Left: click zone */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
        {/* Stats */}
        <div className="text-center font-mono">
          <div className="text-3xl font-extrabold" style={{ color: '#a855f7' }}>{Math.floor(lines).toLocaleString()}</div>
          <div className="text-xs text-slate-600 mt-0.5">lines shipped</div>
        </div>

        {/* Timer */}
        <div className="font-mono text-2xl font-bold" style={{ color: timeLeft > 20 ? '#a855f7' : '#ff4444' }}>{timeLeft}s</div>

        {/* Big click button */}
        <div
          onClick={handleClick}
          style={{
            position: 'relative', width: '130px', height: '130px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.25), rgba(168,85,247,0.08))',
            border: '2px solid rgba(168,85,247,0.5)',
            boxShadow: '0 0 30px rgba(168,85,247,0.3), inset 0 0 20px rgba(168,85,247,0.1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', userSelect: 'none', fontSize: '2.2rem',
          }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.93)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(168,85,247,0.6), inset 0 0 30px rgba(168,85,247,0.3)'; }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.3), inset 0 0 20px rgba(168,85,247,0.1)'; }}
        >
          💻
          <span style={{ fontSize: '0.55rem', fontFamily: 'JetBrains Mono', color: '#a855f7', marginTop: '4px', fontWeight: 700 }}>COMMIT</span>
          {floats.map(f => (
            <div key={f.id} style={{ position: 'absolute', left: f.x, top: f.y, color: '#a855f7', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 700, pointerEvents: 'none', animation: 'floatUp 0.75s ease-out forwards', whiteSpace: 'nowrap' }}>
              +{f.val}
            </div>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-700">
          +{clickPow}/click{autoRate > 0 ? ` · +${autoRate}/sec` : ''}
        </div>
      </div>

      {/* Right: upgrades */}
      <div className="w-40 shrink-0 overflow-y-auto p-2 space-y-1.5" style={{ borderLeft: '1px solid rgba(168,85,247,0.15)' }}>
        <div className="text-xs font-mono text-slate-700 px-1 pb-1">UPGRADES</div>
        {UPGRADES.map(upg => {
          const isOwned   = owned[upg.id];
          const canAfford = !isOwned && lines >= upg.cost;
          return (
            <button
              key={upg.id}
              onClick={() => buy(upg)}
              disabled={!canAfford}
              style={{
                width: '100%', padding: '8px 9px', borderRadius: '8px', textAlign: 'left',
                background: isOwned ? 'rgba(168,85,247,0.12)' : canAfford ? 'rgba(168,85,247,0.07)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isOwned ? 'rgba(168,85,247,0.5)' : canAfford ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.05)'}`,
                cursor: canAfford ? 'pointer' : 'default',
                opacity: isOwned ? 0.65 : canAfford ? 1 : 0.35,
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono', color: isOwned ? '#a855f7' : '#e2e8f0', fontWeight: 600 }}>
                {upg.emoji} {upg.label}
              </div>
              <div style={{ fontSize: '0.62rem', fontFamily: 'JetBrains Mono', color: '#a855f7', opacity: 0.7, marginTop: '2px' }}>{upg.desc}</div>
              {!isOwned
                ? <div style={{ fontSize: '0.6rem', fontFamily: 'JetBrains Mono', color: '#64748b', marginTop: '2px' }}>{upg.cost.toLocaleString()} lines</div>
                : <div style={{ fontSize: '0.6rem', fontFamily: 'JetBrains Mono', color: '#00ff88', marginTop: '2px' }}>✓ active</div>
              }
            </button>
          );
        })}
      </div>
    </div>
  );
}
