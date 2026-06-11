'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlobeScene from './GlobeScene'
import SignupForm from './SignupForm'

gsap.registerPlugin(ScrollTrigger)

const TITLE = 'SUBCULT'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduce) {
        gsap.set(['.hero-char', '.hero-fade', '.hero-globe'], {
          opacity: 1,
          y: 0,
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to('.hero-globe', { opacity: 1, duration: 2, ease: 'power2.inOut' }, 0)
        .to(
          '.hero-char',
          { y: 0, duration: 1.4, stagger: 0.06 },
          0.3
        )
        .to(
          '.hero-fade',
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          1
        )

      // Globe + title drift apart as you scroll away
      gsap.to('.hero-globe', {
        opacity: 0,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        },
      })
      gsap.to('.hero-inner', {
        yPercent: -12,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5"
    >
      {/* Three.js globe */}
      <div className="hero-globe absolute inset-0 opacity-0">
        <GlobeScene />
      </div>

      {/* Legibility gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.55)_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      <div className="hero-inner relative z-10 flex w-full max-w-5xl flex-col items-center pt-20">
        <p className="hero-fade translate-y-6 font-mono text-[11px] uppercase tracking-[0.4em] text-brand-light opacity-0 md:text-xs">
          Music is not content
        </p>

        <h1
          aria-label="Subcult"
          className="mt-6 select-none text-center font-clash text-[clamp(3.4rem,16.5vw,13rem)] font-semibold leading-[0.95] tracking-[-0.01em] text-white"
        >
          {TITLE.split('').map((char, i) => (
            <span key={i} className="char-mask" aria-hidden="true">
              <span className="hero-char inline-block translate-y-[110%]">
                {char}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-6 max-w-xl translate-y-6 text-center text-base text-gray-400 opacity-0 md:text-lg">
          Discover and support underground music communities around the world.
          Scenes, not algorithms.
        </p>

        <div className="hero-fade mt-10 flex w-full translate-y-6 justify-center opacity-0">
          <SignupForm id="hero" />
        </div>
      </div>

      {/* Bottom meta strip */}
      <div className="hero-fade absolute bottom-6 left-0 right-0 z-10 hidden translate-y-6 items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-600 opacity-0 md:flex md:px-10 md:text-[11px]">
        <span className="flex items-center gap-2">
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-light" />
          Private beta
        </span>
        <span className="hidden md:inline">Scroll to explore</span>
        <span>EST. 2026</span>
      </div>
    </section>
  )
}
