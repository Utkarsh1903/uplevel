import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if session already exists (code already exchanged)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard', { replace: true });
        return;
      }

      // Wait for the SIGNED_IN event — fires after code exchange completes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe();
          navigate('/dashboard', { replace: true });
        }
      });
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-mesh">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Signing you in…</p>
      </div>
    </div>
  );
}
