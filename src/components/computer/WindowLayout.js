import TitleBar from './TitleBar';

/**
 * Layout of the browser window.
 * @param {*} children
 * @returns
 */
function WindowLayout({ children }) {
  return (
    <div className="px-0 sm:px-5 xxmd:px-8 py-0 sm:py-6 h-full overflow-hidden">
      {/* Window */}
      <div
        id="window"
        className="rounded-0 sm:rounded-xl w-full h-full bg-yellow-50"
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
