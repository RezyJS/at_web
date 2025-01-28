// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Function to refresh tokens
  const refreshTokens = async () => {
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (refreshResponse.ok) {
      const { token: newAccessToken, refresh_token: newRefreshToken } = await refreshResponse.json();

      // Create a response object
      const response = NextResponse.next();
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60, // 15 minutes
        secure: true, // Enable in production
        sameSite: 'strict',
      });
      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        secure: true, // Enable in production
        sameSite: 'strict',
      });

      return response;
    } else {
      // If refresh fails, clear cookies and redirect to login
      const response = NextResponse.redirect(new URL('/auth', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  };

  if (accessToken && refreshToken && (!(request.nextUrl.pathname.startsWith('/content') || request.nextUrl.pathname.startsWith('/api')) || request.nextUrl.pathname === '/content')) {
    return NextResponse.redirect(new URL('/content/news', request.url));
  }

  // If no accessToken but refreshToken exists, try to refresh tokens
  if (!accessToken && refreshToken) {
    return refreshTokens();
  }

  // If no tokens are found and the user is not on an auth page, redirect to login
  if (!accessToken && !refreshToken && !(request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname.startsWith('/confirm-login'))) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Proceed with the request
  const response = NextResponse.next();

  // Intercept the response to handle 401 errors
  if (response.status === 401 && refreshToken) {
    // Refresh tokens
    const refreshResponse = await refreshTokens();

    // If token refresh was successful, proceed with the request
    if (refreshResponse.status !== 401) {
      return refreshResponse;
    } else {
      // If refresh fails, redirect to login
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};