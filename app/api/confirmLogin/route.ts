import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  
  const apiResponse = await axios.post(`${baseURL}/v1/auth/confirm-login`, { token })
  const data = await apiResponse.data;

  const response = new NextResponse(null, {
    status: apiResponse.status
  });

  if (+apiResponse.status >= 200 && +apiResponse.status < 300) { 
    response.cookies.set('token', data.token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 900, // 15 minutes
      // TODO: Uncomment
      // secure: true
    });
    
    response.cookies.set('refreshToken', data.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      // TODO: Uncomment
      // secure: true
    })
  }
  
  return response;
}