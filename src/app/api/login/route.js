import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { password, captcha, captchaQuestion, captchaAnswer } = body;

    if (!password || !captcha || !captchaQuestion || !captchaAnswer) {
      return NextResponse.json(
        { errors: { general: 'Missing required fields' } },
        { status: 400 }
      );
    }

    if (captcha !== captchaAnswer) {
      return NextResponse.json({ errors: { captcha: 'Incorrect captcha answer' } }, { status: 400 });
    }

    const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
    if (!hashedPassword) {
      return NextResponse.json(
        { errors: { general: 'Server configuration error' } },
        { status: 500 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return NextResponse.json(
        { errors: { password: 'Invalid password' } },
        { status: 400 }
      );
    }
    const isDev = process.env.NODE_ENV !== "production";
    const response = NextResponse.json({ success: true });
    response.cookies.set('adminAuth', 'true', {
      httpOnly: true, 
      secure: !isDev,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error("👉 Server Error:", error);
    return NextResponse.json(
      { errors: { general: 'Server error' } },
      { status: 500 }
    );
  }
}