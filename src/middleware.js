import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip non-admin pages
  if (!pathname.startsWith('/admin') || !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  // Skip login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const isAuthorized = req.cookies.get('admin_auth')?.value === '1';

  if (!isAuthorized) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
