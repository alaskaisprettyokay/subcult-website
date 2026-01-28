'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radio, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExploreScenesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scenes = [
    { name: 'Brooklyn', country: 'USA', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop' },
    { name: 'Berlin', country: 'Germany', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop' },
    { name: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop' },
    { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop' },
    { name: 'Los Angeles', country: 'USA', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&h=400&fit=crop' },
    { name: 'Mexico City', country: 'Mexico', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&h=400&fit=crop' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.scene-card');
      if (!cards) return;

      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Radio className="w-5 h-5 text-white/60" />
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Global Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Explore <span className="text-gray-400">Scenes</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover underground music communities in cities around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
            <div
              key={scene.name}
              className="scene-card group relative aspect-[3/2] rounded-sm overflow-hidden cursor-pointer opacity-0"
            >
              <img
                src={scene.image}
                alt={scene.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-gray-400 text-sm mb-1">{scene.country}</p>
                <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
                  {scene.name}
                </h3>
              </div>

              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/20 rounded-sm text-white font-medium hover:border-white/40 hover:bg-white/10 transition-all duration-300 group">
            View all scenes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreScenesSection;