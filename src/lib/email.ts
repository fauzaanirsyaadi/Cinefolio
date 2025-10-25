'use server';

import { Resend } from 'resend';
import { OtpEmailTemplate } from '@/components/email/otp-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, otp: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Resend API Key is not set.');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Cinefolio <onboarding@resend.dev>', // Change this to your verified sender domain
      to: [email],
      subject: 'Your Cinefolio Verification Code',
      react: OtpEmailTemplate({ name, otp }) as React.ReactElement,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
