import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient({ serviceRole = false }: { serviceRole?: boolean } = {}) {
  const cookieStore = await cookies()

  // Prefer env vars; fall back to existing values for local dev only
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nigadoiknxpsncdyyqtm.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZ2Fkb2lrbnhwc25jZHl5cXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzODMzODksImV4cCI6MjA3Njk1OTM4OX0.w7Xuua52HJIcZL2Q4lhn1g2F2nT70-u3U7dXa4Vi_hc";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseKey = serviceRole ? (serviceRoleKey || supabaseAnonKey) : supabaseAnonKey;

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // ignore when called from server component runtime where set isn't allowed
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch {
          // ignore when called from server component runtime where delete isn't allowed
        }
      },
    },
  })
}
