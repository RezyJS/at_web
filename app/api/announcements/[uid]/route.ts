// import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const uid = searchParams.get('uid');

  if (uid === null) {
    return NextResponse.json({
      uid,
      title: `Announcement Title for UID: ${uid}`,
      description: 'This is the detailed description of the announcement.',
      datetime: '2023-10-15T14:48:00Z',
    })
  }

  const result = await fetch(`${baseURL}/v1/announcements/${uid}`, {
    headers: {
      Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
    },
  });

  return NextResponse.json(await result.json());
}