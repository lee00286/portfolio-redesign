import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin/auth';
import { LANG_COOKIE_NAME, SUPPORTED_LANGS } from '@/constants/language';

export async function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;
  const res = NextResponse.next();

  // === Language Middleware ===
  const langQuery = searchParams.get('lang');

  if (langQuery && SUPPORTED_LANGS.includes(langQuery)) {
    const currentCookie = req.cookies.get(LANG_COOKIE_NAME)?.value;
    if (currentCookie !== langQuery) {
      res.cookies.set(LANG_COOKIE_NAME, langQuery, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
      });
    }
  }

  // === Admin Middleware ===
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Skip login page and login API
    if (pathname === '/admin/login' || pathname === '/api/admin/login') {
      return res;
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
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * All paths except the ones listed below
     * - api (except /api/admin)
     * - _next/static (static files)
     * - _next/image (next image files)
     * - favicon.ico, img, public files
     */
    '/((?!api(?!/admin)|_next/static|_next/image|favicon.ico|img|public).*)'
  ]
};
