import { NextRequest, NextResponse } from "next/server";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try { 
    const token = request.cookies.get('token');
    const refreshToken = request.cookies.get('refreshToken');
    
    const apiResponse = await fetch(`${apiURL}/v1/auth/logout`,{
      body: JSON.stringify({ token: refreshToken?.value }),
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token?.value}`,
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