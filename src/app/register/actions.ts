'use server';

import * as z from 'zod';
import { createClient } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/email';

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});


export async function signup(formData: z.infer<typeof signupSchema>) {
  const supabase = createClient();
  
  const { data: existingUser } = await supabase
    .from('users')
    .select('email')
    .eq('email', formData.email)
    .single();

  if (existingUser) {
    return { success: false, error: 'User with this email already exists.' };
  }

  const hashedPassword = await bcrypt.hash(formData.password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const { error } = await supabase
    .from('users')
    .insert([
      { 
        name: formData.name, 
        email: formData.email,
        password: hashedPassword,
        is_active: false,
        otp: otp,
      }
    ]);

  if (error) {
    console.error('Error inserting user:', error);
    return { success: false, error: 'Could not create user.' };
  }
  
  try {
    await sendVerificationEmail(formData.email, otp, formData.name);
    return { success: true };
  } catch (emailError) {
    console.error("Email sending error:", emailError);
    // Even if email fails, registration is technically successful.
    // You might want to handle this case differently, e.g., by telling the user to try "Resend OTP".
    return { success: true, warning: 'User created, but failed to send verification email.' };
  }
}
