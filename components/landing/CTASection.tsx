'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GeometricLogo from '../GeometricLogo'
import SignupForm from './SignupForm'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.cta-reveal', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      // Slow ambient spin on the watermark globe
      gsap.to('.cta-globe', {
        rotation: 360,
        duration: 80,
        ease: 'none',
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="join"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-32 md:px-10 md:py-48"
    >
      {/* Watermark globe */}
      <div
        className="cta-globe pointer-events-none absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.05]"
        aria-hidden="true"
      >
        <GeometricLogo className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[180px]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="cta-reveal font-mono text-[11px] uppercase tracking-[0.4em] text-gray-400 md:text-xs">
          05 — Join the beta
        </p>
        <h2 className="cta-reveal mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl">
          Find your scene.
        </h2>
        <p className="cta-reveal mt-6 max-w-xl text-gray-400 md:text-lg">
          Be first in when we open the doors. Whether you make music, champion
          it, or just can&apos;t live without it — there&apos;s a place for
          you here.
        </p>
        <div className="cta-reveal mt-10 flex w-full justify-center">
          <SignupForm id="cta" />
        </div>
      </div>
    </section>
  )
}
