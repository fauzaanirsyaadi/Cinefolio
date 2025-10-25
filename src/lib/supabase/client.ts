import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Your project's URL and Key are required to create a Supabase client! Check your .env.local file.");
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Your project's URL and Key are required to create a Supabase client! Check your .env.local file.");
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
