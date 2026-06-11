'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATEMENT =
  'You became a content creator who happens to make music. Platforms turned songs into inventory, scenes into moods, and the craft into a side project. We think that’s backwards.'

const STATS = [
  { value: 0.003, prefix: '$', decimals: 3, label: 'Average payout per stream' },
  { value: 250, suffix: 'K', decimals: 0, label: 'Streams to earn $1,000' },
  { value: 70, suffix: '%', decimals: 0, label: 'Of revenue flows to three major labels' },
]

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduce) {
        gsap.set('.manifesto-word', { opacity: 1 })
        sectionRef.current
          ?.querySelectorAll<HTMLElement>('.stat-value')
          .forEach((el) => (el.textContent = el.dataset.final ?? ''))
        return
      }

      // Words brighten one by one as the reader scrolls through
      gsap.to('.manifesto-word', {
        opacity: 1,
        stagger: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.manifesto-copy',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 0.5,
        },
      })

      // Stat counters
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.stat-value')
        .forEach((el) => {
          const final = parseFloat(el.dataset.value ?? '0')
          const decimals = parseInt(el.dataset.decimals ?? '0', 10)
          const prefix = el.dataset.prefix ?? ''
          const suffix = el.dataset.suffix ?? ''
          const counter = { n: 0 }
          gsap.to(counter, {
            n: final,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            onUpdate: () => {
              el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`
            },
          })
        })

      gsap.from('.stat-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stat-grid', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-5 py-28 md:px-10 md:py-40"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[160px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-brand-light md:text-xs">
          <span className="h-px w-10 bg-brand/60" aria-hidden="true" />
          01 — The problem
        </div>

        <p className="manifesto-copy max-w-4xl font-display text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl md:leading-tight">
          {STATEMENT.split(' ').map((word, i) => (
            <span key={i} className="manifesto-word opacity-[0.12]">
              {word}{' '}
            </span>
          ))}
        </p>

        <div className="stat-grid mt-20 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card bg-ink p-8 md:p-10">
              <div
                className="stat-value font-display text-4xl font-bold tracking-tight text-brand-light md:text-5xl"
                data-value={stat.value}
                data-decimals={stat.decimals}
                data-prefix={stat.prefix ?? ''}
                data-suffix={stat.suffix ?? ''}
                data-final={`${stat.prefix ?? ''}${stat.value}${stat.suffix ?? ''}`}
              >
                {stat.prefix ?? ''}0{stat.suffix ?? ''}
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
          The streaming economy is designed to devalue your work. Subcult is
          infrastructure for the other way around — scenes, tastemakers, and
          money that flows directly to the people making the music.
        </p>
      </div>
    </section>
  )
}
