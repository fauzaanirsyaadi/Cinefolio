'use server';

import { getSession, login as ironLogin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData | any) {
  // Dummy authentication for portfolio purposes
  if (formData.email === 'admin@example.com' && formData.password === 'password') {
    await ironLogin(formData.email);
    revalidatePath('/');
    return { success: true };
  }
  return { success: false, error: 'Invalid email or password.' };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
