import { useState, useEffect, useRef } from 'react';

const QUESTIONS = [
  { lines: ['for (let i = 0; i <= arr.length; i++) {', '  process(arr[i]);', '}'], bug: 0, hint: 'Off-by-one: <= should be <' },
  { lines: ['function sum(arr) {', '  let total = 1;', '  arr.forEach(n => total += n);', '  return total;', '}'], bug: 1, hint: 'total should be initialised to 0, not 1' },
  { lines: ['async function fetchData() {', '  const res = fetch("/api/data");', '  const json = await res.json();', '  return json;', '}'], bug: 1, hint: 'Missing await before fetch()' },
  { lines: ['const doubled = nums.map(n => {', '  return n * 2;', '  console.log(n);', '});'], bug: 2, hint: 'console.log is unreachable — it comes after return' },
  { lines: ['if (user = null) {', '  showLogin();', '} else {', '  showDashboard();', '}'], bug: 0, hint: 'Assignment (=) instead of comparison (=== null)' },
  { lines: ['function greet(name = "World") {', '  return `Hello ${name}!`;', '}', 'console.log(greet);'], bug: 3, hint: 'greet is not called — missing ()' },
  { lines: ['const obj = { a: 1, b: 2 };', 'const { a, c } = obj;', 'console.log(a + c);'], bug: 1, hint: "c doesn't exist in obj — should be b" },
  { lines: ['let count = 0;', 'setInterval(() => {', '  count++;', '}, "1000");'], bug: 3, hint: 'Delay must be a number, not a string "1000"' },
  { lines: ['function factorial(n) {', '  if (n === 0) return 1;', '  return n * factorial(n);', '}'], bug: 2, hint: 'Infinite recursion — should be factorial(n - 1)' },
  { lines: ['const arr = [1, 2, 3];', 'arr.forEach((item, i) => {', '  arr[i] = item * item;', '  return arr;', '});'], bug: 3, hint: 'return inside forEach has no effect' },
];

export default function FixTheBug({ onGameOver }) {
  const [qIdx, setQIdx]       = useState(0);
  const [score, setScore]     = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [started, setStarted] = useState(false);
  const [over, setOver]       = useState(false);
  const scoreRef = useRef(0);
  const timerRef = useRef(null);

  const q = QUESTIONS[qIdx];

  const nextQ = (delay = 1300) => {
    setTimeout(() => {
      if (qIdx + 1 >= QUESTIONS.length) { setOver(true); }
      else { setQIdx(q => q + 1); setSelected(null); setAnswered(false); setTimeLeft(20); }
    }, delay);
  };

  useEffect(() => {
    if (!started || over || answered) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setAnswered(true); nextQ(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, qIdx, over, answered]);

  useEffect(() => { if (over) onGameOver(scoreRef.current); }, [over]);

  function pick(idx) {
    if (answered) return;
    clearInterval(timerRef.current);
    setSelected(idx);
    setAnswered(true);
    if (idx === q.bug) {
      const pts = Math.max(1, timeLeft) * 5;
      scoreRef.current += pts;
      setScore(scoreRef.current);
    }
    nextQ(1400);
  }

  if (!started) return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-6 text-center">
      <div style={{ fontSize: '3.5rem' }}>🔍</div>
      <h2 className="text-xl font-bold font-mono" style={{ color: '#ff6b35' }}>FIX THE BUG</h2>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
        10 buggy snippets. Click the line with the bug in 20 seconds. Faster = more points.
      </p>
      <button onClick={() => setStarted(true)} style={{ padding: '10px 32px', borderRadius: '10px', background: '#ff6b35', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 0 24px #ff6b3570' }}>
        FIND BUGS
      </button>
    </div>
  );

  if (over) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <div style={{ fontSize: '3rem' }}>🏆</div>
      <p className="font-mono font-bold text-xl" style={{ color: '#ff6b35' }}>DONE</p>
      <div>
        <div className="font-extrabold font-mono text-5xl" style={{ color: '#ff6b35' }}>{scoreRef.current}</div>
        <div className="text-slate-500 text-sm mt-1">points</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 font-mono text-sm" style={{ borderBottom: '1px solid #ff6b3528' }}>
        <div style={{ color: '#ff6b35' }} className="font-bold">{score} <span className="text-xs text-slate-600">pts</span></div>
        <div className="text-slate-600 text-xs">Q {qIdx + 1} / {QUESTIONS.length}</div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="h-1.5 rounded-full transition-all" style={{ width: `${(timeLeft / 20) * 100}%`, background: timeLeft > 8 ? '#ff6b35' : '#ff4444' }} />
          </div>
          <span className="font-bold" style={{ color: timeLeft > 8 ? '#ff6b35' : '#ff4444' }}>{timeLeft}s</span>
        </div>
      </div>

      {/* Code */}
      <div className="flex-1 flex flex-col justify-center px-5 py-4 gap-3" style={{ background: '#090507' }}>
        <p className="text-center text-xs font-mono text-slate-600">click the line with the bug</p>
        <div className="space-y-1.5">
          {q.lines.map((line, i) => {
            const isCorrect = answered && i === q.bug;
            const isWrong   = answered && i === selected && i !== q.bug;
            return (
              <div
                key={i}
                onClick={() => pick(i)}
                style={{
                  display: 'flex', gap: '10px', padding: '9px 13px', borderRadius: '8px',
                  cursor: answered ? 'default' : 'pointer',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem',
                  color: isCorrect ? '#ff4444' : isWrong ? '#94a3b8' : '#94a3b8',
                  background: isCorrect ? 'rgba(255,68,68,0.12)' : isWrong ? 'rgba(255,107,53,0.05)' : 'rgba(255,107,53,0.04)',
                  border: `1px solid ${isCorrect ? '#ff4444' : isWrong ? 'rgba(255,107,53,0.2)' : 'rgba(255,107,53,0.12)'}`,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!answered) e.currentTarget.style.background = 'rgba(255,107,53,0.1)'; }}
                onMouseLeave={e => { if (!answered && !isCorrect && !isWrong) e.currentTarget.style.background = 'rgba(255,107,53,0.04)'; }}
              >
                <span style={{ color: 'rgba(255,107,53,0.35)', minWidth: '18px' }}>{i + 1}</span>
                <span style={{ flex: 1 }}>{line}</span>
                {isCorrect && <span style={{ color: '#ff4444', fontSize: '0.65rem' }}>← BUG</span>}
              </div>
            );
          })}
        </div>
        {answered && (
          <p className="text-center text-xs font-mono mt-1" style={{ color: selected === q.bug ? '#00ff88' : '#ff4444' }}>
            {selected === q.bug ? `✓ Correct! +${Math.max(1, timeLeft) * 5} pts` : `✗ ${q.hint}`}
          </p>
        )}
      </div>
    </div>
  );
}
