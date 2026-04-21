import { useNavigate } from 'react-router-dom';
import { Sparkles, Lock } from 'lucide-react';

export default function PremiumGate({ feature = 'This feature' }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 fade-in">
      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 glow-indigo">
        <Lock size={28} className="text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Premium Feature</h2>
      <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
        {feature} is available for UpLevel Premium members. Upgrade for ₹499 one-time — pay once, own it forever.
      </p>
      <div className="flex gap-3">
        <button onClick={() => navigate('/premium')} className="btn-primary flex items-center gap-2">
          <Sparkles size={16} />
          Unlock Premium — ₹499 one-time
        </button>
        <button onClick={() => navigate(-1)} className="btn-ghost">
          Go Back
        </button>
      </div>
      <p className="text-slate-500 text-xs mt-6">
        No automatic payments. We collect manually — you stay in control.
      </p>
    </div>
  );
}
