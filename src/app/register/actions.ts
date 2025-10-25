'use server';

import * as z from 'zod';
import { createClient } from '@/lib/supabase/server';

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
  
  // Check if user already exists
  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('email')
    .eq('email', formData.email)
    .single();

  if (existingUser) {
    return { success: false, error: 'User with this email already exists.' };
  }

  // For portfolio purposes, we're not hashing the password.
  // In a real application, ALWAYS hash passwords before storing them.
  // We'll also generate a dummy OTP.
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const { data, error } = await supabase
    .from('users')
    .insert([
      { 
        name: formData.name, 
        email: formData.email,
        password: formData.password, // WARNING: Storing plain text password
        is_active: false,
        otp: otp,
      }
    ]);

  if (error) {
    console.error('Error inserting user:', error);
    return { success: false, error: 'Could not create user.' };
  }

  console.log('New user signup:', { name: formData.name, email: formData.email });
  console.log(`Generated OTP for ${formData.email}: ${otp}`); // Simulate sending OTP

  return { success: true };
}
