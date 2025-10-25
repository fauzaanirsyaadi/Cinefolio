'use server';

import * as z from 'zod';

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signup(formData: z.infer<typeof signupSchema>) {
  // This is a dummy action for portfolio purposes.
  // In a real application, you would:
  // 1. Validate the input.
  // 2. Check if a user with this email already exists.
  // 3. Hash the password.
  // 4. Create a new user in your database.
  // 5. Generate a verification token/link and send it via email.
  
  console.log('New user signup:', formData);

  // Simulate a successful signup
  return { success: true };
}
