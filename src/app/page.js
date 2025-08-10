import Link from 'next/link';
import Image from 'next/image';
import SimpleSection from '@/components/SimpleSection';

const sections = [
  {
    title: 'Educations',
    description: 'List of educations.',
    dbTableName: 'educations',
    iconSrc: '/img/icons/education-icon.svg',
    iconAlt: 'Education',
    width: 25,
    height: 25,
    sidebarClass: 'btn--sidebar-lg'
  },
  {
    title: 'Experiences',
    description: 'List of experiences.',
    dbTableName: 'experiences',
    iconSrc: '/img/icons/work-bag-icon.svg',
    iconAlt: 'Work bag icon'
  },
  {
    title: 'Projects',
    description: 'List of projects I have worked on.',
    dbTableName: 'projects',
    iconSrc: '/img/icons/write-icon.svg',
    iconAlt: 'Write icon'
  }
];

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
        <aside className="row-start-2 xxmd:row-auto xxmd:col-span-1 flex xxmd:flex-col justify-around xxmd:justify-start items-stretch gap-3 rounded-bl-xl rounded-br-xl xxmd:rounded-br-none px-5 py-4 xsm:py-6 bg-primary-200">
          <SimpleSection
            dbTableName="about"
            desktopOnly={true}
            sectionClass="!mb-4 !p-0"
            sectionContainerClass="!bg-[rgba(255,255,255,0.6)]"
          />

          {Array.isArray(sections) &&
            sections.length > 0 &&
            sections.map((section, index) => (
              <Link
                key={`sidebar-button-${index}`}
                className="btn btn--nav aspect-square xxmd:aspect-auto"
                href={`#${section.title ? section.title.toLowerCase() : ''}`}
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src={section.iconSrc}
                  alt={section.iconAlt}
                  width={section.width ?? 20}
                  height={section.height ?? 20}
                  className={`btn--sidebar ${section.sidebarClass ? section.sidebarClass : ''}`}
                />
                <span className="hidden xxmd:inline-block">
                  {section.title}
                </span>
              </Link>
            ))}
        </aside>

        {/* Right Screen */}
        <div className="px-0 sm:px-5 xxmd:px-8 py-0 sm:py-6 h-full overflow-hidden">
          {/* Window */}
          <div
            id="window"
            className="rounded-0 sm:rounded-xl w-full h-full bg-yellow-50"
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
                dbTableName="about"
                mobileOnly={true}
                sectionContainerClass="!bg-[rgba(255,255,255,0.8)]"
              />

              {Array.isArray(sections) &&
                sections.length > 0 &&
                sections.map((section, index) => (
                  <SimpleSection
                    key={`simple-section-${index}`}
                    title={section.title}
                    description={section.description}
                    dbTableName={section.dbTableName}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
