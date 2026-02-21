import TitleBar from './TitleBar';
import PhoneTitleBar from '@/components/phone/PhoneTitleBar';

/**
 * Browser window layout
 */
function WindowLayout({ children }) {
  return (
    <div className="px-0 xmd:px-7 py-0 xmd:py-5 h-full overflow-hidden">
      {/* Window */}
      <div
        id="window"
        className="grid grid-cols-none grid-rows-[60px_1fr] xmd:grid-rows-[40px_1fr] rounded-0 xmd:rounded-xl xmd:border-[0.1px] border-[rgba(255,255,255,0.01)] w-full h-full xmd:bg-gray-50"
        style={{
          boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)'
        }}
      >
        {/* Desktop Title Bar */}
        <TitleBar />

        {/* Mobile Title Bar */}
        <PhoneTitleBar />

        {/* Window Content */}
        <div className="rounded-0 xmd:rounded-b-xl w-full h-full max-h-full bg-gray-50 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default WindowLayout;
