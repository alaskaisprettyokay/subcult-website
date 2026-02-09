'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  User,
  Disc,
  MapPin,
  Globe,
  Music
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// What is a Subcult Section
const SubcultConceptSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const subcultTypes = [
    {
      title: 'A single person',
      description: 'With strong taste. A DJ, a radio host, a blogger—anyone who\'s built trust by consistently surfacing good music.',
      icon: User,
    },
    {
      title: 'A label or collective',
      description: 'With a clear identity. The releases, the roster, the events—all under one roof.',
      icon: Disc,
    },
    {
      title: 'A local scene',
      description: 'Rooted in a city or neighborhood. The artists, DJs, and listeners who show up week after week.',
      icon: MapPin,
    },
    {
      title: 'A diasporic community',
      description: 'Scattered across the world but connected by sound. People who share a cultural background and the music that comes from it.',
      icon: Globe,
    },
    {
      title: 'A genre-based space',
      description: 'That crosses geographic boundaries. The global network of people obsessed with the same niche sound.',
      icon: Music,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.reveal-item');
      elements?.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="subcult" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="reveal-item opacity-0 text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            What is a <span className="text-purple-400">Subcult?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A subcult can be many things. But it&apos;s always built around someone with taste—and the trust that comes from consistently surfacing good music.
          </p>
        </div>

        <div className="space-y-8">
          {subcultTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <div key={index} className="reveal-item opacity-0 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mt-1 flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{type.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal-item opacity-0 mt-16 text-center">
          <div className="glass rounded-sm p-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Each subcult is unique, but they all share something: they&apos;re spaces where the relationship between tastemaker and audience can actually thrive. Where good music gets the attention it deserves, and where that attention can translate into sustainable support for artists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubcultConceptSection;