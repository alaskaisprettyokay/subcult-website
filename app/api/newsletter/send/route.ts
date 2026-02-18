import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL, REPLY_TO_EMAIL } from '../../../../lib/email'
import { newsletter } from '../../../../lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const { subject, content } = await request.json()

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      )
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    try {
      // Get all contacts from Resend audience
      const audienceId = process.env.RESEND_AUDIENCE_ID
      let contacts: any[] = []

      if (audienceId) {
        const contactsResponse = await resend.contacts.list({
          audienceId: audienceId,
        })

        if (contactsResponse.data?.data) {
          contacts = contactsResponse.data.data.filter((contact: any) => !contact.unsubscribed)
        }
      }

      if (contacts.length === 0) {
        return NextResponse.json(
          { error: 'No subscribers found. Make sure RESEND_AUDIENCE_ID is configured and you have subscribers.' },
          { status: 400 }
        )
      }

      const emails = contacts.map((contact: any) => contact.email)

      console.log(`Sending newsletter to ${emails.length} subscribers`)

      // Send newsletter using batch API (individual emails, no shared to: field)
      const batchEmails = emails.map((email: string) => ({
        from: FROM_EMAIL,
        to: [email],
        reply_to: REPLY_TO_EMAIL,
        subject: subject,
        html: newsletter(subject, content, email),
      }))

      const emailResponse = await resend.batch.send(batchEmails)

      if (emailResponse.error) {
        console.error('Newsletter send failed:', emailResponse.error)
        return NextResponse.json(
          { error: 'Failed to send newsletter' },
          { status: 500 }
        )
      }

      console.log('Newsletter sent successfully:', emailResponse.data)

      return NextResponse.json({
        success: true,
        count: emails.length,
        data: emailResponse.data
      })

    } catch (error: any) {
      console.error('Newsletter send error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to send newsletter' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Newsletter request error:', error)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

// Newsletter HTML template now imported from lib/email-templates.ts