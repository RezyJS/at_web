import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: 'Введите ваш email!' },
      { status: 400 }
    );
  }

  try {
    // Send POST request using Axios
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, { email });

    // Return success response
    return NextResponse.json({ message: 'Confirmation code sent to your email' });
  } catch (error) {
    // Handle errors (e.g., invalid email, server error)
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || 'Failed to initiate login' },
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