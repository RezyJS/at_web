import fetcher from '@/lib/fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const access = request.cookies.get('accessToken')?.value;
  const refresh = request.cookies.get('refreshToken')?.value;

  const body = await request.formData();

  const response = await fetcher({
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/my/claims/`,
    method: 'POST',
    body,
    access,
    refresh
  });

  if (response.error) {
    return NextResponse.json(
      { error: 'Ошибка создания заявки' },
      { status: response.status }
    );
  }

  return NextResponse.json(
    response.body,
    { status: response.status }
  );
}