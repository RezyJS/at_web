import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const refresh = request.cookies.get('refreshToken')?.value;
  const access = request.cookies.get('accessToken')?.value;

  const attempt = async (refresh: string, access: string) => {
    const apiRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/logout`,
      {
        method: 'POST',
        body: JSON.stringify({ token: refresh }),
        headers: {
          Authorization: `Bearer ${access}`
        }
      }
    );

    if (!apiRequest.ok) {
      return NextResponse.json(
        { error: apiRequest.statusText },
        { status: apiRequest.status }
      )
    }

    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  }

  if (!access) {
    const tokens = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
      {
        method: 'POST',
        body: JSON.stringify({ token: refresh })
      }
    );

    if (tokens.ok) {
      const { token, refresh_token } = await tokens.json();
      return attempt(refresh_token, token);
    }

    const response = NextResponse.json({ message: 'Logged out with error' });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  }

  if (!refresh) {
    const response = NextResponse.json({ message: 'Logged out with error' });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  }

  return attempt(refresh, access);
}