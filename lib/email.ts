import { Resend } from 'resend';

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email domains
export const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
export const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'hello@subcult.com';