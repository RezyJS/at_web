import { NextRequest, NextResponse } from "next/server";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  const refresh = request.headers.get('x-refreshToken');
  
  const apiResponse = await fetch(`${apiURL}/v1/auth/refresh`, { body: JSON.stringify({ token: refresh }), method: 'POST' });
  
  const { token, refresh_token } = await apiResponse.json();

  return NextResponse.json({ token, refreshToken: refresh_token })
}