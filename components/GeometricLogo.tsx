// MDRN Globe Logo - wireframe globe with interlocked bind-rune monogram
const GeometricLogo = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Globe outer circle */}
    <circle cx="50" cy="50" r="40" />
    
    {/* Longitude lines (meridians) */}
    <ellipse cx="50" cy="50" rx="14" ry="40" />
    <ellipse cx="50" cy="50" rx="28" ry="40" />
    
    {/* Latitude lines */}
    <ellipse cx="50" cy="50" rx="40" ry="14" />
    <ellipse cx="50" cy="50" rx="40" ry="28" />
    
    {/* Central bind-rune monogram - two interlocked zigzag paths */}
    <g strokeWidth="2.5">
      {/* Path A: top → right → crosses left → bottom */}
      <path d="M50,18 L63,37 L37,63 L50,82" />
      {/* Path B: top → left → crosses right → bottom */}
      <path d="M50,18 L37,37 L63,63 L50,82" />
    </g>
    
    {/* Network node circles on equator */}
    <g strokeWidth="1.8">
      {/* Left node */}
      <circle cx="27" cy="50" r="3.5" />
      <circle cx="27" cy="50" r="1.2" fill="currentColor" stroke="none" />
      
      {/* Right node */}
      <circle cx="73" cy="50" r="3.5" />
      <circle cx="73" cy="50" r="1.2" fill="currentColor" stroke="none" />
      
      {/* Node connection lines to monogram vertices */}
      <line x1="30.5" y1="50" x2="37" y2="37" />
      <line x1="30.5" y1="50" x2="37" y2="63" />
      <line x1="69.5" y1="50" x2="63" y2="37" />
      <line x1="69.5" y1="50" x2="63" y2="63" />
    </g>
  </svg>
);

export default GeometricLogo;
