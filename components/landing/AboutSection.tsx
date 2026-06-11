'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Radio, Mic2, Headphones } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const AUDIENCES = [
  {
    icon: Radio,
    title: 'Tastemakers',
    copy: 'DJs, radio hosts, label heads, bloggers, promoters — build around your taste and capture value from it.',
  },
  {
    icon: Mic2,
    title: 'Artists',
    copy: 'Direct connection to people who care about your work. No more shouting into the void of algorithms.',
  },
  {
    icon: Headphones,
    title: 'Listeners',
    copy: 'Discovery that actually means something. Music chosen by people, not engagement metrics.',
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="about-reveal mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400 md:text-xs">
          <span className="h-px w-10 bg-white/30" aria-hidden="true" />
          02 — What is Subcult
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="about-reveal">
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              Infrastructure for{' '}
              <span className="text-gray-500">music communities.</span>
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-gray-400 md:text-lg">
            <p className="about-reveal">
              Think about how you actually discover music that sticks. Not the
              background noise, but the songs that become part of your life.
              Almost always, there&apos;s a person involved. A friend who knew
              you&apos;d love it. A DJ whose taste you trust. A radio host
              who&apos;s been doing this for years.
            </p>
            <p className="about-reveal">
              That relationship — between the people who find music and the
              people who listen — is where culture actually happens. It&apos;s
              how sounds travel, how scenes form, how artists find their
              people. And right now, there&apos;s no good infrastructure for it
              online.
            </p>
          </div>
        </div>

        <div className="about-reveal mt-20 border border-white/20 bg-white/[0.04] p-8 md:p-12">
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            What we&apos;re building
          </h3>
          <div className="mt-6 grid gap-6 text-gray-400 md:grid-cols-2 md:gap-10">
            <p className="leading-relaxed">
              We let tastemakers create their own spaces — communities built
              around their taste and the artists they champion. These
              aren&apos;t playlists. They&apos;re living ecosystems where
              artists and listeners actually connect.
            </p>
            <p className="leading-relaxed">
              When a listener supports an artist through Subcult, the money
              goes directly to them. Instantly. Globally. No waiting, no
              middlemen taking 30%. An artist in Lagos can get paid by a fan in
              Berlin without either of them needing a US bank account.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="about-reveal font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500 md:text-xs">
            Who it&apos;s for
          </h3>
          <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {AUDIENCES.map((a, i) => (
              <div
                key={i}
                className="about-reveal hover-card group bg-ink p-8 md:p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-white/15 bg-white/[0.06] transition-colors duration-300 group-hover:bg-white/15">
                  <a.icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="mt-6 font-display text-xl font-bold text-white">
                  {a.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {a.copy}
                </p>
                <span className="mt-6 block font-mono text-[10px] uppercase tracking-[0.25em] text-gray-600">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-reveal mt-20 max-w-3xl">
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Why this matters now
          </h3>
          <p className="mt-5 leading-relaxed text-gray-400">
            The current model isn&apos;t working. Artists can&apos;t make a
            living from streams. The people who find and champion music
            can&apos;t get paid at all. Listeners are drowning in infinite
            content but starving for actual connection. We think there&apos;s a
            better way — one where the people who make music and the people who
            champion it can actually build something sustainable.
          </p>
        </div>
      </div>
    </section>
  )
}
