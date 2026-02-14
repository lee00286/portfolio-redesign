import Link from 'next/link';
import WindowLayout from '@/components/computer/WindowLayout';

export default function NotFound() {
  return (
    <WindowLayout>
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-12 w-full h-[calc(100%-40px)] text-center">
        <div>
          <p className="!font-mono !font-bold !text-primary-base !text-6xl !leading-none">
            404
          </p>
          <h1 className="mt-3 !text-gray-700 !text-2xl">Page Not Found</h1>
        </div>

        <p className="max-w-[360px] !text-gray-500 !text-sm">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link href="/" className="btn btn--primary !text-sm">
          Back to Home
        </Link>
      </div>
    </WindowLayout>
  );
}
