import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin/auth';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip non-admin pages
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  // Skip login page and login API
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get('admin_auth')?.value;
  const isAuthorized = await verifyAdminToken(token);

  if (!isAuthorized) {
    // Return JSON 401 for API routes instead of redirecting
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
