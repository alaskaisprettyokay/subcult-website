import { Resend } from 'resend';

// Lazy init to avoid build-time errors when API key isn't set
let _resend: Resend | null = null;

export const getResend = () => {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
  }
  return _resend;
};

// Keep backward compat export — accessing at runtime only
export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    return (getResend() as any)[prop];
  }
});

export const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@subcult.music';
export const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'hello@subcult.music';
