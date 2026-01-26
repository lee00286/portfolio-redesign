import ComputerLayout from '@/components/computer/ComputerLayout';

export const metadata = {
  title: 'Yena Lee Portfolio',
  description: 'This is a portfolio website.'
};

export default function SiteLayout({ children }) {
  return <ComputerLayout>{children}</ComputerLayout>;
}
