import { NextResponse } from "next/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type fetcherType = {
  url: string,
  params: object | null,
  headers: object | null
}

export default async function fetcher({ 
  url,
  params,
  headers,
}: fetcherType) {
  const tryFetch = async ({ url, headers, params }: fetcherType) => {
    return fetch(
      url, {
        headers: { 
          ...headers
        },
        ...params
      }
    )
  };

  const firstFetchAttempt = await tryFetch({ url, params, headers });

  if (firstFetchAttempt.status === 401) {
    try {
      const tokens = await fetch(`${baseURL}/api/refreshToken`, { method: 'POST', headers: { ...headers } });
      const { token, refreshToken } = await tokens.json();

      const secondFetchAttempt = await tryFetch({
        url,
        params: {
          ...params,
        },
        headers: { 
          ...headers,
          'Authorization': `Bearer ${token}`,
        } 
      });
      
      if (secondFetchAttempt.ok) {

        let response;

        try {
          const apiResponse = await secondFetchAttempt.json();
          response = new NextResponse(apiResponse, {
            status: secondFetchAttempt.status
          });
        } catch {
          response = new NextResponse(null, {
            status: secondFetchAttempt.status
          });
        }
        
        response.cookies.set('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 900, // 15 minutes
          // TODO: Uncomment
          // secure: true
        });
        
        response.cookies.set('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          // TODO: Uncomment
          // secure: true
        })

        return response;
      }

    } catch {
      console.info('yes')
    }

    throw new Error(`Fetcher failed to fullfil your request after 401 status!`);
  }

  if (firstFetchAttempt.ok) {
    let response;
    
    try {
      const apiResponse = await firstFetchAttempt.json();
      response = new NextResponse(apiResponse, {
        status: firstFetchAttempt.status
      });
    } catch {
      response = new NextResponse(null, {
        status: firstFetchAttempt.status
      });
    }
    return response;
  }

  throw new Error(`Fetcher failed to fullfil your request!\nExit status: ${firstFetchAttempt.status}`)
}