import { DEFAULT_LANG } from '@/constants/language';
import MenuBar from '@/components/computer/MenuBar';
import SideBar from '@/components/computer/SideBar';
import PhoneStatusBar from '@/components/phone/PhoneStatusBar';
import PhoneNavBar from '@/components/phone/PhoneNavBar';

/**
 * Layout of the computer screen
 */
function ScreenLayout({ children, lang = DEFAULT_LANG }) {
  return (
    <main
      id="screen"
      tabIndex="-1"
      className="relative flex flex-col justify-start items-center p-0 w-full h-full"
    >
      {/* Desktop Menu Bar */}
      <MenuBar lang={lang} />

      {/* Mobile Status Bar */}
      <PhoneStatusBar />

      {/* Content Area */}
      <div className="z-[10] flex flex-col-reverse xmd:grid xmd:grid-rows-none xmd:grid-cols-[33%_auto] xxmd:grid-cols-[26%_auto] xmd:rounded-bl-lg xmd:rounded-br-lg w-full flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <SideBar lang={lang} />

        {/* Mobile Navbar */}
        <PhoneNavBar lang={lang} />

        {/* Page Content */}
        {children}
      </div>
    </main>
  );
}

export default ScreenLayout;
