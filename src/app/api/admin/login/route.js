import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { generateAdminToken } from '@/lib/admin/auth';

const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(req) {
  try {
    const { password } = await req.json();

    const expected = process.env.ADMIN_PASSWORD;

    if (!expected || !password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const a = Buffer.from(password);
    const b = Buffer.from(expected);

    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const adminToken = await generateAdminToken();

    const res = NextResponse.json({ success: true });

    res.cookies.set('admin_auth', adminToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE,
      path: '/'
    });

    return res;
  } catch (err) {
    console.error('[ADMIN LOGIN ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
