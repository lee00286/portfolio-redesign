import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import { getLang } from '@/lib/lang';
import '@/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export default async function RootLayout({ children }) {
  const lang = await getLang();

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Link href="#screen" className="skip">
            {lang === 'ko' ? '본문으로 건너뛰기' : 'Skip to main content'}
          </Link>
        </header>

        {children}
      </body>
    </html>
  );
}
