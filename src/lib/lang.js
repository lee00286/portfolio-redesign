import { cookies } from 'next/headers';
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LANG_COOKIE_NAME
} from '@/constants/language';

/**
 * Gets the current language with the following priority:
 * 1. the URL query parameter (?lang=en)
 * 2. the cookie
 * 3. fallback to DEFAULT_LANG
 */
export async function getLang(searchParams) {
  // URL Query Parameter
  const params = await searchParams;
  const queryLang = params?.lang;

  if (queryLang && SUPPORTED_LANGS.includes(queryLang)) {
    return queryLang;
  }

  // Cookie
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANG_COOKIE_NAME)?.value;
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

export const getLangRoutes = (routes) => {
  if (!Array.isArray(routes) || routes.length === 0) return [];
  if (!Array.isArray(SUPPORTED_LANGS) || SUPPORTED_LANGS.length === 0)
    return routes;

  return routes.flatMap((route) => {
    return SUPPORTED_LANGS.map((lang) => {
      const baseUrl = typeof route === 'string' ? route : route.url;
      const langUrl = `${baseUrl}?lang=${lang}`;

      if (typeof route === 'string') {
        return {
          url: langUrl,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 1
        };
      }

      return {
        ...route,
        url: langUrl
      };
    });
  });
};
