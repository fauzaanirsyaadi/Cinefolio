import { createBrowserClient } from '@supabase/ssr'

// WARNING: These are hardcoded values for debugging purposes.
// Replace them with your actual Supabase credentials and move them to environment variables before production.
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";


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
