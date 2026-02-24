import { SITE_URL } from '@/constants/general';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/']
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
