'use server';

import * as z from 'zod';
import { createClient } from '@/lib/supabase/server';

const verifyOtpSchema = z.object({
  otp: z.string().min(6),
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
