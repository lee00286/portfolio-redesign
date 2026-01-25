'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Title bar of the browser window.
 * @returns
 */
function TitleBar() {
  const pathname = usePathname();

  const pathsArr = pathname?.split('/') || [];
  const currPath = pathsArr?.length > 1 ? `/#${pathsArr[1]}` : '/';

  return (
    <div className="z-[20] flex justify-between items-center sm:rounded-tl-xl sm:rounded-tr-xl px-4 py-2 w-full h-[40px] bg-yellow-200">
      <div className="flex justify-start items-center gap-2">
        <Link href={currPath} className="mac-btn">
          <Image
            src="/img/icons/chrome-close-window-icon.svg"
            alt="Google Chrome close window icon (x shape)"
            width={8}
            height={8}
          />
        </Link>
        <button className="mac-btn">
          <Image
            src="/img/icons/chrome-min-window-icon.svg"
            alt="Google Chrome maximize window icon (minus shape)"
            width={8}
            height={8}
          />
        </button>
        <button className="mac-btn">
          <Image
            src="/img/icons/chrome-max-window-icon.svg"
            alt="Google Chrome maximize window icon (two arrows pointing at the left top corner and right bottom corner)"
            width={8}
            height={8}
          />
        </button>
      </div>
    </div>
  );
}

export default TitleBar;
