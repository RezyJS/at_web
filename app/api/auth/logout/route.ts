import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    // Send a POST request to the backend logout endpoint
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/logout`, { token: request.cookies.get('refreshToken')?.value }, {
      headers: {
        Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
      },
    });

    // Clear the cookies
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || 'Failed to logout' },
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