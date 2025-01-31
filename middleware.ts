// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (refreshToken && (
    !(
      request.nextUrl.pathname.startsWith('/content') || 
      request.nextUrl.pathname.startsWith('/api')) || 
      request.nextUrl.pathname === '/content')
    ) {
    return NextResponse.redirect(new URL('/content/news', request.url));
  }

  // If no tokens are found and the user is not on an auth page, redirect to login
  if (!accessToken && !refreshToken && !(
    request.nextUrl.pathname.startsWith('/auth') || 
    request.nextUrl.pathname.startsWith('/confirm-login') ||
    request.nextUrl.pathname.startsWith('/registration')
  )) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};