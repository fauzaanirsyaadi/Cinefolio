'use server';

import { Resend } from 'resend';
import { OtpEmailTemplate } from '@/components/email/otp-template';
import * as React from 'react';

export async function sendVerificationEmail(email: string, otp: string, name: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API Key is not set in environment variables.');
    throw new Error('Resend API Key is not configured.');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Cinefolio <onboarding@resend.dev>', // Ubah ini ke domain pengirim terverifikasi Anda
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
    console.error('Error sending verification email:', error);
    // Jangan ekspos detail error internal ke klien
    throw new Error('Could not send verification email.');
  }
}
