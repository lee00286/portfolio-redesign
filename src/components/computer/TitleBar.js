'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Title bar of the browser window.
 * @returns
 */
function TitleBar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  const pathsArr = pathname?.split('/') || [];
  const currPath = pathsArr?.length > 1 ? `/#${pathsArr[1]}` : '/';

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="z-[20] flex items-center gap-3 sm:rounded-tl-xl sm:rounded-tr-xl border-b border-primary-200 py-2 px-4 w-full h-[40px] bg-primary-100">
      {/* Buttons */}
      <div className="flex justify-start items-center gap-1.5 shrink-0">
        <Link
          href={currPath}
          className="mac-btn mac-btn--close"
          aria-label="Close window"
        >
          <span className="sr-only">Close</span>
        </Link>
        <button className="mac-btn mac-btn--min" aria-label="Minimize window">
          <span className="sr-only">Minimize</span>
        </button>
        <button className="mac-btn mac-btn--max" aria-label="Maximize window">
          <span className="sr-only">Maximize</span>
        </button>
      </div>

      {/* URL Bar (breadcrumbs) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-primary-200 py-1 px-3 max-w-[320px] w-full bg-white">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-gray-400"
          >
            <title>Lock icon</title>
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 11V7a4 4 0 118 0v4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="!font-mono !text-[11px] !text-gray-500 truncate !leading-normal">
            yenalee.dev{pathname}
            {hash || ''}
          </p>
        </div>
      </div>

      {/* Spacer to balance the URL Bar */}
      <div className="w-[52px] shrink-0" />
    </div>
  );
}

export default TitleBar;
