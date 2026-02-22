import { getLang } from '@/lib/lang';
import ComputerLayout from '@/components/computer/ComputerLayout';

export const metadata = {
  title: 'Yena Lee | Web Developer',
  description:
    'Portfolio of Yena Lee, a web developer specializing in modern web applications.'
};

export default async function SiteLayout({ children }) {
  const lang = await getLang();

  return <ComputerLayout lang={lang}>{children}</ComputerLayout>;
}
