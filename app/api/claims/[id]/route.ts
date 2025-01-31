import fetcher from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf('/'));

  const refresh = request.cookies.get('refreshToken')?.value;
  const access = request.cookies.get('accessToken')?.value;

  if (id === null) {
    return NextResponse.json(
      { error: 'No uid in request' },
      { status: 400 }
    );
  }

  const apiRequest = await fetcher({
    url: `${baseURL}/v1/my/claims/${id}`,
    refresh,
    access
  });

  if (apiRequest.error) {
    return NextResponse.json(
      { error: apiRequest.error },
      { status: apiRequest.status }
    )
  }

  const response = NextResponse.json(apiRequest.body);

  if (apiRequest.refresh && apiRequest.access) {
    const { refresh, access } = apiRequest;

    response.cookies.set('accessToken', access, {
      httpOnly: true,
      maxAge: 15 * 60, // 15 minutes
      secure: true, // Enable in production
      sameSite: 'strict',
    });

    response.cookies.set('refreshToken', refresh, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: true, // Enable in production
      sameSite: 'strict',
    });
  }

  return response;
}