import ComputerLayout from '@/components/computer/ComputerLayout';

export const metadata = {
  title: 'Yena Lee | Web Developer',
  description:
    'Portfolio of Yena Lee, a web developer specializing in modern web applications.'
};

export default function SiteLayout({ children }) {
  return <ComputerLayout>{children}</ComputerLayout>;
}
