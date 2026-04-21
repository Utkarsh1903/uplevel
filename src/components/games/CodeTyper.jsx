import { useState, useEffect, useRef } from 'react';

const SNIPPETS = [
  { lang: 'JavaScript', code: `function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (arr[mid] === target) return mid;\n    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;\n  }\n  return -1;\n}` },
  { lang: 'JavaScript', code: `const debounce = (fn, ms) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n};` },
  { lang: 'JavaScript', code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n}` },
  { lang: 'JavaScript', code: `function maxProfit(prices) {\n  let min = Infinity, profit = 0;\n  for (const p of prices) {\n    min = Math.min(min, p);\n    profit = Math.max(profit, p - min);\n  }\n  return profit;\n}` },
  { lang: 'Python', code: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)` },
];

export default function CodeTyper({ onGameOver }) {
  const [snippet]         = useState(() => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]);
  const [typedIdx, setTypedIdx] = useState(0);
  const [errors, setErrors]     = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted]   = useState(false);
  const [finished, setFinished] = useState(false);
  const startRef   = useRef(null);
  const idxRef     = useRef(0);
  const finRef     = useRef(false);
  const containerRef = useRef(null);

  const code = snippet.code;

  // Skip newlines automatically
  function advance(idx) {
    while (idx < code.length && code[idx] === '\n') idx++;
    return idx;
  }

  const calcWPM = () => {
    if (!startRef.current) return 0;
    const mins = (Date.now() - startRef.current) / 60000;
    return Math.max(0, Math.round((idxRef.current / 5) / Math.max(mins, 0.01)));
  };

  // Timer
  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { if (!finRef.current) { finRef.current = true; setFinished(true); } return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, finished]);

  // Emit score on finish
  useEffect(() => { if (finished) onGameOver(calcWPM()); }, [finished]);

  // Keydown handler
  useEffect(() => {
    if (!started || finished) return;
    const handler = (e) => {
      if (finRef.current) return;
      if (['Tab', 'Escape', 'F5'].includes(e.key)) { e.preventDefault(); return; }

      let idx = advance(idxRef.current);
      if (idx >= code.length) { finRef.current = true; setFinished(true); return; }

      const expected = code[idx];
      if (e.key === expected) {
        const next = advance(idx + 1);
        idxRef.current = next;
        setTypedIdx(next);
        if (next >= code.length) { finRef.current = true; setFinished(true); }
      } else if (e.key.length === 1 || e.key === 'Enter') {
        setErrors(er => er + 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [started, finished, code]);

  useEffect(() => { if (started) containerRef.current?.focus(); }, [started]);

  const renderCode = () => {
    const effective = advance(typedIdx);
    return code.split('').map((ch, i) => {
      if (ch === '\n') return <span key={i}>{'\n'}</span>;
      let color = '#334155';
      let bg    = 'transparent';
      if (i < effective)     { color = '#00f5ff'; }
      if (i === effective)   { color = '#fff'; bg = 'rgba(0,245,255,0.25)'; }
      return <span key={i} style={{ color, background: bg, borderRadius: '2px' }}>{ch}</span>;
    });
  };

  if (!started) return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-6 text-center">
      <div style={{ fontSize: '3.5rem' }}>⌨️</div>
      <h2 className="text-xl font-bold font-mono" style={{ color: '#00f5ff' }}>CODE TYPER</h2>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
        A real code snippet appears. Type it as fast as you can in 60 seconds. Score = WPM.
      </p>
      <div className="text-xs font-mono px-3 py-1 rounded-lg" style={{ color: '#00f5ff', border: '1px solid #00f5ff30', background: '#00f5ff08' }}>
        {snippet.lang}
      </div>
      <button onClick={() => { setStarted(true); startRef.current = Date.now(); }} style={{ padding: '10px 32px', borderRadius: '10px', background: '#00f5ff', color: '#000', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 0 24px #00f5ff70' }}>
        START TYPING
      </button>
    </div>
  );

  if (finished) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <div style={{ fontSize: '3rem' }}>⌨️</div>
      <p className="font-mono font-bold text-xl" style={{ color: '#00f5ff' }}>TIME&apos;S UP</p>
      <div>
        <div className="font-extrabold font-mono text-5xl" style={{ color: '#00f5ff' }}>{calcWPM()}</div>
        <div className="text-slate-500 text-sm mt-1">WPM</div>
      </div>
      <div className="text-xs font-mono text-slate-600">{errors} errors · {typedIdx} chars typed</div>
    </div>
  );

  return (
    <div ref={containerRef} tabIndex={0} className="flex flex-col h-full outline-none" onClick={() => containerRef.current?.focus()}>
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 font-mono" style={{ borderBottom: '1px solid #00f5ff18' }}>
        <div className="text-sm font-bold" style={{ color: '#00f5ff' }}>{calcWPM()} <span className="text-xs text-slate-600">wpm</span></div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-28 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="h-1.5 rounded-full transition-all" style={{ width: `${(timeLeft / 60) * 100}%`, background: timeLeft > 15 ? '#00f5ff' : '#ff4444' }} />
          </div>
          <span className="text-sm font-bold" style={{ color: timeLeft > 15 ? '#00f5ff' : '#ff4444' }}>{timeLeft}s</span>
        </div>
        <div className="text-sm text-slate-600">{errors} <span className="text-xs">err</span></div>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto p-5 cursor-text" style={{ background: '#010810' }}>
        <pre className="text-sm leading-7" style={{ fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {renderCode()}
        </pre>
      </div>
      <div className="text-center text-xs font-mono text-slate-700 py-2 shrink-0">click here · then type</div>
    </div>
  );
}
