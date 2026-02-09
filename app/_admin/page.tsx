'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  // Newsletter form state
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState('')

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        alert('Incorrect password')
      }
    } catch (error) {
      alert('Authentication failed')
    }

    setIsAuthenticating(false)
  }

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!subject.trim() || !content.trim()) {
      alert('Please fill in both subject and content')
      return
    }

    setIsSending(true)
    setSendResult('')

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content }),
      })

      const result = await response.json()

      if (response.ok) {
        setSendResult(`✅ Newsletter sent successfully to ${result.count} subscribers!`)
        setSubject('')
        setContent('')
      } else {
        setSendResult(`❌ Failed to send: ${result.error}`)
      }
    } catch (error) {
      setSendResult('❌ Network error occurred')
    }

    setIsSending(false)
  }

  const handlePreview = () => {
    if (!content.trim()) {
      alert('Please add content to preview')
      return
    }
    setIsPreviewOpen(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
            <CardDescription className="text-center">
              Enter admin password to access newsletter management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuthenticate} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isAuthenticating}
                className="bg-white/5 border-white/20"
              />
              <Button
                type="submit"
                disabled={isAuthenticating || !password}
                className="w-full"
              >
                {isAuthenticating ? 'Authenticating...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Newsletter Admin</h1>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Logout
          </Button>
        </div>

        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle>Send Newsletter</CardTitle>
            <CardDescription>
              Compose and send a newsletter to all subscribers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendNewsletter} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject Line
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Newsletter subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isSending}
                  className="bg-white/5 border-white/20"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content
                </label>
                <Textarea
                  id="content"
                  placeholder="Write your newsletter content here. You can use Markdown formatting..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isSending}
                  rows={12}
                  className="bg-white/5 border-white/20 resize-none"
                />
              </div>

              {sendResult && (
                <div className="p-3 rounded-sm bg-white/5 border border-white/20">
                  <p className="text-sm">{sendResult}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreview}
                  disabled={isSending}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Preview
                </Button>
                <Button
                  type="submit"
                  disabled={isSending || !subject.trim() || !content.trim()}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  {isSending ? 'Sending...' : 'Send Newsletter'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Newsletter Preview</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsPreviewOpen(false)}
                  className="h-8"
                >
                  ✕
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-sm p-4 bg-white text-black">
                  <h2 className="text-xl font-bold mb-4">{subject}</h2>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}