'use client'

import GeometricLogo from '../GeometricLogo'

const NAV = [
  ['What is Subcult', 'about'],
  ['What is a Subcult', 'subcults'],
  ['How it works', 'how-it-works'],
  ['Join', 'join'],
] as const

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 px-5 py-14 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 text-white">
            <GeometricLogo className="h-full w-full" />
          </div>
          <span className="font-clash text-sm font-semibold uppercase tracking-[0.35em] text-white">
            Subcult
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {NAV.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-white"
            >
              {label}
            </button>
          ))}
        </nav>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-600">
          © 2026 Subcult
        </p>
      </div>
    </footer>
  )
}
