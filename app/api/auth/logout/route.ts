import fetcher from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const refresh = request.cookies.get('refreshToken')?.value;
  const access = request.cookies.get('accessToken')?.value;

  const apiRequest = await fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/logout`,
    body: { token: refresh },
    method: 'POST',
    refresh,
    access
  });

  if (apiRequest.error) {
    return NextResponse.json(
      { error: apiRequest.error },
      { status: apiRequest.status }
    )
  }

  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');

  return response;
}