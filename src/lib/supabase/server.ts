import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export function createClient(request?: NextRequest) {
  let cookieStore;
  if(request) {
    cookieStore = request.cookies;
  } else {
    cookieStore = cookies()
  }


  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            if (request) {
              const response = NextResponse.next({
                request: {
                  headers: request.headers,
                }
              })
              response.cookies.set({ name, value, ...options })
            } else {
              cookieStore.set({ name, value, ...options })
            }
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            if (request) {
              const response = NextResponse.next({
                request: {
                  headers: request.headers,
                }
              })
              response.cookies.set({ name, value: '', ...options })
            } else {
              cookieStore.set({ name, value: '', ...options })
            }
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
