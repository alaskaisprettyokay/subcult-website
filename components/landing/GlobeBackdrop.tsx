'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlobeScene from './GlobeScene'

gsap.registerPlugin(ScrollTrigger)

// Backdrop that spans the hero + marquee + manifesto. The globe stays pinned
// behind the content (fixed layer — position:sticky is defeated by the
// overflow-x:hidden on <body>), slowly receding as the reader scrolls:
// shrinking, drifting aside and dimming, then dissolving entirely.
export default function GlobeBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    setReduce(prefersReduced)

    const ctx = gsap.context(() => {
      // Entrance
      gsap.to('.globe-rig', {
        opacity: 1,
        duration: prefersReduced ? 0 : 2,
        ease: 'power2.inOut',
      })

      if (prefersReduced) return

      const mm = gsap.matchMedia()

      const recede = (xPercent: number) => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom 75%',
            scrub: 1,
            // Free the compositor (and pause the render loop via the
            // IntersectionObserver in GlobeScene) once fully dissolved
            onLeave: () => gsap.set('.globe-layer', { display: 'none' }),
            onEnterBack: () => gsap.set('.globe-layer', { display: 'block' }),
          },
        })
        // Recede for the first two thirds of the journey…
        tl.to(
          '.globe-rig',
          { scale: 0.55, xPercent, yPercent: -4, duration: 0.65 },
          0
        )
          .to('.globe-rig', { opacity: 0.4, duration: 0.65 }, 0)
          // …then dissolve at the very end
          .to(
            '.globe-rig',
            { opacity: 0, scale: 0.45, ease: 'power1.in', duration: 0.35 },
            0.65
          )
      }

      // Desktop: drift toward the right margin. Mobile: recede in place.
      mm.add('(min-width: 768px)', () => recede(26))
      mm.add('(max-width: 767px)', () => recede(0))
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div
        className={`globe-layer ${
          reduce ? 'absolute inset-x-0 top-0' : 'fixed inset-0'
        } h-screen overflow-hidden`}
      >
        <div className="globe-rig absolute inset-0 opacity-0 will-change-transform">
          <GlobeScene />
          {/* Legibility vignette rides along so it fades with the globe */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.55)_75%)]" />
        </div>
      </div>
    </div>
  )
}
