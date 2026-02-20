import { cookies } from 'next/headers';

export const SUPPORTED_LANGS = ['en', 'ko'];
export const DEFAULT_LANG = 'en';
export const LANG_COOKIE_NAME = 'lang';

/**
 * Gets the current language from the cookie.
 * If the cookie is missing or invalid, fallback to DEFAULT_LANG.
 */
export async function getLang() {
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANG_COOKIE_NAME)?.value;
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}
