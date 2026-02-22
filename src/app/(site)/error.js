'use client';

import WindowLayout from '@/components/computer/WindowLayout';

export default function Error({ reset }) {
  return (
    <WindowLayout>
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-12 w-full h-full text-center">
        <div>
          <p className="!font-mono !font-bold !text-red-500 !text-6xl !leading-none">
            Error
          </p>
          <h1 className="mt-3 !text-gray-700 !text-2xl">
            Something went wrong
          </h1>
        </div>

        <p className="max-w-[360px] !text-gray-500 !text-sm">
          An unexpected error occurred. Please try again.
        </p>

        <button onClick={() => reset()} className="btn btn--primary !text-sm">
          Try again
        </button>
      </div>
    </WindowLayout>
  );
}
