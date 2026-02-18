import Link from 'next/link';
import Image from 'next/image';
import SimpleSection from '../SimpleSection';

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

/**
 * Sidebar of the computer screen.
 * Dislpays navigation menus.
 * @returns
 */
function SideBar() {
  return (
    <aside
      className="row-start-2 xxmd:row-auto xxmd:col-span-1 flex xxmd:flex-col justify-around xxmd:justify-start items-stretch gap-3 xxmd:rounded-bl-lg px-4 sm:px-5 py-2.5 xxmd:py-5 bg-[rgba(255,255,255,0.2)]"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <SimpleSection
        dbTableName="about"
        desktopOnly={true}
        sectionClass="!mb-3 !p-0"
        sectionContainerClass="!bg-[rgba(255,255,255,0.7)]"
      />

      {Array.isArray(sections) &&
        sections.length > 0 &&
        sections.map((section, index) => (
          <Link
            key={`sidebar-button-${index}`}
            className="btn btn--nav"
            href={`/${section.title ? section.title.toLowerCase() : ''}`}
            rel="noopener noreferrer"
            aria-label={section.iconAlt}
          >
            <div
              className={`btn--sidebar ${section.sidebarClass ? section.sidebarClass : ''}`}
            >
              <Image
                aria-hidden
                src={section.iconSrc}
                alt={section.iconAlt}
                width={section.width ?? 20}
                height={section.height ?? 20}
              />
            </div>
            <span className="hidden md:inline-block !text-sm font-medium">
              {section.title}
            </span>
          </Link>
        ))}
    </aside>
  );
}

export default SideBar;
