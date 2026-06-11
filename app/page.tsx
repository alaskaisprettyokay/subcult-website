import SmoothScroll from '../components/landing/SmoothScroll'
import Nav from '../components/landing/Nav'
import GlobeBackdrop from '../components/landing/GlobeBackdrop'
import Hero from '../components/landing/Hero'
import Marquee from '../components/landing/Marquee'
import ManifestoSection from '../components/landing/ManifestoSection'
import AboutSection from '../components/landing/AboutSection'
import TypesSection from '../components/landing/TypesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

export default function Home() {
  return (
    <main className="grain relative min-h-screen bg-ink text-white">
      <SmoothScroll />
      <Nav />
      {/* The globe backdrop stays pinned behind these first three sections,
          receding as the reader scrolls */}
      <div className="relative">
        <GlobeBackdrop />
        <Hero />
        <Marquee />
        <ManifestoSection />
      </div>
      <AboutSection />
      <TypesSection />
      <HowItWorksSection />
      <Marquee reverse />
      <CTASection />
      <Footer />
    </main>
  )
}
