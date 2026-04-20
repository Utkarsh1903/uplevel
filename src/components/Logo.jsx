export default function Logo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={Math.round(size * 1.15)} viewBox="0 0 40 46" fill="none" className={className}>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="40" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="100%" stopColor="#10b981"/>
        </linearGradient>
      </defs>
      <path d="M20 1L38 11.5V32.5L20 45L2 32.5V11.5L20 1Z" fill="url(#logo-g)" fillOpacity="0.12" stroke="url(#logo-g)" strokeWidth="1.5"/>
      <circle cx="20" cy="1"    r="2"   fill="#6366f1"/>
      <circle cx="38" cy="11.5" r="1.5" fill="#818cf8"/>
      <circle cx="38" cy="32.5" r="1.5" fill="#34d399"/>
      <circle cx="20" cy="45"   r="2"   fill="#10b981"/>
      <circle cx="2"  cy="32.5" r="1.5" fill="#34d399"/>
      <circle cx="2"  cy="11.5" r="1.5" fill="#818cf8"/>
      <path d="M20 13L29 26.5H11L20 13Z" fill="url(#logo-g)"/>
      <rect x="16" y="26.5" width="8" height="8" rx="2" fill="url(#logo-g)"/>
    </svg>
  );
}
