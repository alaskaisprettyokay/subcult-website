// MDRN Globe Logo - uses the actual vector logo asset, filtered white
const GeometricLogo = ({ className = '' }: { className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/subcult-vector.png"
    alt="MDRN Logo"
    className={className}
    style={{ filter: 'brightness(0) invert(1)' }}
    draggable={false}
  />
);

export default GeometricLogo;
