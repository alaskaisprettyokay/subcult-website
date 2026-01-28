import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, MapPin, Radio, 
  ArrowRight, Mail, Sparkles, 
  Disc, Headphones, Mic2,
  Wallet, Globe, Zap, Music, 
  User, Building2, Heart, Share2,
  Play, CreditCard,
  ListMusic, MessageCircle
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Geometric Logo Component - white/gray
const GeometricLogo = ({ className = '' }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className}`}
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

// Animated Background Component - white/gray particles
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 25;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.fill();

        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Hero Section
const HeroSection = () => {
  const [userType, setUserType] = useState<'listener' | 'curator'>('listener');
  const [email, setEmail] = useState('');
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

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div ref={logoRef} className="mb-8 relative">
        <div className="w-24 h-24 md:w-32 md:h-32 text-white/80 animate-slow-rotate">
          <GeometricLogo className="w-full h-full" />
        </div>
        <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 text-white/40 blur-xl opacity-50 animate-slow-rotate">
          <GeometricLogo className="w-full h-full" />
        </div>
      </div>

      <h1 
        ref={titleRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 text-white opacity-0 tracking-tight"
        style={{ perspective: '1000px' }}
      >
        Subcult
      </h1>

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
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
            />
          </div>
          <button className="px-6 py-3.5 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2">
            Join
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
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
              Think about how you actually discover music that sticks. Not the background noise, but the songs that become part of your life. Almost always, there's a person involved. A friend who knew you'd love it. A DJ whose taste you trust. A radio host who's been doing this for years.
            </p>
          </div>

          <div className="reveal-item opacity-0">
            <p className="text-lg text-gray-300 leading-relaxed">
              That relationship—between the people who find music and the people who listen—is where culture actually happens. It's how sounds travel, how scenes form, how artists find their people. And right now, there's no good infrastructure for it online.
            </p>
          </div>

          <div className="reveal-item opacity-0 glass rounded-sm p-8">
            <h3 className="text-2xl font-bold text-white mb-4">What we're building</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              We let tastemakers create their own spaces—communities built around their taste and the artists they champion. These aren't playlists. They're living ecosystems where artists and listeners actually connect.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When a listener supports an artist through SubCult, the money goes directly to them. Instantly. Globally. No waiting, no middlemen taking 30%. We use stablecoin payments, which means an artist in Lagos can get paid by a fan in Berlin without either of them needing a US bank account.
            </p>
          </div>

          <div className="reveal-item opacity-0">
            <h3 className="text-2xl font-bold text-white mb-6">Who it's for</h3>
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
              The current model isn't working. Artists can't make a living from streams. The people who find and champion music can't get paid at all. Listeners are drowning in infinite content but starving for actual connection. We think there's a better way—one where the people who make music and the people who champion it can actually build something sustainable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

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
            What is a <span className="text-gray-400">Subcult?</span>
          </h2>
          <p className="text-xl text-gray-400">
            We're proposing a new unit of music culture.
          </p>
        </div>

        <div className="space-y-12">
          <div className="reveal-item opacity-0">
            <p className="text-lg text-gray-300 leading-relaxed">
              We're trying to name something that already exists but doesn't have good infrastructure online.
            </p>
          </div>

          <div className="reveal-item opacity-0">
            <p className="text-lg text-gray-300 leading-relaxed">
              You already follow these, even if you've never called them subcults. The DJ whose sets always hit. The label whose releases you check without question. The radio host who plays things you've never heard but instantly love. The collective that throws the parties you never miss.
            </p>
          </div>

          <div className="reveal-item opacity-0 glass rounded-sm p-8 border border-white/20">
            <p className="text-xl text-white leading-relaxed text-center">
              A subcult is a space built around shared taste. It can be run by a single person or a collective—what matters is the point of view. These are where music actually happens. Not on platforms with infinite content—through specific people with specific taste.
            </p>
          </div>

          <div className="reveal-item opacity-0">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">What a subcult might be</h3>
            <div className="space-y-4">
              {subcultTypes.map((type, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white/5 rounded-sm border border-white/10 hover:border-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors">
                    <type.icon className="w-6 h-6 text-white/80" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{type.title}</h4>
                    <p className="text-gray-400">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-item opacity-0 text-center">
            <p className="text-lg text-gray-400">
              What matters isn't scale or structure—it's <span className="text-white font-medium">coherence</span>. A clear point of view about what belongs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// How it Works Section
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
            How it <span className="text-gray-400">Works</span>
          </h2>
          <p className="text-xl text-gray-400">
            A working product. Here's what you can do with it.
          </p>
        </div>

        {/* The Core Loop */}
        <div className="reveal-item opacity-0 glass rounded-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-white/80" />
            The core loop
          </h3>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>Someone creates a subcult around a sound, a scene, or a geography. Artists apply to join and upload their music. The operator approves who gets in and surfaces what they think is worth hearing.</p>
            <p>Listeners find subcults through the people they trust. They stream, save tracks, follow artists, and pay them directly when they want to support the work.</p>
            <p>Artists get exposure and revenue. Operators build an audience around their taste. Good taste attracts better artists, which attracts more listeners, which validates the operator's reputation. The flywheel spins.</p>
            <p className="text-white font-medium">This is how scenes work in real life. SubCult just gives it infrastructure.</p>
          </div>
        </div>

        {/* For Listeners */}
        <div className="reveal-item opacity-0 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Headphones className="w-6 h-6 text-white/80" />
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
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/10">
                <item.icon className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* For Artists */}
        <div className="reveal-item opacity-0 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Mic2 className="w-6 h-6 text-white/80" />
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
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/10">
                <item.icon className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* For Operators */}
        <div className="reveal-item opacity-0 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-white/80" />
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
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/10">
                <item.icon className="w-5 h-5 text-white/60 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How Payments Work */}
        <div className="reveal-item opacity-0 glass rounded-sm p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-white/80" />
            How payments work
          </h3>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>We use stablecoin payments. Low fees, fast settlement, works anywhere in the world.</p>
            <p>When a listener pays for a stream, buys a download, or tips an artist, the money transfers directly to the artist's wallet. No waiting. No minimum payout. An artist in Lagos can get paid by a listener in Berlin without either of them needing a US bank account.</p>
            <p className="text-white font-medium">The goal is to keep as much value as possible flowing to the people making and championing the music.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Explore Scenes Section
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

// Main App
function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Navigation />
      <div className="grain-overlay" />
      <AnimatedBackground />
      
      <main className="relative z-10">
        <HeroSection />
        <WhatIsSubcultSection />
        <SubcultConceptSection />
        <HowItWorksSection />
        <ExploreScenesSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
