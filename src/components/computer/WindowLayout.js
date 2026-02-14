import TitleBar from './TitleBar';

/**
 * Layout of the browser window.
 * @param {*} children
 * @returns
 */
function WindowLayout({ children }) {
  return (
    <div className="px-0 sm:px-5 xxmd:px-7 py-0 sm:py-5 h-full overflow-hidden">
      {/* Window */}
      <div
        id="window"
        className="rounded-0 sm:rounded-xl border-[0.1px] border-[rgba(255,255,255,0.01)] w-full h-full bg-gray-50"
        style={{
          boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)'
        }}
      >
        {/* Window Title Bar */}
        <TitleBar />

        {/* Window Content */}
        {children}
      </div>
    </div>
  );
}

export default WindowLayout;
