import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'

export default function TechnicalPage() {
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
              href="/subcult"
              className="text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              What is a Subcult?
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
            How it Works
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            A working product. Here&apos;s what you can do with it.
          </p>
        </div>
      </Section>

      {/* The Core Loop */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">The core loop</h2>
          <div className="text-white/80 space-y-6 text-base sm:text-lg leading-relaxed">
            <p>
              Someone creates a subcult around a sound, a scene, or a geography. Artists apply to join and upload their music. The operator approves who gets in and surfaces what they think is worth hearing.
            </p>
            <p>
              Listeners find subcults through the people they trust. They stream, save tracks, follow artists, and pay them directly when they want to support the work.
            </p>
            <p>
              Artists get exposure and revenue. Operators build an audience around their taste. Good taste attracts better artists, which attracts more listeners, which validates the operator&apos;s reputation. The flywheel spins.
            </p>
            <p>
              This is how scenes work in real life. SubCult just gives it infrastructure.
            </p>
          </div>
        </div>
      </Section>

      {/* For Listeners */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">For listeners</h2>
          <div className="text-white/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              Browse subcults by location or genre. Stream tracks and mixes—some free, some paid. Save what you like to your library. Follow artists and whole subcults to get notified when new music drops.
            </p>
            <p>
              Create playlists—public, private, or collaborative. Leave comments on artist profiles. Send messages to other users. When you want to support an artist, you pay them directly. No middlemen, no platform cut. The money lands in their wallet instantly.
            </p>
          </div>
        </div>
      </Section>

      {/* For Artists */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">For artists</h2>
          <div className="text-white/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              Upload tracks and DJ mixes with full metadata—BPM, genre, descriptions. Set your own pricing: free streaming, paid streaming, paid downloads, or turn it off entirely. Control who sees what: public, subcult-only, or private.
            </p>
            <p>
              Join subcults to get your music distributed through trusted channels. Go live with broadcast streaming if you want to perform. Submit tracks to curated playlists.
            </p>
            <p>
              When someone pays you, the money goes directly to your wallet. No payout thresholds. No waiting periods. No 30% cut to a platform. Just peer-to-peer payments, instant and global.
            </p>
          </div>
        </div>
      </Section>

      {/* For Curators */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">For operators</h2>
          <div className="text-white/80 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              Create a subcult around your scene, your genre, your taste. Set the guidelines for what belongs and what doesn&apos;t. Approve or reject artists who apply. Feature tracks and mixes you think people should hear.
            </p>
            <p>
              Build playlists that accept submissions from artists. Broadcast live to your community. Build an audience around taste, not just your personal output.
            </p>
            <p>
              You can also bring in contributors—people who help run things without taking on full operator responsibility. It&apos;s your space to run how you want.
            </p>
          </div>
        </div>
      </Section>

      {/* Payments */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">How payments work</h2>
          <div className="text-white/80 space-y-6 text-base sm:text-lg leading-relaxed">
            <p>
              We use stablecoin payments. Low fees, fast settlement, works anywhere in the world.
            </p>
            <p>
              When a listener pays for a stream, buys a download, or tips an artist, the money transfers directly to the artist&apos;s wallet. No waiting. No minimum payout. An artist in Lagos can get paid by a listener in Berlin without either of them needing a US bank account.
            </p>
            <p>
              The goal is to keep as much value as possible flowing to the people making and championing the music.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="max-w-3xl mx-auto border-t border-white/10">
        <div className="text-center space-y-6">
          <p className="text-white/80 text-base sm:text-lg">
            The core loop works. Now we&apos;re figuring out which scenes, which operators, which communities to build with first.
          </p>
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
