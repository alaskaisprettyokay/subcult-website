import { Resend } from 'resend';

// Lazy init to avoid build-time errors when API key isn't set
let _resend: Resend | null = null;
let _contactsResend: Resend | null = null;

export const getResend = () => {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
  }
  return _resend;
};

// Contact management needs a full-access key. Keep it separate from the
// send-only key used for transactional email so permissions cannot fail
// silently while a welcome message still succeeds.
export const getContactsResend = () => {
  if (!_contactsResend) {
    const apiKey = process.env.RESEND_CONTACTS_API_KEY || process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error('RESEND_CONTACTS_API_KEY not configured');
    }

    _contactsResend = new Resend(apiKey);
  }

  return _contactsResend;
};

// Keep backward compat export — accessing at runtime only
export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    return (getResend() as any)[prop];
  }
});

export const FROM_EMAIL = process.env.FROM_EMAIL || 'SubCult <hello@subcult.music>';
export const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'hello@subcult.music';
