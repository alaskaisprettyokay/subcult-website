import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/Section'

export default function TechnicalPage() {
  return (
    <main className="min-h-screen">
      {/* Header with logo */}
      <header className="relative py-6 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/subcult-vector.png"
              alt="Subcult"
              width={80}
              height={80}
              className="w-auto h-auto max-w-[80px] object-contain opacity-90"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-white/60 hover:text-white/80 text-sm underline transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-white/60 hover:text-white/80 text-sm underline transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Technical Solutions Section */}
      <Section className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Technical Solutions
            </h1>
            <p className="text-xl text-white/70">
              How we&apos;re building the infrastructure for underground communities
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Architecture Overview</h2>
              <p className="text-white/80">
                Subcult is built like the communities it serves — distributed, lightweight, and resilient.
                It&apos;s a digital framework that connects local scenes and niche subgenres without relying on a single central platform.
                Each part of the system — from maps to profiles to audio rooms — is designed to be independent yet connected, so communities can thrive on their own terms.
                It scales naturally as more scenes appear and connect, just like the underground itself.
                <br /><br />
                <strong>All tools are open source.</strong> The code, infrastructure, and protocols are publicly available, 
                allowing communities to understand, modify, and extend the platform to fit their needs. 
                This transparency ensures that Subcult remains a tool for the community, by the community.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Core Features</h2>
              <div className="space-y-6 text-white/80">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Discovery & Mapping</h3>
                  <p>
                    Subcult is a living map of the underground.
                    When you open the app, you see nearby scenes, collectives, and events — all mapped visually.
                    You can zoom into your city or explore other regions.
                    Everything is searchable by vibe, genre, and connection: from techno basements to experimental sound labs.
                    It learns what matters to you based on proximity and trust, not algorithms.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Scene Management</h3>
                  <p>
                    Every collective, label, or DIY space can create its own scene inside Subcult.
                    Each scene controls its look, tone, and membership — from open communities to invite-only circles.
                    Curators can define visuals, color palettes, and who gets to join or post.
                    Each scene feels like its own world — Subcult just connects them together.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Event & Content Sharing</h3>
                  <p>
                    Events, mixes, releases, and zines are all shared directly inside scenes.
                    You can announce a party, stream a set, or post a flyer — and your audience sees it instantly.
                    People nearby get updates in real time when something's happening.
                    Everything is designed to flow naturally between local audiences and connected scenes.
                    <br /><br />
                    <strong>Streaming is built on peer-to-peer (P2P) infrastructure.</strong> 
                    Live sets and audio streams are distributed directly between participants, 
                    reducing server costs and keeping the network decentralized. 
                    This means lower latency, better quality, and true independence from centralized streaming services.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Community Tools</h3>
                  <p>
                    Subcult is built around conversation and collaboration.
                    Scenes have chat spaces, pinned updates, and shared resources.
                    You can plan an event, share a mix, or coordinate a pop-up with your crew.
                    It&apos;s not about followers — it&apos;s about real connection between artists, organizers, and listeners.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Technology Stack</h2>
              <div className="space-y-6 text-white/80">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Frontend</h3>
                  <p>
                    The interface is designed to feel like a mix of a map, a radio, and a zine.
                    It's built with modern web tools that make it fast, smooth, and accessible on any device.
                    The map and sound layers are dynamic, loading local activity as you move.
                    The design language is clean, dark, and futuristic — inspired by club posters and underground flyers.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Backend</h3>
                  <p>
                    Behind the scenes, Subcult runs a network that keeps everything fast, private, and secure.
                    Scenes store their own data safely, and content loads from nearby servers so it feels instant.
                    The system is modular — if one part goes down, the rest keeps working.
                    It's built to handle bursts of traffic (like when an event drops) without slowing down.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Infrastructure</h3>
                  <p>
                    Subcult runs on a mix of cloud hosting and distributed storage.
                    That means reliability and speed without a single point of failure.
                    Media (like event posters and live sets) are delivered through global servers for fast access anywhere.
                    Backups, monitoring, and safety checks keep the network stable for everyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Data & Privacy</h2>
              <p className="text-white/80">
                Subcult values privacy as much as creativity.
                Location data is optional and only shared when you choose to.
                Personal info is never sold or tracked for ads — period.
                Each scene manages its own members, and you can delete your data or account anytime.
                It's about connection, not surveillance.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Financial Independence</h2>
              <p className="text-white/80">
                <strong>Finances are managed directly by the subcult themselves.</strong>
                Each scene controls its own revenue, payments, and financial operations.
                Whether it's event ticket sales, merchandise, or community funding, 
                the money flows directly to the organizers and artists — no platform takes a cut.
                This ensures that value stays within the community and supports the scenes that create it.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">API & Integrations</h2>
              <p className="text-white/80">
                Subcult connects with the tools artists already use — from streaming platforms to calendars.
                You can embed a mix, link to a release, or publish your Subcult events elsewhere.
                Developers and collectives can use open tools to build new interfaces or integrations that fit their needs.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Future Development</h2>
              <p className="text-white/80 mb-4">
                Subcult will evolve as the underground does.
                Coming features include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-white/80">
                <li>A genre spectrum — a visual way to explore subgenres and micro-scenes.</li>
                <li>Offline mode — explore scenes and events when traveling without connection.</li>
                <li>Scene alliances — link communities across cities.</li>
                <li>Creator grants and support tools to help sustain collectives.</li>
                <li>Experimental radio nodes to broadcast live sets across connected spaces.</li>
              </ul>
              <p className="text-white/80 mt-4">
                Subcult grows as the community grows — it's built to expand with every new sound that emerges.
              </p>
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

