import fetcher from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const refresh = req.cookies.get('refreshToken')?.value;
  const access = req.cookies.get('accessToken')?.value;

  // Extract bounds from query parameters
  const nwLat = parseFloat(searchParams.get('nwLat') || '0');
  const nwLng = parseFloat(searchParams.get('nwLng') || '0');
  const seLat = parseFloat(searchParams.get('seLat') || '0');
  const seLng = parseFloat(searchParams.get('seLng') || '0');

  const apiRequest = await fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/map/claims?lat1=${nwLat}&long1=${nwLng}&lat2=${seLat}&long2=${seLng}`,
    refresh,
    access
  })

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