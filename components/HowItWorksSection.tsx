'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Headphones,
  MapPin,
  Play,
  Heart,
  Disc,
  ListMusic,
  MessageCircle,
  Share2,
  Wallet,
  Mic2,
  Music,
  CreditCard,
  Users,
  Radio,
  Building2,
  Sparkles,
  User,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
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
    <section id="how-it-works" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="reveal-item opacity-0 text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            How it <span className="text-purple-400">Works</span>
          </h2>
          <p className="text-xl text-gray-400">
            A working product. Here&apos;s what you can do with it.
          </p>
        </div>

        {/* The Core Loop */}
        <div className="reveal-item opacity-0 glass rounded-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-purple-400" />
            The core loop
          </h3>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>Someone creates a subcult around a sound, a scene, or a geography. Artists apply to join and upload their music. The operator approves who gets in and surfaces what they think is worth hearing.</p>
            <p>Listeners find subcults through the people they trust. They stream, save tracks, follow artists, and pay them directly when they want to support the work.</p>
            <p>Artists get exposure and revenue. Operators build an audience around their taste. Good taste attracts better artists, which attracts more listeners, which validates the operator&apos;s reputation. The flywheel spins.</p>
            <p className="text-white font-medium">This is how scenes work in real life. SubCult just gives it infrastructure.</p>
          </div>
        </div>

        {/* For Listeners */}
        <div className="reveal-item opacity-0 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Headphones className="w-6 h-6 text-purple-400" />
            For listeners
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: MapPin, text: 'Browse subcults by location or genre' },
              { icon: Play, text: 'Stream tracks and mixes—some free, some paid' },
              { icon: Heart, text: 'Save what you like to your library' },
              { icon: Disc, text: 'Follow artists and whole subcults for new music' },
              { icon: ListMusic, text: 'Create playlists—public, private, or collaborative' },
              { icon: MessageCircle, text: 'Leave comments on artist profiles' },
              { icon: Share2, text: 'Send messages to other users' },
              { icon: Wallet, text: 'Pay artists directly—no middlemen, no platform cut' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                <item.icon className="w-5 h-5 text-purple-400/60 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* For Artists */}
        <div className="reveal-item opacity-0 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Mic2 className="w-6 h-6 text-purple-400" />
            For artists
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Music, text: 'Upload tracks and DJ mixes with full metadata' },
              { icon: CreditCard, text: 'Set your own pricing: free, paid streaming, or downloads' },
              { icon: Users, text: 'Control visibility: public, subcult-only, or private' },
              { icon: Radio, text: 'Join subcults to get distributed through trusted channels' },
              { icon: Radio, text: 'Go live with broadcast streaming' },
              { icon: ListMusic, text: 'Submit tracks to curated playlists' },
              { icon: Wallet, text: 'Money goes directly to your wallet—instant and global' },
              { icon: Zap, text: 'No payout thresholds, no waiting periods, no 30% cut' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                <item.icon className="w-5 h-5 text-purple-400/60 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* For Operators */}
        <div className="reveal-item opacity-0 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-purple-400" />
            For operators
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Sparkles, text: 'Create a subcult around your scene, genre, or taste' },
              { icon: ListMusic, text: 'Set guidelines for what belongs and what doesn\'t' },
              { icon: Users, text: 'Approve or reject artists who apply' },
              { icon: Heart, text: 'Feature tracks and mixes you think people should hear' },
              { icon: Disc, text: 'Build playlists that accept submissions from artists' },
              { icon: Radio, text: 'Broadcast live to your community' },
              { icon: User, text: 'Bring in contributors to help run things' },
              { icon: Globe, text: 'Build an audience around taste, not just personal output' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                <item.icon className="w-5 h-5 text-purple-400/60 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How Payments Work */}
        <div className="reveal-item opacity-0 glass rounded-sm p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-purple-400" />
            How payments work
          </h3>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>We use stablecoin payments. Low fees, fast settlement, works anywhere in the world.</p>
            <p>When a listener pays for a stream, buys a download, or tips an artist, the money transfers directly to the artist&apos;s wallet. No waiting. No minimum payout. An artist in Lagos can get paid by a listener in Berlin without either of them needing a US bank account.</p>
            <p className="text-white font-medium">The goal is to keep as much value as possible flowing to the people making and championing the music.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;