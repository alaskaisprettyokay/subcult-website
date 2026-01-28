'use client'

import GeometricLogo from './GeometricLogo';

// Footer
const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 px-4 md:px-8 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 text-white/80">
              <GeometricLogo className="w-full h-full" />
            </div>
            <span className="text-xl font-bold text-white tracking-wider">SUBCULT</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors text-sm">What is SubCult?</button>
            <button onClick={() => scrollToSection('subcult')} className="text-gray-400 hover:text-white transition-colors text-sm">What is a Subcult?</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-400 hover:text-white transition-colors text-sm">How it Works</button>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
          </nav>

          <p className="text-gray-600 text-sm">
            © 2026 Subcult
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;