'use server';

import { cookies } from 'next/headers';
import { SUPPORTED_LANGS, DEFAULT_LANG, LANG_COOKIE_NAME } from '@/constants/language';

/**
 * Switch the language preference cookie
 */
export async function switchLang(lang) {
  const validLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  const cookieStore = await cookies();

  cookieStore.set(LANG_COOKIE_NAME, validLang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax'
  });
}
