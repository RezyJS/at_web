import { NextRequest, NextResponse } from "next/server";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {

  console.log(`Refresh headers! ${JSON.stringify(request.headers)}`)

  const refresh = request.headers.get('x-refreshToken');
  
  console.log(`Refresh: ${refresh}`)

  const apiResponse = await fetch(`${apiURL}/v1/auth/refresh`, { body: JSON.stringify({ token: refresh }), method: 'POST' });
  console.log(`API Response status: ${apiResponse.status}`)

  const tokens = await apiResponse.json()

  return NextResponse.json({ ...tokens })
}