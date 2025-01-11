import { NextRequest } from "next/server";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const token = request.headers.get('x-token');

  const apiResponse = await fetch(
    `${apiURL}/v1/announcements/chunk?afterId=1`, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  console.log(`Response from API:\n\t${apiResponse.status}`)
  
  return apiResponse;
}