'use server';

import * as z from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function requestPasswordReset(formData: z.infer<typeof forgotPasswordSchema>) {
  // This is a dummy action for portfolio purposes.
  // In a real application, you would:
  // 1. Validate the email.
  // 2. Check if a user with this email exists.
  // 3. Generate a secure, single-use password reset token.
  // 4. Store the token and its expiry date in your database, associated with the user.
  // 5. Send an email to the user with a link containing the token.

  console.log('Password reset requested for:', formData.email);

  // To prevent email enumeration, always return a success message
  // whether the user exists or not.
  return { success: true };
}
