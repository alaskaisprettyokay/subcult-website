'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { User, Disc, MapPin, Globe, Music } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TYPES = [
  {
    icon: User,
    title: 'A single person',
    copy: "With strong taste. A DJ, a radio host, a blogger — anyone who's built trust by consistently surfacing good music.",
  },
  {
    icon: Disc,
    title: 'A label or collective',
    copy: 'With a clear identity. The releases, the roster, the events — all under one roof.',
  },
  {
    icon: MapPin,
    title: 'A local scene',
    copy: 'Rooted in a city or neighborhood. The artists, DJs, and listeners who show up week after week.',
  },
  {
    icon: Globe,
    title: 'A diasporic community',
    copy: 'Scattered across the world but connected by sound. People who share a cultural background and the music that comes from it.',
  },
  {
    icon: Music,
    title: 'A genre-based space',
    copy: 'That crosses geographic boundaries. The global network of people obsessed with the same niche sound.',
  },
]

// Desktop: section pins and the card track scrolls horizontally.
// Mobile / reduced motion: a simple vertical stack.
export default function TypesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const track = trackRef.current
          if (!track) return
          const distance = track.scrollWidth - window.innerWidth

          gsap.to(track, {
            x: -distance,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${distance}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
        }
      )

      mm.add(
        '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.utils.toArray<HTMLElement>('.type-card').forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 40,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            })
          })
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="subcults"
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="px-5 md:px-10 lg:absolute lg:top-16 lg:z-10">
        <div className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400 md:text-xs">
          <span className="h-px w-10 bg-white/30" aria-hidden="true" />
          03 — What is a Subcult
        </div>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          A subcult can be <span className="text-gray-500">many things.</span>
        </h2>
        <p className="mt-4 max-w-xl text-gray-400">
          But it&apos;s always built around someone with taste — and the trust
          that comes from consistently surfacing good music.
        </p>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex flex-col gap-5 px-5 md:px-10 lg:mt-44 lg:w-max lg:flex-row lg:gap-8 lg:pr-[40vw]"
      >
        {TYPES.map((t, i) => (
          <article
            key={i}
            className="type-card hover-card flex flex-col justify-between border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10 lg:h-[420px] lg:w-[420px] lg:shrink-0"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center border border-white/15 bg-white/[0.06]">
                  <t.icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-display text-5xl font-bold text-white/10">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold text-white">
                {t.title}
              </h3>
              <p className="mt-4 leading-relaxed text-gray-400">{t.copy}</p>
            </div>
            <span className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-gray-600">
              Subcult type
            </span>
          </article>
        ))}

        {/* Closing card */}
        <article className="type-card flex flex-col justify-center border border-white/30 bg-white/[0.05] p-8 md:p-10 lg:h-[420px] lg:w-[480px] lg:shrink-0">
          <p className="font-display text-xl font-bold leading-snug text-white md:text-2xl">
            Each subcult is unique, but they all share something: they&apos;re
            spaces where the relationship between tastemaker and audience can
            actually thrive.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-gray-300">
            Where good music gets the attention it deserves — and where that
            attention translates into sustainable support for artists.
          </p>
        </article>
      </div>
    </section>
  )
}
