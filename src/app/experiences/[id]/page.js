import Link from 'next/link';
import Image from 'next/image';
import SimpleSection from '@/components/SimpleSection';
import Details from '@/components/Details';

const sections = [
  {
    title: 'Experiences',
    description: 'List of experiences.',
    dbTableName: 'experiences',
    iconSrc: '/img/icons/work-bag-icon.svg',
    iconAlt: 'Work bag icon'
  }
];

export default async function ExperienceDetails({ params }) {
  const { id: experienceId } = await params;

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
        <aside className="row-start-2 xxmd:row-auto xxmd:col-span-1 flex xxmd:flex-col justify-around xxmd:justify-start items-stretch gap-3 rounded-bl-md sm:rounded-bl-xl rounded-br-md sm:rounded-br-xl xxmd:rounded-br-none px-4 sm:px-5 py-2.5 xxmd:py-6 bg-primary-200">
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
                className="btn btn--nav"
                href={`#${section.title ? section.title.toLowerCase() : ''}`}
                rel="noopener noreferrer"
                aria-label={section.iconAlt}
              >
                <Image
                  aria-hidden
                  src={section.iconSrc}
                  alt={section.iconAlt}
                  width={section.width ?? 20}
                  height={section.height ?? 20}
                  className={`btn--sidebar ${section.sidebarClass ? section.sidebarClass : ''}`}
                />
                <span className="hidden md:inline-block">{section.title}</span>
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
            <div className="z-[20] flex justify-between items-center sm:rounded-tl-xl sm:rounded-tr-xl px-4 py-2 w-full h-[40px] bg-yellow-200">
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

              <Details
                dbTableName="experiences"
                dbFilters={{
                  experience_id: experienceId
                }}
                dataId={experienceId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
