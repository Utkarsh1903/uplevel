/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'Fira Code', 'monospace'] },
      colors: {
        void: '#080c14',
        surface: '#0d1117',
        panel: '#111827',
        emerald: { 400: '#34d399', 500: '#10b981', 600: '#059669' },
      },
      animation: {
        gradient: 'gradient 20s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bar': 'barGrow 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'bounce-in': 'bounceIn 0.4s ease-out',
      },
      keyframes: {
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.94)' }, to: { opacity: '1', transform: 'scale(1)' } },
        barGrow: { from: { width: '0%' }, to: { width: 'var(--bar-width)' } },
        bounceIn: { '0%': { transform: 'scale(0.8)', opacity: '0' }, '70%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
