import { NextRequest, NextResponse } from "next/server";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try { 
    const token = request.headers.get('x-token');
    const refreshToken = request.headers.get('x-refreshToken');
    
    const apiResponse = await fetch(`${apiURL}/v1/auth/logout`,{
      body: JSON.stringify({ token: refreshToken }),
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    
    const response = new NextResponse(null, {
      status: apiResponse.status
    })
    
    response.cookies.delete('refreshToken');
    response.cookies.delete('token');
    
    return response;
  } catch {
    return new NextResponse()
  }
}