import { cookies } from 'next/headers';
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LANG_COOKIE_NAME
} from './lang-constants';

export { SUPPORTED_LANGS, DEFAULT_LANG, LANG_COOKIE_NAME };

/**
 * Gets the current language from the cookie.
 * If the cookie is missing or invalid, fallback to DEFAULT_LANG.
 */
export async function getLang() {
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANG_COOKIE_NAME)?.value;
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}
