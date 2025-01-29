// import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const uid = request.url.slice(request.url.lastIndexOf('/'));

  if (uid === null) {
    return NextResponse.json({
      uid,
      title: `Claims Title for UID: ${uid}`,
      description: 'This is the detailed description of the announcement.',
      datetime: '2023-10-15T14:48:00Z',
    })
  }

  const result = await fetch(`${baseURL}/v1/my/claims/${uid}`, {
    headers: {
      Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
    },
  });

  return NextResponse.json(await result.json());
}