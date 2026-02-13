import Image from 'next/image';
import ScreenLayout from './ScreenLayout';

/**
 * Layout of the computer monitor with a sleek dark frame and gold accent.
 * @param {*} children
 * @returns
 */
function ComputerLayout({ children }) {
  return (
    <div className="relative flex justify-center items-center py-8 lg:py-[72px] px-0 sm:px-4 xsm:px-8 lg:px-[72px] w-full h-full">
      <div className="relative mx-auto my-0 mb-[16px] md:mb-[32px] xxmd:mb-[40px] max-w-desktop w-full h-full xxmd:h-auto xxmd:aspect-[4/3] xl:aspect-[16/10]">
        <div
          className="z-[5] relative w-full h-full rounded-2xl border border-gray-700 p-3 xs:p-4 sm:p-5 bg-gray-900"
          style={{
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
        >
          {/* Computer Monitor */}
          <div
            className="relative flex justify-center items-center m-auto rounded-lg w-full h-full overflow-hidden"
            style={{ boxShadow: 'inset 0 0 12px rgba(0,0,0,0.3)' }}
          >
            <ScreenLayout>{children}</ScreenLayout>

            {/* Wallpaper */}
            <div className="z-[1] absolute top-0 left-0 rounded-lg w-full h-full xxmd:h-auto max-h-full object-cover overflow-hidden">
              <Image
                src="/img/mac-bg.jpg"
                alt="Mac default background image with orange and blue lights spread out from the center top."
                width={0}
                height={0}
                sizes="100vw"
                priority
                fetchPriority="high"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Computer Stand */}
        <div className="z-[1] absolute bottom-[-16px] md:bottom-[-32px] xxmd:bottom-[-40px] left-1/2 -translate-x-1/2 w-full">
          <div
            className="mx-auto w-[150px] md:w-[80px] h-[16px] md:h-[32px] xxmd:h-[40px] bg-gray-800"
            style={{
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
            }}
          />
          <div className="mx-auto rounded-b-sm w-[210px] md:w-[140px] h-[4px] md:h-[6px] bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default ComputerLayout;
