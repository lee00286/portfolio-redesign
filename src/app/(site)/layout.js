import { getLang } from '@/lib/lang';
import { SITE_URL } from '@/constants/general';
import ComputerLayout from '@/components/computer/ComputerLayout';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yena Lee | Web Developer',
    template: '%s | Yena Lee'
  },
  description:
    'Portfolio of Yena Lee, a web developer specializing in modern web applications.',
  openGraph: {
    title: 'Yena Lee | Web Developer',
    description:
      'Portfolio of Yena Lee, a web developer specializing in modern web applications.',
    url: SITE_URL,
    siteName: 'Yena Lee',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Yena Lee | Web Developer',
    description:
      'Portfolio of Yena Lee, a web developer specializing in modern web applications.'
  }
};

export default async function SiteLayout({ children }) {
  const lang = await getLang();

  return <ComputerLayout lang={lang}>{children}</ComputerLayout>;
}
