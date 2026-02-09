// MDRN Globe Logo - wireframe globe with Bluetooth-like monogram
const GeometricLogo = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    {/* Globe outer circle */}
    <circle cx="50" cy="50" r="45" />
    
    {/* Longitude lines (vertical curves) */}
    <ellipse cx="50" cy="50" rx="20" ry="45" />
    <ellipse cx="50" cy="50" rx="35" ry="45" />
    
    {/* Latitude lines (horizontal curves) */}
    <ellipse cx="50" cy="50" rx="45" ry="18" />
    <ellipse cx="50" cy="50" rx="45" ry="32" />
    
    {/* Center lines */}
    <line x1="50" y1="5" x2="50" y2="95" strokeOpacity="0.6" />
    <line x1="5" y1="50" x2="95" y2="50" strokeOpacity="0.6" />
    
    {/* Central monogram - symmetrical bind-rune / Bluetooth-like symbol */}
    <g strokeWidth="2.5" strokeLinejoin="round">
      {/* Vertical axis */}
      <line x1="50" y1="30" x2="50" y2="70" />
      {/* Upper-right chevron */}
      <polyline points="50,30 62,42 50,50" fill="none" />
      {/* Lower-right chevron */}
      <polyline points="50,50 62,58 50,70" fill="none" />
      {/* Upper-left chevron (mirrored) */}
      <polyline points="50,30 38,42 50,50" fill="none" />
      {/* Lower-left chevron (mirrored) */}
      <polyline points="50,50 38,58 50,70" fill="none" />
    </g>
    
    {/* Network nodes at intersections */}
    <circle cx="72" cy="50" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="28" cy="50" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="50" cy="27" r="2" fill="currentColor" stroke="none" />
  </svg>
);

export default GeometricLogo;
