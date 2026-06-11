'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

// Email capture wired to /api/email/subscribe. Used in the hero and the
// closing CTA — `id` keeps input ids unique across instances.
export default function SignupForm({ id = 'hero' }: { id?: string }) {
  const [userType, setUserType] = useState<'listener' | 'curator'>('listener')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          userType,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('Welcome! Check your email for confirmation.')
        setEmail('')
      } else if (result.error === 'ALREADY_SUBSCRIBED') {
        setMessage("You're already on the list!")
      } else {
        setMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setMessage('Network error. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="w-full max-w-md">
      <div
        className="mb-4 inline-flex border border-white/10 bg-white/[0.03] p-1"
        role="tablist"
        aria-label="I am a"
      >
        {(
          [
            ['listener', 'Listener'],
            ['curator', 'Curator / Artist'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={userType === value}
            onClick={() => setUserType(value)}
            className={`px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
              userType === value
                ? 'bg-brand text-white'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex border border-white/15 bg-white/[0.03] backdrop-blur-sm transition-colors focus-within:border-brand-light/60">
          <label htmlFor={`email-${id}`} className="sr-only">
            Email address
          </label>
          <input
            id={`email-${id}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isSubmitting}
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent px-5 py-4 text-base text-white placeholder:text-gray-600 focus:outline-none disabled:opacity-50"
            style={{ boxShadow: 'none' }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex shrink-0 items-center gap-2 bg-white px-5 py-4 font-mono text-xs uppercase tracking-widest text-black transition-colors duration-300 hover:bg-brand-light disabled:opacity-50 sm:px-7"
          >
            {isSubmitting ? 'Joining…' : 'Join'}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </form>

      <p
        aria-live="polite"
        className={`mt-4 h-5 font-mono text-xs tracking-wide ${
          message.includes('Welcome')
            ? 'text-brand-light'
            : message.includes('already')
              ? 'text-yellow-400'
              : 'text-red-400'
        }`}
      >
        {message || ' '}
      </p>

      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-600">
        Private beta — early access
      </p>
    </div>
  )
}
