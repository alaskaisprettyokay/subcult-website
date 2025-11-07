'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import EmailForm from '@/components/EmailForm'
import MapSection from '@/components/MapSection'
import Section from '@/components/Section'
import clsx from 'clsx'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calculate progress: 0 at top, 1 after scrolling one viewport height
      const progress = Math.min(1, scrollY / windowHeight)
      setScrollProgress(progress)
    }

    // Initial call to set scroll progress
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])


  // Signup form fades in after scrolling past map (starts fading at progress 0.7)
  const signupOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.7) * 3))

  return (
    <main className="min-h-screen">
      {/* Hero Section with Map as main landing */}
      <div className="hero">
        {/* Small logo at top center */}
        <div className="hero__logo hero__logo--center">
          <Image
            src="/subcult-vector.png"
            alt="Subcult"
            width={120}
            height={120}
            className="w-auto h-auto max-w-[120px] object-contain opacity-90"
            priority
          />
        </div>
        
        {/* SUBCULT.png at top right */}
        <div className="hero__logo hero__logo--right">
          <Image
            src="/SUBCULT.png"
            alt="Subcult"
            width={200}
            height={60}
            className="w-auto h-auto max-w-[200px] object-contain opacity-90"
            priority
          />
        </div>
        
        {/* Map - main landing element, fully visible */}
        <div className="absolute inset-0 z-10">
          <MapSection fullscreen />
        </div>
      </div>
      
      {/* Spacer to allow scrolling */}
      <div className="h-screen" />

      {/* Signup Section - appears after scrolling */}
      <Section className="signup-section">
        <div 
          className="signup-section__content"
          style={{ opacity: signupOpacity }}
        >
          <div className="signup-section__header">
            <h1 className="signup-section__title">
              Subcult
            </h1>
            <p className="signup-section__subtitle">
              Discover and support underground music communities around the world.
            </p>
          </div>

          <div className="signup-section__form">
            <EmailForm />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/about"
              className="inline-block text-white/60 hover:text-white/80 text-sm underline transition-colors"
            >
              What is Subcult?
            </Link>
            <Link
              href="/technical"
              className="inline-block text-white/60 hover:text-white/80 text-sm underline transition-colors"
            >
              Technical Solutions
            </Link>
          </div>
        </div>
      </Section>

      {/* Explainer Section */}
      <Section id="explainer" className="border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Find and support the local underground music communities
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Subcult connects artists, venues, and fans in underground music communities
            around the world. We're building tools for scenes to thrive independently,
            creating sustainable systems where local culture can flourish.
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__links">
            <a href="#" className="footer__link">
              Terms
            </a>
            <a href="#" className="footer__link">
              Privacy
            </a>
            <a href="#" className="footer__link">
              Contact
            </a>
          </div>
          <div>© {new Date().getFullYear()} Subcult</div>
        </div>
      </footer>
    </main>
  )
}

