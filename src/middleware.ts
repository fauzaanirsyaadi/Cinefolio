import { NextResponse, type NextRequest } from 'next/server';
import { getSession, sessionOptions } from './lib/auth';
import { getIronSession } from 'iron-session';

export async function middleware(request: NextRequest) {
  const session = await getIronSession(request.cookies, sessionOptions);

  const { pathname } = request.nextUrl;

  if (session.isLoggedIn && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!session.isLoggedIn && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
