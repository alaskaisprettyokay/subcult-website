import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL, REPLY_TO_EMAIL } from '../../../../lib/email'

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

      // Send newsletter (batch send to all contacts)
      const emailResponse = await resend.emails.send({
        from: FROM_EMAIL,
        to: emails,
        reply_to: REPLY_TO_EMAIL,
        subject: subject,
        html: generateNewsletterHTML(subject, content),
      })

      if (emailResponse.error) {
        console.error('Newsletter send failed:', emailResponse.error)
        return NextResponse.json(
          { error: 'Failed to send newsletter' },
          { status: 500 }
        )
      }

      console.log('Newsletter sent successfully:', emailResponse.data?.id)

      return NextResponse.json({
        success: true,
        count: emails.length,
        emailId: emailResponse.data?.id
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

function generateNewsletterHTML(subject: string, content: string): string {
  // Convert line breaks to HTML
  const htmlContent = content.replace(/\n/g, '<br>')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${subject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 10px;">SubCult</h1>
        <p style="color: #666; font-size: 14px; margin: 0;">Underground music communities</p>
      </div>

      <div style="background: #f8f9fa; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
        <h2 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">${subject}</h2>
        <div style="color: #333; font-size: 16px; line-height: 1.6;">
          ${htmlContent}
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <p style="font-size: 16px; margin-bottom: 20px; color: #666;">
          Thanks for being part of the SubCult community!
        </p>
      </div>

      <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
        <p style="margin-bottom: 10px;">
          Questions? Reply to this email.
        </p>
        <p style="margin: 0;">
          <a href="https://subcult.com/unsubscribe" style="color: #666; text-decoration: underline;">
            Unsubscribe
          </a>
        </p>
      </div>

    </body>
    </html>
  `
}