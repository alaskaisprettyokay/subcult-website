import SmoothScroll from '../components/landing/SmoothScroll'
import Nav from '../components/landing/Nav'
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
      <Hero />
      <Marquee />
      <ManifestoSection />
      <AboutSection />
      <TypesSection />
      <HowItWorksSection />
      <Marquee reverse />
      <CTASection />
      <Footer />
    </main>
  )
}
