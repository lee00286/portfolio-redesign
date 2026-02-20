import Link from 'next/link';
import { getLang } from '@/lib/lang';
import WindowLayout from '@/components/computer/WindowLayout';

export default async function NotFound() {
  const lang = await getLang();

  return (
    <WindowLayout>
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-12 w-full h-[calc(100%-40px)] text-center">
        <div>
          <p className="!font-mono !font-bold !text-primary-base !text-6xl !leading-none">
            404
          </p>
          <h1 className="mt-3 !text-gray-700 !text-2xl">
            {lang === 'ko' ? '페이지를 찾을 수 없습니다' : 'Page Not Found'}
          </h1>
        </div>

        <p className="max-w-[360px] !text-gray-500 !text-sm">
          {lang === 'ko'
            ? '찾고 있는 페이지가 존재하지 않거나 이동되었을 수 있습니다.'
            : 'The page you are looking for does not exist or may have been moved.'}
        </p>

        <Link href="/" className="btn btn--primary !text-sm">
          {lang === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}
        </Link>
      </div>
    </WindowLayout>
  );
}
