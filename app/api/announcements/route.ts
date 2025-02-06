import { NextRequest, NextResponse } from 'next/server';
import fetcher from '@/lib/fetcher';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const afterId = searchParams.get('afterId');

  const refresh = request.cookies.get('refreshToken')?.value;
  const access = request.cookies.get('accessToken')?.value;

  const url = afterId
    ? `${process.env.NEXT_PUBLIC_API_URL}/v1/announcements/chunk?afterId=${afterId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/v1/announcements/chunk`;

  const apiRequest = await fetcher({
    url,
    refresh,
    access
  })

  if (apiRequest.error) {
    return NextResponse.json(
      { error: apiRequest.error },
      { status: apiRequest.status || 418 }
    )
  }

  const response = NextResponse.json(apiRequest.body.announcements);

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