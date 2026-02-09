// MDRN Globe Logo - uses the actual vector logo asset
const GeometricLogo = ({ className = '' }: { className?: string }) => (
  <img
    src="/subcult-vector.png"
    alt="MDRN Logo"
    className={className}
    draggable={false}
  />
);

export default GeometricLogo;
