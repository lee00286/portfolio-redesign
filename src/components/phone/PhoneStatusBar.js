import MenuBarClock from '@/components/computer/MenuBarClock';

/**
 * Mobile status bar
 */
function PhoneStatusBar() {
  return (
    <nav
      aria-label="Menu bar"
      className="mbl-only z-[20] flex-shrink-0 flex justify-between items-end rounded-tl-lg rounded-tr-lg px-6 pt-[17px] pb-[17px] w-full bg-primary-100"
    >
      <MenuBarClock />
      <a
        href="https://www.linkedin.com/in/yena-lee-00286/"
        target="_blank"
        rel="noopener noreferrer"
        className="pt-0.5 !font-semibold !text-gray-700 !text-xs hover:underline cursor-pointer"
      >
        <span aria-hidden="true">𓅿</span>
      </a>
    </nav>
  );
}

export default PhoneStatusBar;
