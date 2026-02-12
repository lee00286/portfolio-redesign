import Image from 'next/image';
import ScreenLayout from './ScreenLayout';

/**
 * Layout of the computer monitor.
 * @param {*} children
 * @returns
 */
function ComputerLayout({ children }) {
  return (
    <div className="flex justify-center items-center px-0 sm:px-4 xsm:px-8 lg:px-[72px] py-8 lg:py-[72px] w-full h-full">
      <div className="relative mx-auto my-0 max-w-desktop w-full h-full xxmd:h-auto xxmd:aspect-[4/3] xl:aspect-[16/10] bg-primary-600 rounded-2xl border-4 border-primary-500 mb-[20px] md:mb-[40px] xxmd:mb-[50px] p-4 xs:p-6 shadow-inner">
        {/* Computer Monitor */}
        <div className="relative flex justify-center items-center m-auto rounded-md sm:rounded-xl w-full h-full bg-[#3676C4] shadow-inner">
          <ScreenLayout>{children}</ScreenLayout>

          {/* Wallpaper */}
          <div className="z-[1] absolute top-0 left-0 rounded-md sm:rounded-xl w-full h-full xxmd:h-auto max-h-full object-cover overflow-hidden">
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

        {/* Computer Stand */}
        <div className="absolute bottom-[-20px] md:bottom-[-40px] xxmd:bottom-[-50px] left-1/2 -translate-x-1/2 rounded-full w-[100px] md:w-[200px] h-[10px] md:h-[20px] bg-primary-600"></div>
      </div>
    </div>
  );
}

export default ComputerLayout;
