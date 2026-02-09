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
              href="/subcult"
              className="text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              What is a Subcult?
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
            What is SubCult?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Infrastructure for music communities.
          </p>
        </div>
      </Section>

      {/* The Core Idea */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6 text-white/80 text-base sm:text-lg leading-relaxed">
          <p>
            Think about how you actually discover music that sticks. Not the background noise, but the songs that become part of your life. Almost always, there&apos;s a person involved. A friend who knew you&apos;d love it. A DJ whose taste you trust. A radio host who&apos;s been doing this for years.
          </p>
          <p>
            That relationship—between the people who find music and the people who listen—is where culture actually happens. It&apos;s how sounds travel, how scenes form, how artists find their people. And right now, there&apos;s no good infrastructure for it online.
          </p>
          <p>
            SubCult is an attempt to build that infrastructure.
          </p>
        </div>
      </Section>

      {/* What We Do */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">What we&apos;re building</h2>
          <div className="text-white/80 space-y-6 text-base sm:text-lg leading-relaxed">
            <p>
              We let tastemakers create their own spaces—communities built around their taste and the artists they champion. These aren&apos;t playlists. They&apos;re living ecosystems where artists and listeners actually connect.
            </p>
            <p>
              When a listener supports an artist through SubCult, the money goes directly to them. Instantly. Globally. No waiting, no middlemen taking 30%. We use stablecoin payments, which means an artist in Lagos can get paid by a fan in Berlin without either of them needing a US bank account.
            </p>
            <p>
              And crucially—the people running these communities get paid too. The work of finding, championing, and contextualizing music has always been valuable. We&apos;re just building the infrastructure that finally recognizes it.
            </p>
          </div>
        </div>
      </Section>

      {/* Who It's For */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Who it&apos;s for</h2>
          <div className="text-white/80 space-y-6 text-base sm:text-lg leading-relaxed">
            <p>
              If you&apos;re a <strong className="text-white">DJ, radio host, label head, blogger, or promoter</strong>—you&apos;ve probably felt the frustration of doing work that matters but having no real way to sustain it. SubCult gives you the tools to build around your taste and actually capture value from it.
            </p>
            <p>
              If you&apos;re an <strong className="text-white">artist</strong>, you get direct connection to people who care about your work and listeners who want to support you. No more shouting into the void of social media algorithms.
            </p>
            <p>
              If you&apos;re a <strong className="text-white">listener</strong>, you get discovery that actually means something. Music chosen by people, not engagement metrics. Communities to be part of, not just content to consume.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Now */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Why this matters now</h2>
          <div className="text-white/80 space-y-6 text-base sm:text-lg leading-relaxed">
            <p>
              The current model isn&apos;t working. Artists can&apos;t make a living from streams. The people who find and champion music can&apos;t get paid at all. Listeners are drowning in infinite content but starving for actual connection.
            </p>
            <p>
              We think there&apos;s a better way. One where the people who make music and the people who champion it can actually build something sustainable. Where communities form around shared taste instead of algorithmic happenstance.
            </p>
            <p>
              We&apos;re early. We&apos;re still figuring things out. But we&apos;re building with the people who will use it, and we think that matters.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="text-center space-y-6">
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-lg font-medium bg-white text-black hover:bg-white/90 active:bg-white/80 transition-all min-h-[44px]"
            style={{ backgroundColor: 'white', color: 'black' }}
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
