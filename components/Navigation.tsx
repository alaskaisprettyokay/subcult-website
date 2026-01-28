'use client'

import { useEffect, useState } from 'react';
import GeometricLogo from './GeometricLogo';

// Navigation Component - light gray like subvert.fm
const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="bg-[#c0c0c0] border-b border-gray-400">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 text-gray-800">
                <GeometricLogo className="w-full h-full" />
              </div>
              <span className="font-bold text-gray-900 tracking-wider text-sm">SUBCULT</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-800 hover:text-black transition-colors text-xs uppercase tracking-wide font-medium">What is SubCult?</button>
              <button onClick={() => scrollToSection('subcult')} className="text-gray-800 hover:text-black transition-colors text-xs uppercase tracking-wide font-medium">What is a Subcult?</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-800 hover:text-black transition-colors text-xs uppercase tracking-wide font-medium">How it Works</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;