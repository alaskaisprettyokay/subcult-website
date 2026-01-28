'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import our new components
import AnimatedBackground from '@/components/AnimatedBackground'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import WhatIsSubcultSection from '@/components/WhatIsSubcultSection'
import SubcultConceptSection from '@/components/SubcultConceptSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import ExploreScenesSection from '@/components/ExploreScenesSection'
import Footer from '@/components/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh()
  }, [])

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white relative">
      {/* Animated particle background */}
      <AnimatedBackground />

      {/* Sticky navigation (appears on scroll) */}
      <Navigation />

      {/* Hero section with email signup */}
      <HeroSection />

      {/* Content sections */}
      <WhatIsSubcultSection />
      <SubcultConceptSection />
      <HowItWorksSection />
      <ExploreScenesSection />
      <Footer />
    </main>
  )
}