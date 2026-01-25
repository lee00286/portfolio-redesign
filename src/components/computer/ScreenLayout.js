import SideBar from '@/components/computer/SideBar';

/**
 * Layout of the computer screen.
 * @param {*} children
 * @returns
 */
function ScreenLayout({ children }) {
  return (
    <div
      id="screen"
      role="main"
      tabIndex="-1"
      className="flex flex-col justify-start items-center p-0 w-full h-full"
    >
      {/* Menu Bar */}
      <div className="z-[20] flex justify-between items-center rounded-tl-sm md:rounded-tl-xl rounded-tr-md sm:rounded-tr-xl px-4 py-2 w-full h-[40px] bg-white opacity-50">
        <p className="!font-bold !text-xl"></p>
        <p className="!font-bold">TIME</p>
      </div>

      {/* Desktop */}
      <div className="z-[10] grid grid-rows-[auto_8%] xsm:grid-rows-[auto_10%] xxmd:grid-rows-none xxmd:grid-cols-[28%_auto] rounded-tl-md sm:rounded-tl-xl xxmd:rounded-tl-none rounded-tr-md sm:rounded-tr-xl xxmd:rounded-tr-none xxmd:rounded-bl-xl xxmd:rounded-br-xl w-full h-[calc(100%-40px)]">
        {/* Left Screen (Sidebar) */}
        <SideBar />

        {/* Right Screen */}
        {children}
      </div>
    </div>
  );
}

export default ScreenLayout;
