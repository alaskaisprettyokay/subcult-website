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


  // Signup form fades in after scrolling past map (starts fading at progress 0.5 for faster appearance)
  const signupOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 2))

  return (
    <main className="min-h-screen bg-[#0a0a0a]" style={{ touchAction: 'pan-y', overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Hero Section with Map as main landing */}
      <div className="hero">
        {/* Small logo at top center */}
        <div className="hero__logo hero__logo--center">
          <Image
            src="/subcult-vector.png"
            alt="Subcult"
            width={120}
            height={120}
            className="w-auto h-auto max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] object-contain opacity-90"
            priority
            sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
          />
        </div>
        
        {/* SUBCULT.png at top right */}
        <div className="hero__logo hero__logo--right">
          <Image
            src="/SUBCULT.png"
            alt="Subcult"
            width={200}
            height={60}
            className="w-auto h-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] lg:max-w-[200px] object-contain opacity-90"
            priority
            sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 180px, 200px"
          />
        </div>
        
        {/* Map - main landing element, fully visible */}
        <div className="absolute inset-0 z-10">
          <MapSection fullscreen />
        </div>
      </div>
      
      {/* Spacer to allow scrolling - reduced for better UX */}
      <div className="h-[20vh] sm:h-[30vh]" />

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

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4">
            <Link
              href="/about"
              className="inline-block text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              What is Subcult?
            </Link>
            <Link
              href="/technical"
              className="inline-block text-white/60 hover:text-white/80 active:text-white text-sm sm:text-base underline transition-colors min-h-[44px] flex items-center"
            >
              Technical Solutions
            </Link>
          </div>
        </div>
      </Section>

      {/* Explainer Section */}
      <Section id="explainer" className="border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Find and support the local underground music communities
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Subcult connects artists, venues, and fans in underground music communities
            around the world. We&apos;re building tools for scenes to thrive independently,
            creating sustainable systems where local culture can flourish.
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__links">
            <a href="#" className="footer__link min-h-[44px] flex items-center">
              Terms
            </a>
            <a href="#" className="footer__link min-h-[44px] flex items-center">
              Privacy
            </a>
            <a href="#" className="footer__link min-h-[44px] flex items-center">
              Contact
            </a>
          </div>
          <div className="text-xs sm:text-sm">© {new Date().getFullYear()} Subcult</div>
        </div>
      </footer>
    </main>
  )
}

