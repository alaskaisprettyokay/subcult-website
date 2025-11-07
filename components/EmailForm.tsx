'use client'

import { useState } from 'react'
import { subscribe } from '@/app/actions/subscribe'
import { toast } from 'sonner'
import clsx from 'clsx'

type UserType = 'curator' | 'user'

export default function EmailForm() {
  const [userType, setUserType] = useState<UserType>('user')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [referral, setReferral] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Please enter your email')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await subscribe(
        email.trim(),
        userType,
        city.trim() || undefined,
        referral.trim() || undefined
      )

      if (result.success) {
        toast.success("You're on the list. We'll reach out soon.")
        setEmail('')
        setCity('')
        setReferral('')
      } else {
        if (result.error === 'Already joined') {
          toast.info('Already joined')
        } else {
          toast.error(result.error || 'Something went wrong')
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-container">
      {/* User Type Selection */}
      <div className="type-selector">
        <button
          type="button"
          onClick={() => setUserType('user')}
          className={clsx(
            'type-selector__button',
            userType === 'user' ? 'form-button--active' : 'form-button--secondary'
          )}
        >
          User
        </button>
        <button
          type="button"
          onClick={() => setUserType('curator')}
          className={clsx(
            'type-selector__button',
            userType === 'curator' ? 'form-button--active' : 'form-button--secondary'
          )}
        >
          Scene Curator
        </button>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            className="form-input flex-1"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-button whitespace-nowrap"
          >
            {isSubmitting ? 'Joining...' : 'Join the waitlist'}
          </button>
        </div>
        
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City (optional)"
          disabled={isSubmitting}
          className="form-input form-input--small w-full"
        />

        <input
          type="text"
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
          placeholder="Referral code (optional)"
          disabled={isSubmitting}
          className="form-input form-input--small w-full"
        />
      </form>
    </div>
  )
}

