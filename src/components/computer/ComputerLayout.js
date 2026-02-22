import Image from 'next/image';
import { DEFAULT_LANG } from '@/constants/language';
import ScreenLayout from './ScreenLayout';

/**
 * Layout of the device frame
 * Desktop (>= xmd): Computer monitor
 * Mobile (< xmd): Phone frame
 */
function ComputerLayout({ children, lang = DEFAULT_LANG }) {
  return (
    <div className="device-outer">
      <div className="device-container">
        {/* Device Frame */}
        <div className="device-frame">
          {/* Screen */}
          <div className="device-screen">
            {/* Dynamic Island (Mobile) */}
            <div
              className="mbl-only z-[30] absolute top-[12px] left-1/2 -translate-x-1/2 rounded-full w-[120px] h-[35px] bg-black"
              aria-hidden="true"
            />

            <ScreenLayout lang={lang}>{children}</ScreenLayout>

            {/* Wallpaper */}
            <div className="z-[1] absolute top-0 left-0 w-full h-full max-h-full object-cover overflow-hidden">
              <Image
                src="/img/mac-bg.jpg"
                alt="Default background image with orange and blue lights."
                width={0}
                height={0}
                sizes="100vw"
                priority
                fetchPriority="high"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Home Indicator (Mobile) */}
            <div
              className="mbl-only z-[30] absolute bottom-[8px] left-1/2 -translate-x-1/2"
              aria-hidden="true"
            >
              <div className="rounded-full w-[134px] h-[5px] bg-primary-600/20" />
            </div>
          </div>
        </div>

        {/* Computer Stand (Desktop) */}
        <div className="dskt-only z-[1] absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-full">
          <div
            className="mx-auto w-[80px] h-[40px] bg-gray-800"
            style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
          />
          <div className="mx-auto rounded-b-sm w-[140px] h-[6px] bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default ComputerLayout;
