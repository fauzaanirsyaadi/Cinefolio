
'use server';

import * as z from 'zod';
import { createClient } from '@/lib/supabase/server';
import { sendVerificationEmail } from '@/lib/email';

const verifyOtpSchema = z.object({
  otp: z.string().min(6),
  email: z.string().email(),
});

const resendOtpSchema = z.object({
  email: z.string().email(),
});


export async function verifyOtp(formData: z.infer<typeof verifyOtpSchema>) {
  const supabase = createClient();
  
  const { data: user, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('email', formData.email)
    .eq('otp', formData.otp)
    .eq('is_active', false)
    .single();

  if (findError || !user) {
    return { success: false, error: 'Invalid or expired OTP code.' };
  }

  // OTP is correct, update user to be active
  const { error: updateError } = await supabase
    .from('users')
    .update({ is_active: true, otp: null }) // Clear OTP after use
    .eq('id', user.id);

  if (updateError) {
    console.error('Error activating user:', updateError);
    return { success: false, error: 'Could not verify your account.' };
  }
  
  return { success: true };
}


export async function resendOtp(formData: z.infer<typeof resendOtpSchema>) {
  const supabase = createClient();
  const { email } = formData;

  const { data: user, error: findError } = await supabase
    .from('users')
    .select('id, name, is_active')
    .eq('email', email)
    .single();

  if (findError || !user) {
    // To prevent email enumeration, we don't reveal if the user exists.
    return { success: true }; 
  }
  
  if (user.is_active) {
    return { success: false, error: 'This account is already verified.' };
  }

  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  const { error: updateError } = await supabase
    .from('users')
    .update({ otp: newOtp })
    .eq('email', email);

  if (updateError) {
    console.error('Error updating OTP:', updateError);
    return { success: false, error: 'Could not generate a new OTP.' };
  }

  try {
    await sendVerificationEmail(email, newOtp, user.name);
    return { success: true };
  } catch (emailError) {
    console.error("Email sending error:", emailError);
    return { success: false, error: 'Failed to send new OTP email.' };
  }
}
