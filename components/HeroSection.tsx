'use client'

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Mail } from 'lucide-react';
import Image from 'next/image';

// Hero Section with email signup
const HeroSection = () => {
  const [userType, setUserType] = useState<'listener' | 'curator'>('listener');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60, rotateX: 45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.5 }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          userType
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Welcome! Check your email for confirmation.');
        setEmail('');
      } else if (result.error === 'ALREADY_SUBSCRIBED') {
        setMessage('You\'re already on the list!');
      } else {
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Network error. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div ref={logoRef} className="mb-8 relative">
        <div className="w-24 h-24 md:w-32 md:h-32 animate-slow-rotate">
          <Image
            src="/subcult_mdrn logo.png"
            alt="SubCult"
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 blur-xl opacity-50 animate-slow-rotate">
          <Image
            src="/subcult_mdrn logo.png"
            alt=""
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div
        ref={titleRef}
        className="mb-6 opacity-0"
        style={{ perspective: '1000px' }}
      >
        <Image
          src="/SUBCULT.png"
          alt="SUBCULT"
          width={400}
          height={100}
          className="w-auto h-16 md:h-20 lg:h-24 object-contain"
          priority
        />
      </div>

      <p className="text-lg md:text-xl text-gray-400 text-center max-w-xl mb-10 opacity-0 animate-[reveal-up_0.8s_ease-out_0.4s_forwards]">
        Discover and support underground music communities around the world.
      </p>

      <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-sm mb-8 opacity-0 animate-[reveal-up_0.8s_ease-out_0.6s_forwards]">
        <button
          onClick={() => setUserType('listener')}
          className={`px-6 py-2.5 rounded-sm text-sm font-medium transition-all duration-300 ${
            userType === 'listener'
              ? 'bg-white text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Listener
        </button>
        <button
          onClick={() => setUserType('curator')}
          className={`px-6 py-2.5 rounded-sm text-sm font-medium transition-all duration-300 ${
            userType === 'curator'
              ? 'bg-white text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Curator / Artist
        </button>
      </div>

      <div ref={formRef} className="w-full max-w-md opacity-0">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isSubmitting}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Joining...' : 'Join'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {message && (
          <p className={`text-center text-sm mt-4 ${message.includes('Welcome') ? 'text-green-400' : message.includes('already') ? 'text-yellow-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <p className="text-center text-gray-500 text-sm mt-4">
          Join the waitlist for early access
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[reveal-up_0.8s_ease-out_1s_forwards]">
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
        </div>
        <span className="text-gray-600 text-xs">Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;