'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage('Successfully unsubscribed. We\'re sorry to see you go!')
        setEmail('')
      } else {
        setMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Unsubscribe error:', error)
      setMessage('Network error. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 border-white/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <Image
              src="/subcult_mdrn logo.png"
              alt="SubCult"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl">Unsubscribe from SubCult</CardTitle>
          <CardDescription className="text-gray-400">
            We&apos;re sorry to see you go. Enter your email to unsubscribe from all SubCult communications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>

              {message && (
                <p className="text-sm text-red-400 text-center">
                  {message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? 'Unsubscribing...' : 'Unsubscribe'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
              <p className="text-green-400 font-medium">{message}</p>
              <p className="text-sm text-gray-400">
                You won&apos;t receive any more emails from us.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Return to SubCult
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}