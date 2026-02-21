import MenuBarClock from '@/components/computer/MenuBarClock';
import LangSwitcher from '@/components/LangSwitcher';

/**
 * Computer menu bar
 */
function MenuBar({ lang = 'en' }) {
  return (
    <nav
      aria-label={lang === 'en' ? 'Menu bar' : '메뉴 바'}
      className="dskt-only mac-blur z-[20] flex-shrink-0 flex justify-between items-center rounded-tl-lg rounded-tr-lg px-4 pt-[6px] pb-[6px] w-full h-[32px]"
    >
      <a
        href="https://www.linkedin.com/in/yena-lee-00286/"
        target="_blank"
        rel="noopener noreferrer"
        className="!font-semibold !text-white/80 !text-xs hover:underline cursor-pointer"
      >
        <span aria-hidden="true">𓅿</span>
        &nbsp;&nbsp;
        <span>Portfolio</span>
      </a>
      <div className="flex items-center gap-2">
        <LangSwitcher lang={lang} />
        <MenuBarClock />
      </div>
    </nav>
  );
}

export default MenuBar;
