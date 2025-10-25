'use server';

import * as z from 'zod';
import { createClient } from '@/lib/supabase/server';
import { sendVerificationEmail } from '@/lib/email';
import { formatCreatedAt } from '@/lib/time'; // added

const verifyOtpSchema = z.object({
  otp: z.string().min(6),
  email: z.string().email(),
});

const resendOtpSchema = z.object({
  email: z.string().email(),
});


export async function verifyOtp(formData: z.infer<typeof verifyOtpSchema>) {
  // require privileged key to bypass RLS for server-side update
  const supabase = await createClient({ serviceRole: true });
  
  const { data: user, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('email', formData.email)
    .eq('otp', formData.otp)
    .eq('is_active', false)
    .single();

  console.log('verifyOtp: lookup', {
    email: formData.email,
    otp: formData.otp,
    user: user
      ? {
          ...user,
          created_at: formatCreatedAt((user as any).created_at),
        }
      : null,
    findError,
  });

  if (findError || !user) {
    return { success: false, error: 'Invalid or expired OTP code.' };
  }

  // OTP is correct, update user to be active
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ is_active: true, otp: null })
    .eq('id', user.id)
    .select(); // request returned data for logging

  console.log('verifyOtp: update', {
    updatedUser:
      Array.isArray(updatedUser) && updatedUser.length > 0
        ? updatedUser.map(u => ({ ...u, created_at: formatCreatedAt((u as any).created_at) }))
        : updatedUser,
    updateError,
  });

  // If update returned no rows (empty array) but no error, re-query to confirm current state.
  if ((!updatedUser || (Array.isArray(updatedUser) && updatedUser.length === 0)) && !updateError) {
    const { data: refetched, error: refetchError } = await supabase
      .from('users')
      .select('id, is_active, otp, created_at')
      .eq('id', user.id)
      .single();

    console.log('verifyOtp: refetch-after-update', {
      refetched: refetched ? { ...refetched, created_at: formatCreatedAt((refetched as any).created_at) } : null,
      refetchError,
    });

    if (refetchError) {
      console.error('Refetch after update failed:', refetchError);
      return { success: false, error: 'Could not verify your account (refetch failed).' };
    }

    if (!refetched || !refetched.is_active) {
      // Very likely an RLS/policy issue or insufficient privileges from the anon key.
      console.error('Update did not apply. Check Supabase RLS/policies or use service_role for server updates.');
      return { success: false, error: 'Could not verify your account. Check server logs or Supabase policies.' };
    }
  }

  if (updateError) {
    console.error('Error activating user:', updateError);
    return { success: false, error: 'Could not verify your account.' };
  }
  
  return { success: true };
}


export async function resendOtp(formData: z.infer<typeof resendOtpSchema>) {
  const supabase = await createClient({ serviceRole: true });
   const { email } = formData;

   const { data: user, error: findError } = await supabase
     .from('users')
     .select('id, name, is_active')
     .eq('email', email)
     .single();

  console.log('resendOtp: lookup', { email, user, findError });

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
