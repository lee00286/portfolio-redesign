import MenuBarClock from '@/components/computer/MenuBarClock';
import LangSwitcher from '@/components/LangSwitcher';
import SideBar from '@/components/computer/SideBar';
import Link from 'next/link';

/**
 * Layout of the computer screen.
 * @param {*} children
 * @param {string} lang - Current language
 * @returns
 */
function ScreenLayout({ children, lang = 'en' }) {
  return (
    <main
      id="screen"
      tabIndex="-1"
      className="flex flex-col justify-start items-center p-0 w-full h-full"
    >
      {/* Menu Bar */}
      <nav
        aria-label="Menu bar"
        className="z-[20] flex justify-between items-center rounded-tl-lg rounded-tr-lg px-4 py-[6px] w-full h-[32px]"
        style={{
          backgroundColor: 'rgba(30, 35, 40, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      >
        <Link href="/" className="cursor-pointer text-white/80 hover:underline">
          <p className="!font-semibold !text-xs !text-white/80">
            <span aria-hidden="true">𓅿</span>
            &nbsp;&nbsp;
            <span>Portfolio</span>
          </p>
        </Link>
        <div className="flex items-center gap-2">
          <LangSwitcher lang={lang} />
          <MenuBarClock />
        </div>
      </nav>

      {/* Desktop */}
      <div className="z-[10] flex flex-col-reverse xxmd:grid xxmd:grid-rows-none xxmd:grid-cols-[26%_auto] xxmd:rounded-bl-lg xxmd:rounded-br-lg w-full h-[calc(100%-32px)]">
        {/* Left Screen (Sidebar) */}
        <SideBar lang={lang} />

        {/* Right Screen */}
        {children}
      </div>
    </main>
  );
}

export default ScreenLayout;
