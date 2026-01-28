import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    try {
      // Get audience ID
      const audienceId = process.env.RESEND_AUDIENCE_ID

      if (!audienceId) {
        return NextResponse.json(
          { error: 'Audience not configured' },
          { status: 500 }
        )
      }

      // First, find the contact
      const contactsResponse = await resend.contacts.list({
        audienceId: audienceId,
      })

      if (contactsResponse.error) {
        console.error('Failed to list contacts:', contactsResponse.error)
        return NextResponse.json(
          { error: 'Failed to process unsubscribe request' },
          { status: 500 }
        )
      }

      const contacts = contactsResponse.data?.data || []
      const contact = contacts.find((c: any) => c.email.toLowerCase() === normalizedEmail)

      if (!contact) {
        // Email not found, but we'll still return success for privacy
        return NextResponse.json({
          success: true,
          message: 'Successfully processed'
        })
      }

      // Remove contact from audience
      const removeResponse = await resend.contacts.remove({
        audienceId: audienceId,
        email: normalizedEmail,
      })

      if (removeResponse.error) {
        console.error('Failed to remove contact:', removeResponse.error)
        return NextResponse.json(
          { error: 'Failed to unsubscribe' },
          { status: 500 }
        )
      }

      console.log('Contact unsubscribed:', normalizedEmail)

      return NextResponse.json({
        success: true,
        message: 'Successfully unsubscribed'
      })

    } catch (error: any) {
      console.error('Unsubscribe error:', error)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Unsubscribe request error:', error)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}