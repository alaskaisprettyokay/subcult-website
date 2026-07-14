import { NextRequest, NextResponse } from 'next/server';
import { resend, getContactsResend, FROM_EMAIL } from '../../../../lib/email';
import { welcomeListener, welcomeCurator } from '../../../../lib/email-templates';

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
      // Step 1: Add the contact before sending the welcome email. If this
      // fails, stop: a successful email must never imply a missing audience
      // subscription.
      const audienceId = process.env.RESEND_AUDIENCE_ID;

      if (!audienceId || audienceId === 'your_audience_id') {
        console.error('RESEND_AUDIENCE_ID not configured');
        return NextResponse.json(
          { error: 'Subscription service not configured. Please contact support.' },
          { status: 500 }
        );
      }

      const contactsResend = getContactsResend();
      const existingContactResponse = await contactsResend.contacts.get({
        audienceId,
        // Resend's audience API accepts either a contact ID or an email in
        // this path, even though this SDK version names the field `id`.
        id: normalizedEmail,
      });

      if (existingContactResponse.data) {
        return NextResponse.json(
          { error: 'ALREADY_SUBSCRIBED' },
          { status: 409 }
        );
      }

      if (
        existingContactResponse.error &&
        existingContactResponse.error.name !== 'not_found'
      ) {
        console.error(
          'Resend contact lookup error:',
          existingContactResponse.error
        );
        return NextResponse.json(
          { error: 'Could not check your waitlist status. Please try again.' },
          { status: 502 }
        );
      }

      const contactResponse = await contactsResend.contacts.create({
        email: normalizedEmail,
        firstName: userType === 'curator' ? 'Creator' : 'Listener',
        audienceId,
      });

      if (contactResponse.error) {
        const message = contactResponse.error.message || '';
        const isDuplicate =
          message.includes('already exists') ||
          message.includes('duplicate') ||
          message.includes('Contact already exists');

        if (isDuplicate) {
          return NextResponse.json(
            { error: 'ALREADY_SUBSCRIBED' },
            { status: 409 }
          );
        }

        console.error('Resend contact creation error:', contactResponse.error);
        return NextResponse.json(
          { error: 'Could not add you to the waitlist. Please try again.' },
          { status: 502 }
        );
      }

      const contactId = contactResponse.data?.id;
      console.log('Contact added to Resend audience:', contactId);

      // Step 2: Send welcome email
      const emailResponse = await resend.emails.send({
        from: FROM_EMAIL,
        to: [normalizedEmail],
        subject: userType === 'curator'
          ? 'Welcome to Subcult'
          : 'Welcome to Subcult',
        html: userType === 'curator'
          ? welcomeCurator(normalizedEmail)
          : welcomeListener(normalizedEmail),
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

// Welcome email templates now imported from lib/email-templates.ts
