import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const url = nextUrl.pathname;

  const token = cookies.get('token');
  const refreshToken = cookies.get('refreshToken');

  const isRefreshTokenNotEmpty = () => {
    return refreshToken && refreshToken.value !== ''
  }

  const isUrlOrAPI = (url: string, secondURL: string) => {
    return url.startsWith('/api') || url.startsWith(secondURL)
  }

  if (url.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (
    url === '/'
    || !isRefreshTokenNotEmpty()
    && !isUrlOrAPI(url, '/auth')
  ) {
    return NextResponse.redirect(`${baseURL}/auth/login`)
  }

  if (
    isRefreshTokenNotEmpty()
    && !isUrlOrAPI(url, '/content')
  ) {
    return NextResponse.redirect(`${baseURL}/content/news`)
  }

  if (url.startsWith('/api') && url !== '/api/refreshToken') {

    console.log(`Middleware interrupted. Cookies && request url:`)
    console.log(`\t${url}\n\t${cookies}`)

    const headers = new Headers({
      'x-token': token?.value ? token.value : '',
      'x-refreshToken': refreshToken?.value ? refreshToken.value : '',
    })

    const response = NextResponse.next({ 
      request: {
        headers
      }
    });

    console.log(`Request Headers:`)
    console.log(`${JSON.stringify(response.headers)}`)

    return response;
  }

  return NextResponse.next();
}
