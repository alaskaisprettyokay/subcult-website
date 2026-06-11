'use client'

import { useEffect, useState } from 'react'
import GeometricLogo from '../GeometricLogo'

const LINKS = [
  ['About', 'about'],
  ['Subcults', 'subcults'],
  ['How it works', 'how-it-works'],
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3"
          aria-label="Subcult — back to top"
        >
          <div className="h-8 w-8 text-brand-light">
            <GeometricLogo className="h-full w-full" />
          </div>
          <span className="font-clash text-sm font-semibold uppercase tracking-[0.35em] text-white">
            Subcult
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('join')}
          className="border border-brand/60 bg-brand/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-light transition-all duration-300 hover:bg-brand hover:text-white"
        >
          Join
        </button>
      </nav>
    </header>
  )
}
