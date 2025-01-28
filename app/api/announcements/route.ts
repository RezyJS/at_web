import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const afterId = searchParams.get('afterId');

  const url = afterId
    ? `${process.env.NEXT_PUBLIC_API_URL}/v1/announcements/chunk?afterId=${afterId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/v1/announcements/chunk`;

  try {
    // Fetch announcements from the backend
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
      },
    });

    // Assume the backend returns an array of announcements
    return NextResponse.json(response.data.announcements);
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || 'Failed to fetch announcements' },
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