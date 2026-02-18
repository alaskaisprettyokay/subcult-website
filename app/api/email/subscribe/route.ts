import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL } from '../../../../lib/email';

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
        subject: 'Thanks for signing up',
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

function generateWelcomeEmail(userType: 'listener' | 'curator', email: string): string {
  const isCurator = userType === 'curator';
  const logoUrl = 'https://subcult.music/subcult-vector.png';

  const mainMessage = isCurator
    ? "We're building SubCult for people who find and share music that matters."
    : "We're building SubCult to help people discover music through the people they trust, not algorithms.";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin: 0; padding: 0; background-color: #1a1a1a; color: #ededed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #1a1a1a;">

        <div style="text-align: center; margin-bottom: 40px;">
          <img src="${logoUrl}" alt="SubCult" style="max-width: 120px; height: auto;" />
        </div>

        <div style="font-size: 16px; line-height: 1.6; color: #ccc;">
          <p style="margin: 0 0 20px;">
            Hey - thanks for signing up. ${mainMessage} If you want to follow along, we write about what we're working on here: <a href="https://alaskaisprettyokay.substack.com" style="color: #9b87f5; text-decoration: none;">Substack</a>
          </p>

          <p style="margin: 0 0 20px;">
            We'll reach out when there's something to show you.
          </p>

          <p style="margin: 0; color: #ededed;">
            AK
          </p>
        </div>

        <div style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
          <p style="color: #555; font-size: 12px; margin: 0;">
            <a href="https://subcult.music/unsubscribe?email=${encodeURIComponent(email)}" style="color: #555; text-decoration: none;">
              Unsubscribe
            </a>
          </p>
        </div>

      </div>

    </body>
    </html>
  `;
}