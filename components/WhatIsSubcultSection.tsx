'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Radio,
  Mic2,
  Headphones,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// What is SubCult Section
const WhatIsSubcultSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="reveal-item opacity-0 text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-white/60" />
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">About</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            What is <span className="text-gray-400">SubCult?</span>
          </h2>
          <p className="text-xl text-gray-400">
            Infrastructure for music communities.
          </p>
        </div>

        <div className="space-y-12">
          <div className="reveal-item opacity-0">
            <p className="text-lg text-gray-300 leading-relaxed">
              Think about how you actually discover music that sticks. Not the background noise, but the songs that become part of your life. Almost always, there&apos;s a person involved. A friend who knew you&apos;d love it. A DJ whose taste you trust. A radio host who&apos;s been doing this for years.
            </p>
          </div>

          <div className="reveal-item opacity-0">
            <p className="text-lg text-gray-300 leading-relaxed">
              That relationship—between the people who find music and the people who listen—is where culture actually happens. It&apos;s how sounds travel, how scenes form, how artists find their people. And right now, there&apos;s no good infrastructure for it online.
            </p>
          </div>

          <div className="reveal-item opacity-0 glass rounded-sm p-8">
            <h3 className="text-2xl font-bold text-white mb-4">What we&apos;re building</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              We let tastemakers create their own spaces—communities built around their taste and the artists they champion. These aren&apos;t playlists. They&apos;re living ecosystems where artists and listeners actually connect.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When a listener supports an artist through SubCult, the money goes directly to them. Instantly. Globally. No waiting, no middlemen taking 30%. We use stablecoin payments, which means an artist in Lagos can get paid by a fan in Berlin without either of them needing a US bank account.
            </p>
          </div>

          <div className="reveal-item opacity-0">
            <h3 className="text-2xl font-bold text-white mb-6">Who it&apos;s for</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-sm p-6 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-white/80" />
                </div>
                <h4 className="font-bold text-white mb-2">Tastemakers</h4>
                <p className="text-sm text-gray-400">DJs, radio hosts, label heads, bloggers, promoters—build around your taste and capture value from it.</p>
              </div>
              <div className="bg-white/5 rounded-sm p-6 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Mic2 className="w-6 h-6 text-white/80" />
                </div>
                <h4 className="font-bold text-white mb-2">Artists</h4>
                <p className="text-sm text-gray-400">Direct connection to people who care about your work. No more shouting into the void of algorithms.</p>
              </div>
              <div className="bg-white/5 rounded-sm p-6 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6 text-white/80" />
                </div>
                <h4 className="font-bold text-white mb-2">Listeners</h4>
                <p className="text-sm text-gray-400">Discovery that actually means something. Music chosen by people, not engagement metrics.</p>
              </div>
            </div>
          </div>

          <div className="reveal-item opacity-0 glass rounded-sm p-8 border-l-4 border-white/30">
            <h3 className="text-2xl font-bold text-white mb-4">Why this matters now</h3>
            <p className="text-gray-400 leading-relaxed">
              The current model isn&apos;t working. Artists can&apos;t make a living from streams. The people who find and champion music can&apos;t get paid at all. Listeners are drowning in infinite content but starving for actual connection. We think there&apos;s a better way—one where the people who make music and the people who champion it can actually build something sustainable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSubcultSection;