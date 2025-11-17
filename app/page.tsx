'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import EmailForm from '@/components/EmailForm'
import MapSection from '@/components/MapSection'
import Section from '@/components/Section'
import GlobeIcon from '@/components/GlobeIcon'

export default function Home() {
  const mapSectionRef = useRef<HTMLDivElement>(null)

  const scrollToDemo = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]" style={{ touchAction: 'pan-y', overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Hero Section with Signup Form */}
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
        
        {/* Signup Section - Hero Content */}
        <Section id="signup" className="signup-section">
          <div className="signup-section__content">
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

            {/* Demo Button */}
            <button
              onClick={scrollToDemo}
              className="demo-button"
              aria-label="View demo map"
            >
              <GlobeIcon />
              <span className="demo-button__text">Explore the map</span>
            </button>

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
      </div>

      {/* Demo Section - Map */}
      <div ref={mapSectionRef} id="demo">
        <MapSection fullscreen />
      </div>

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

