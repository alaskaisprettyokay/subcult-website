import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, userType } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!userType || !['listener', 'curator'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    try {
      // Step 1: Add contact to Resend audience (if audience ID is configured)
      let contactId: string | undefined;
      
      if (process.env.RESEND_AUDIENCE_ID && process.env.RESEND_AUDIENCE_ID !== 'your_audience_id') {
        try {
          const contactResponse = await resend.contacts.create({
            email: normalizedEmail,
            firstName: userType === 'curator' ? 'Creator' : 'Listener',
            audienceId: process.env.RESEND_AUDIENCE_ID,
          });

          if (contactResponse.error) {
            // Check if contact already exists
            if (contactResponse.error.message?.includes('already exists') ||
                contactResponse.error.message?.includes('duplicate') ||
                contactResponse.error.message?.includes('Contact already exists')) {
              console.log('Contact already exists in Resend audience');
              // Continue - this is fine, they're already subscribed
            } else {
              console.error('Resend contact creation error:', contactResponse.error);
              // Continue anyway - we'll still try to send the email
            }
          } else {
            contactId = contactResponse.data?.id;
            console.log('Contact added to Resend audience:', contactId);
          }
        } catch (contactError: any) {
          console.error('Error adding contact to Resend:', contactError);
          // Continue - we'll still try to send the email
        }
      }

      // Step 2: Send welcome email
      const emailResponse = await resend.emails.send({
        from: FROM_EMAIL,
        to: [normalizedEmail],
        subject: userType === 'curator'
          ? 'Welcome to Subcult - Start Creating!'
          : 'Welcome to Subcult - Discover Music!',
        html: generateWelcomeEmail(userType, normalizedEmail),
      });

      if (emailResponse.error) {
        console.error('Welcome email failed:', emailResponse.error);
        return NextResponse.json(
          { error: emailResponse.error.message || 'Failed to send welcome email. Please try again.' },
          { status: 500 }
        );
      }

      console.log('Subscription successful:', {
        email: normalizedEmail,
        userType,
        contactId,
        emailId: emailResponse.data?.id
      });

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! Check your email for welcome message.'
      });

    } catch (error: any) {
      console.error('Resend API error:', error);
      
      // Check if it's a duplicate/already exists error
      if (error.message?.includes('already exists') || 
          error.message?.includes('duplicate') ||
          error.message?.includes('Contact already exists')) {
        return NextResponse.json(
          { error: 'ALREADY_SUBSCRIBED' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: error.message || 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

// Simple HTML email template (we'll improve this later with React Email)
function generateWelcomeEmail(userType: 'listener' | 'curator', email: string): string {
  const isCreator = userType === 'curator';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome to Subcult</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 10px;">Welcome to Subcult!</h1>
        <p style="color: #666; font-size: 16px; margin: 0;">
          ${isCreator ? 'Ready to showcase your music to the world?' : 'Discover underground music communities worldwide'}
        </p>
      </div>

      <div style="background: #f8f9fa; border-radius: 8px; padding: 24px; margin-bottom: 30px;">
        <h2 style="color: #1a1a1a; font-size: 20px; margin-bottom: 16px;">
          ${isCreator ? '🎵 For Creators & Curators' : '🎧 For Music Lovers'}
        </h2>

        ${isCreator ? `
          <p style="margin-bottom: 12px;">As a music creator or curator, you'll get:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Early access to submit your music</li>
            <li style="margin-bottom: 8px;">Direct connection to underground music communities</li>
            <li style="margin-bottom: 8px;">Tools to build your fanbase organically</li>
            <li style="margin-bottom: 8px;">Opportunities to collaborate with other artists</li>
          </ul>
        ` : `
          <p style="margin-bottom: 12px;">As a music listener, you'll get:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Early access to discover new artists</li>
            <li style="margin-bottom: 8px;">Curated playlists from underground scenes</li>
            <li style="margin-bottom: 8px;">Direct support for emerging artists</li>
            <li style="margin-bottom: 8px;">Exclusive content from your favorite creators</li>
          </ul>
        `}
      </div>

      <div style="text-align: center; margin-bottom: 30px;">
        <p style="font-size: 16px; margin-bottom: 20px;">
          We're building something special for underground music. You'll be the first to know when we launch!
        </p>
        <div style="background: #1a1a1a; color: white; border-radius: 6px; padding: 16px; font-size: 14px;">
          <strong>🚀 Launch coming soon</strong><br>
          We'll send you an invite as soon as we're ready
        </div>
      </div>

      <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
        <p style="margin-bottom: 10px;">
          Questions? Just reply to this email.
        </p>
        <p style="margin: 0;">
          <a href="https://subcult.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666; text-decoration: underline;">
            Unsubscribe
          </a>
        </p>
      </div>

    </body>
    </html>
  `;
}