import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'

export default function AboutPage() {
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
              href="/technical"
              className="text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              Technical
            </Link>
            <Link
              href="/"
              className="text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Manifesto Section */}
      <Section className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              What is Subcult?
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70">
              A manifesto for underground music communities
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Our Vision</h2>
              <p className="text-white/80">
                To connect the underground and local music communities. Create a home for artists, venues, scenes, fans,
                and curators to connect and share with each other.
                We&apos;re building a map of the underground: a network of trust, discovery, and creative autonomy.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">The Problem</h2>
              <p className="text-white/80">
                Underground music scenes are scattered.
                Algorithms bury them, platforms flatten them, and cities push them out.
                Most artists and crews operate in isolation — their reach limited, their work undervalued, their community invisible online.
                The spaces that once held these scenes together — the flyers, zines, forums, and radio — have been replaced by systems that monetize attention instead of meaning.
                <br /><br />
                The result: culture gets lost in the noise.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Our Solution</h2>
              <p className="text-white/80">
                Subcult rebuilds the connective tissue of the underground.
                It&apos;s not a social network — it&apos;s a discovery layer for local scenes.
                Artists, collectives, and curators can share events, releases, and ideas in ways that stay true to their identity.
                Each scene defines its own space, visual language, and membership.
                <br /><br />
                Instead of chasing followers, Subcult celebrates presence:
                Who&apos;s around you.
                Who&apos;s playing.
                Who&apos;s building something real.
                <br /><br />
                It&apos;s a tool for connection — and a signal for where culture is actually happening.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">The Manifesto</h2>
              <div className="space-y-4 text-white/80">
                <ol className="list-decimal list-inside space-y-4 ml-4">
                  <li>
                    <strong>We believe in the underground.</strong>
                    <br />
                    Not as nostalgia — but as a living network of resistance, creativity, and self-expression.
                  </li>
                  <li>
                    <strong>We believe culture belongs to those who create it.</strong>
                    <br />
                    Platforms don&apos;t make communities — people do.
                  </li>
                  <li>
                    <strong>We believe in connection without compromise.</strong>
                    <br />
                    Every scene is its own world. Subcult helps them find each other, not merge into one.
                  </li>
                  <li>
                    <strong>We believe discovery should feel human.</strong>
                    <br />
                    No algorithms, no feeds — just proximity, trust, and curiosity.
                  </li>
                  <li>
                    <strong>We believe in sound as a signal.</strong>
                    <br />
                    Music isn&apos;t content — it&apos;s how we recognize one another across borders.
                  </li>
                </ol>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Join Us</h2>
              <p className="text-white/80">
              Subcult is opening the door to the next generation of underground culture.
              Join the waitlist, become a curator, or help map your local scene.
              This is where the underground connects.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 rounded-lg font-medium bg-white text-black hover:bg-white/90 active:bg-white/80 transition-all min-h-[44px] flex items-center justify-center"
                >
                  Join the waitlist
                </Link>
              </div>
            </div>
          </div>
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

