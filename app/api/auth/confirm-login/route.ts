import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code) {
    return NextResponse.json(
      { error: 'Confirmation code is required' },
      { status: 400 }
    );
  }

  try {
    // Send POST request using Axios
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/confirm-login`, { token: code });

    // Set tokens in cookies with desired attributes
    const res = NextResponse.json(response.data);
    
    // Set accessToken cookie
    res.cookies.set('accessToken', response.data.token, {
      httpOnly: true,
      maxAge: 15 * 60,
      secure: true,
      sameSite: 'strict',
    });

    // Set refreshToken cookie
    res.cookies.set('refreshToken', response.data.refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: true,
      sameSite: 'strict',
    });

    return res;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || 'Failed to confirm login' },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}
