// Geometric Logo Component - white/gray
const GeometricLogo = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <circle cx="50" cy="50" r="45" strokeOpacity="0.3" />
    <circle cx="50" cy="50" r="35" strokeOpacity="0.5" />
    <circle cx="50" cy="50" r="25" strokeOpacity="0.7" />
    <line x1="50" y1="5" x2="50" y2="95" strokeOpacity="0.4" />
    <line x1="5" y1="50" x2="95" y2="50" strokeOpacity="0.4" />
    <line x1="18" y1="18" x2="82" y2="82" strokeOpacity="0.4" />
    <line x1="82" y1="18" x2="18" y2="82" strokeOpacity="0.4" />
    <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export default GeometricLogo;