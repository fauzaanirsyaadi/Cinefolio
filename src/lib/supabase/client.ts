import { createBrowserClient } from '@supabase/ssr'

// WARNING: These are hardcoded values for debugging purposes.
// Replace them with your actual Supabase credentials and move them to environment variables before production.
const supabaseUrl = "https://nigadoiknxpsncdyyqtm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZ2Fkb2lrbnhwc25jZHl5cXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODMzODksImV4cCI6MjA3Njk1OTM4OX0.w7Xuua52HJIcZL2Q4lhn1g2F2nT70-u3U7dXa4Vi_hc";


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
