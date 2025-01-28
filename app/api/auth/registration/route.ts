import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { first_name, second_name, email } = await request.json();

  const maybeError = [];
  
  if (!first_name) {
    maybeError.push('Введите имя!')
  }

  if (!second_name) {
    maybeError.push('Введите фамилию!')
  }

  if (!email) {
    maybeError.push('Введите почту!')
  }

  if (maybeError.length !== 0) {
    console.log(maybeError)
    return NextResponse.json(
      { error: maybeError.join('\n')},
      { status: 403 },
    );
  }

  const body = JSON.stringify({ first_name, second_name, email });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/registration`,
    {
      method: 'POST', 
      body
    },
  );

  if (response.ok) {
    return NextResponse.json(
      { message: 'Код отправлен на вашу почту!' },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ error: 'Failed to initiate registration' }, { status: response.status });
  }
}