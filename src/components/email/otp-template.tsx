import * as React from 'react';

interface OtpEmailTemplateProps {
  name: string;
  otp: string;
}

export const OtpEmailTemplate = ({ name, otp }: OtpEmailTemplateProps) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#000' }}>Hi {name},</h1>
    <p>Thanks for signing up for Cinefolio. Use the code below to verify your account.</p>
    <p style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '4px', margin: '20px 0', padding: '10px', background: '#f0f0f0', borderRadius: '5px', textAlign: 'center' }}>
      {otp}
    </p>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Best,</p>
    <p>The Cinefolio Team</p>
  </div>
);
