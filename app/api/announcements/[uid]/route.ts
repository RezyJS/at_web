// import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const uid = request.url.slice(request.url.lastIndexOf('/'));

  if (uid === null) {
    return NextResponse.error();
  }

  const result = await fetch(`${baseURL}/v1/announcements/${uid}`, {
    headers: {
      Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
    },
  });

  return NextResponse.json(await result.json());
}