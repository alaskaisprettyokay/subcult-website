'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Headphones, Mic2, Building2, Wallet } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const LOOP = [
  {
    title: 'Create',
    copy: 'Someone opens a subcult around a sound, a scene, or a city.',
  },
  {
    title: 'Curate',
    copy: 'Artists apply to join. The operator decides what belongs and surfaces what deserves to be heard.',
  },
  {
    title: 'Listen',
    copy: 'Listeners find subcults through people they trust — stream, save, follow.',
  },
  {
    title: 'Support',
    copy: 'Money flows directly to artists. Instant, global, no middlemen.',
  },
]

const ROLES = [
  {
    icon: Headphones,
    title: 'For listeners',
    items: [
      'Browse subcults by location or genre',
      'Stream tracks and mixes — some free, some paid',
      'Save, follow, and build playlists',
      'Pay artists directly — no platform cut',
    ],
  },
  {
    icon: Mic2,
    title: 'For artists',
    items: [
      'Upload tracks and DJ mixes, set your own pricing',
      'Join subcults and get distributed through trusted channels',
      'Go live with broadcast streaming',
      'No payout thresholds, no waiting periods, no 30% cut',
    ],
  },
  {
    icon: Building2,
    title: 'For operators',
    items: [
      'Create a subcult around your scene, genre, or taste',
      'Approve artists and feature what people should hear',
      'Broadcast live to your community',
      'Build an audience around taste, not just personal output',
    ],
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray<HTMLElement>('.how-reveal').forEach((el) => {
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
      id="how-it-works"
      ref={sectionRef}
      className="relative px-5 py-28 md:px-10 md:py-40"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[700px] rounded-full bg-white/[0.03] blur-[160px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="how-reveal mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400 md:text-xs">
          <span className="h-px w-10 bg-white/30" aria-hidden="true" />
          04 — How it works
        </div>

        <h2 className="how-reveal max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          A working product.{' '}
          <span className="text-gray-500">Here&apos;s the loop.</span>
        </h2>

        {/* The core loop */}
        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {LOOP.map((step, i) => (
            <div key={i} className="how-reveal group bg-ink p-8">
              <span className="font-display text-5xl font-bold text-white/25 transition-colors duration-300 group-hover:text-white">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {step.copy}
              </p>
            </div>
          ))}
        </div>

        <p className="how-reveal mt-10 max-w-2xl text-gray-400">
          Good taste attracts better artists, which attracts more listeners,
          which validates the operator&apos;s reputation. The flywheel spins.{' '}
          <span className="text-white">
            This is how scenes work in real life — Subcult just gives it
            infrastructure.
          </span>
        </p>

        {/* Roles */}
        <div className="mt-24 grid gap-10 lg:grid-cols-3">
          {ROLES.map((role, i) => (
            <div key={i} className="how-reveal">
              <div className="flex items-center gap-3 border-b border-white/20 pb-4">
                <role.icon className="h-5 w-5 text-white" />
                <h3 className="font-display text-lg font-bold text-white">
                  {role.title}
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {role.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-sm leading-relaxed text-gray-400"
                  >
                    <span className="mt-0.5 font-mono text-[10px] text-gray-500">
                      0{j + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payments */}
        <div className="how-reveal mt-24 border border-white/20 bg-white/[0.04] p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Wallet className="h-6 w-6 text-white" />
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
              How payments work
            </h3>
          </div>
          <div className="mt-6 grid gap-6 text-gray-300 md:grid-cols-2 md:gap-10">
            <p className="leading-relaxed">
              We use stablecoin payments. Low fees, fast settlement, works
              anywhere in the world. When a listener pays for a stream, buys a
              download, or tips an artist, the money transfers directly to the
              artist&apos;s wallet. No waiting. No minimum payout.
            </p>
            <p className="leading-relaxed">
              An artist in Lagos can get paid by a listener in Berlin without
              either of them needing a US bank account.{' '}
              <span className="font-medium text-white">
                The goal is to keep as much value as possible flowing to the
                people making and championing the music.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
