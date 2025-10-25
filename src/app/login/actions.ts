'use server';

import { login as ironLogin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';

export async function login(formData: FormData | any) {
  const supabase = await createClient();
  const email = formData.email;
  const password = formData.password;

  const { data: user, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (findError || !user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  if (!user.is_active) {
    return { success: false, error: 'Your account is not activated. Please verify your OTP.' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { success: false, error: 'Invalid email or password.' };
  }

  // Password is correct, create session
  await ironLogin(email);
  revalidatePath('/');
  return { success: true };
}

export async function logout() {
    const { logout: ironLogout } = await import('@/lib/auth');
    await ironLogout();
    revalidatePath('/');
    redirect('/login');
}

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
