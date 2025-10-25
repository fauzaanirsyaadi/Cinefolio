
'use server';

import * as z from 'zod';

const verifyOtpSchema = z.object({
  otp: z.string().min(6),
});

export async function verifyOtp(formData: z.infer<typeof verifyOtpSchema>) {
  // This is a dummy action for portfolio purposes.
  // In a real application, you would:
  // 1. Validate the OTP.
  // 2. Look up the user/session associated with the OTP.
  // 3. Verify that the OTP is correct and has not expired.
  // 4. Mark the user's email as verified.
  // 5. Log the user in or redirect to login.

  console.log('Verifying OTP:', formData.otp);

  // Simulate a successful verification
  if (formData.otp === '123456') { // Dummy OTP
    return { success: true };
  } else {
    return { success: false, error: 'Invalid OTP code.' };
  }
}
