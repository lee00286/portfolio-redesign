import Image from 'next/image';
import SimpleSection from '@/components/SimpleSection';

export default function Home() {
  return (
    <div
      id="screen"
      role="main"
      tabIndex="-1"
      className="flex flex-col justify-start items-center p-0 w-full h-full"
    >
      {/* Menu Bar */}
      <div className="z-[20] flex justify-between items-center rounded-tl-xl rounded-tr-xl px-4 py-2 w-full h-[40px] bg-white opacity-50">
        <p className="!font-bold !text-xl"></p>
        <p className="!font-bold">TIME</p>
      </div>

      {/* Desktop */}
      <div className="z-[10] grid grid-rows-[auto_8%] xsm:grid-rows-[auto_10%] xxmd:grid-rows-none xxmd:grid-cols-[28%_auto] rounded-tl-xl xxmd:rounded-tl-none rounded-tr-xl xxmd:rounded-tr-none xxmd:rounded-bl-xl xxmd:rounded-br-xl w-full h-[calc(100%-40px)]">
        {/* Left Screen (Sidebar) */}
        <aside className="row-start-2 xxmd:row-auto xxmd:col-span-1 flex xxmd:flex-col justify-between xxmd:justify-start items-stretch gap-3 rounded-bl-xl rounded-br-xl xxmd:rounded-br-none px-5 py-4 xsm:py-6 bg-primary-200">
          <a
            className="btn btn--nav"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            <span className="hidden md:inline-block">Learn</span>
          </a>
          <a
            className="btn btn--nav"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            <span className="hidden md:inline-block">Examples</span>
          </a>
          <a
            className="btn btn--nav"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            <span className="hidden md:inline-block">Go to nextjs.org →</span>
          </a>
        </aside>

        {/* Right Screen */}
        <div className="px-0 sm:px-5 xxmd:px-8 py-0 sm:py-6 h-full overflow-hidden">
          {/* Window */}
          <div
            id="window"
            className="rounded-0 sm:rounded-lg w-full h-full bg-yellow-50"
          >
            {/* Window Title Bar */}
            <div className="z-[20] flex justify-between items-center rounded-tl-xl rounded-tr-xl px-4 py-2 w-full h-[40px] bg-yellow-200">
              <div className="flex justify-start items-center gap-2">
                <button className="mac-btn">
                  <Image
                    src="/img/icons/chrome-close-window-icon.svg"
                    alt="Google Chrome close window icon (x shape)"
                    width={8}
                    height={8}
                  />
                </button>
                <button className="mac-btn">
                  <Image
                    src="/img/icons/chrome-min-window-icon.svg"
                    alt="Google Chrome maximize window icon (minus shape)"
                    width={8}
                    height={8}
                  />
                </button>
                <button className="mac-btn">
                  <Image
                    src="/img/icons/chrome-max-window-icon.svg"
                    alt="Google Chrome maximize window icon (two arrows pointing at the left top corner and right bottom corner)"
                    width={8}
                    height={8}
                  />
                </button>
              </div>
            </div>

            <div className="px-4 py-2 w-full h-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-x-hidden overflow-y-scroll">
              <SimpleSection
                title="Projects"
                description="List of projects I have worked on."
                dbTableName="projects"
              />

              {/* <h1>
                THIS is a TesT
                <br />
                TEST
              </h1>
              <h2>THIS is a TesT</h2>
              <h3>THIS is a TesT</h3>
              <h4>THIS is a TesT</h4>
              <h5>THIS is a TesT</h5>
              <h6>THIS is a TesT</h6>
              <p>THIS is a TesT</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
