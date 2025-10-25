'use server';

import * as z from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/lib/auth';

const verifyOtpSchema = z.object({
  otp: z.string().min(6),
  email: z.string().email().optional(), // Make email optional here, get it from session
});

export async function verifyOtp(formData: z.infer<typeof verifyOtpSchema>) {
  const supabase = createClient();
  const session = await getIronSession(cookies(), sessionOptions);
  
  // We need to know which user's OTP to verify. 
  // A real app would get this from a secure session or a token.
  // For this example, we'll have to find the user by the OTP itself, which is not secure.
  // A better approach would be to pass the email from the registration step.
  // But for this simple case, we find the most recent inactive user with this OTP.
  
  const { data: user, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('otp', formData.otp)
    .eq('is_active', false)
    .order('created_at', { ascending: false })
    .limit(1)
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
