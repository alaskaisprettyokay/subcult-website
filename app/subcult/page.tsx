import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'

export default function SubcultPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header with logo */}
      <header className="relative py-4 sm:py-6 px-4 border-b border-white/10 bg-[#0a0a0a]" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center min-h-[44px]">
            <Image
              src="/subcult-vector.png"
              alt="Subcult"
              width={80}
              height={80}
              className="w-auto h-auto max-w-[60px] sm:max-w-[80px] object-contain opacity-90"
              sizes="(max-width: 640px) 60px, 80px"
            />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/about"
              className="text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              What is SubCult?
            </Link>
            <Link
              href="/technical"
              className="text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              How it Works
            </Link>
            <Link
              href="/"
              className="text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section className="max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            What is a Subcult?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            We&apos;re proposing a new unit of music culture.
          </p>
        </div>
      </Section>

      {/* Definition */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6 text-white/80 text-base sm:text-lg leading-relaxed">
          <p>
            We&apos;re trying to name something that already exists but doesn&apos;t have good infrastructure online.
          </p>
          <p>
            You already follow these, even if you&apos;ve never called them subcults. The DJ whose sets always hit. The label whose releases you check without question. The radio host who plays things you&apos;ve never heard but instantly love. The collective that throws the parties you never miss.
          </p>
          <p>
            A subcult is a space built around shared taste. It can be run by a single person or a collective—what matters is the point of view. These are where music actually happens. Not on platforms with infinite content—through specific people with specific taste.
          </p>
        </div>
      </Section>

      {/* What it looks like */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">What a subcult might be</h2>
          <div className="text-white/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              A <strong className="text-white">single person</strong> with strong taste. A DJ, a radio host, a blogger—anyone who&apos;s built trust by consistently surfacing good music.
            </p>
            <p>
              A <strong className="text-white">label or collective</strong> with a clear identity. The releases, the roster, the events—all under one roof.
            </p>
            <p>
              A <strong className="text-white">local scene</strong> rooted in a city or neighborhood. The artists, DJs, and listeners who show up week after week.
            </p>
            <p>
              A <strong className="text-white">diasporic community</strong> scattered across the world but connected by sound. People who share a cultural background and the music that comes from it.
            </p>
            <p>
              A <strong className="text-white">genre-based space</strong> that crosses geographic boundaries. The global network of people obsessed with the same niche sound.
            </p>
            <p>
              What matters isn&apos;t scale or structure—it&apos;s coherence. A clear point of view about what belongs.
            </p>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">How it works on SubCult</h2>
          <div className="text-white/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              An individual or collective creates a subcult and becomes its operator. They set the tone—what belongs, what doesn&apos;t, who gets in. They approve artists who want to join and surface the music they think is worth hearing.
            </p>
            <p>
              Artists upload their tracks and mixes. Listeners discover them through the subcult. When they want to support an artist, they pay them directly.
            </p>
            <p>
              The operator—whether one person or a team—builds an audience around their taste. Not by making content, but by having good judgment about music and building a space where that judgment matters.
            </p>
            <p>
              It&apos;s not a playlist. It&apos;s a living space with its own identity, its own artists, its own audience.
            </p>
          </div>
        </div>
      </Section>

      {/* Why it matters */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">This is an experiment</h2>
          <div className="text-white/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              We&apos;re proposing &quot;subcult&quot; as a cultural unit. We don&apos;t know the exact shape yet—we&apos;re building with the people who will use it.
            </p>
            <p>
              What we do know: platforms treat music as content. Infinite, interchangeable, sorted by algorithm. But that&apos;s not how people actually connect with music that matters to them.
            </p>
            <p>
              The music that sticks comes through people. Through trust. Through communities that have their own taste, their own standards, their own way of recognizing what&apos;s good.
            </p>
            <p>
              A subcult is an attempt to give that structure. To make the communities that already exist visible and sustainable. To let them operate on their own terms instead of being flattened into a feed.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="text-center space-y-6">
          <p className="text-white/80 text-base sm:text-lg">
            Want to start a subcult? We&apos;re onboarding operators now.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-lg font-medium bg-white text-black hover:bg-white/90 active:bg-white/80 transition-all min-h-[44px]"
          >
            Join the waitlist
          </Link>
        </div>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__links">
            <Link href="#" className="footer__link">
              Terms
            </Link>
            <Link href="#" className="footer__link">
              Privacy
            </Link>
            <Link href="#" className="footer__link">
              Contact
            </Link>
          </div>
          <div>© {new Date().getFullYear()} Subcult</div>
        </div>
      </footer>
    </main>
  )
}
