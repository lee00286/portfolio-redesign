import { NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middlewareClient';
import { verifyAdminToken } from '@/lib/admin/auth';
import { getAdminUser } from '@/lib/admin/requireAdmin';
import { isPasswordLoginEnabled } from '@/lib/admin/allowList';
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

    const supabase = createSupabaseMiddlewareClient(req, res);
    const adminUser = await getAdminUser(supabase);

    if (!adminUser) {
      // Non-OAuth fallback only when explicitly enabled
      if (isPasswordLoginEnabled()) {
        const token = req.cookies.get('admin_auth')?.value;

        if (await verifyAdminToken(token)) {
          return res;
        }
      }

      // Build the rejection but keep cookies already set on res
      // (preserve the refreshed Supabase session and the language cookie)
      const rejection = pathname.startsWith('/api/')
        ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        : NextResponse.redirect(new URL('/admin/login', req.url));

      res.cookies.getAll().forEach((cookie) => rejection.cookies.set(cookie));

      return rejection;
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
