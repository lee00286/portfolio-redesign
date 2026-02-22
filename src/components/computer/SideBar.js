import Link from 'next/link';
import Image from 'next/image';
import SimpleSection from '../SimpleSection';
import { menuPages } from '@/constants/sidebar';

/**
 * Desktop sidebar
 * Shows left panel with about menuPage and navigation links
 */
function SideBar({ lang = 'en' }) {
  return (
    <aside
      aria-label="Sidebar"
      className="dskt-only mac-blur-bottom col-span-1 flex flex-col justify-start items-stretch gap-3 rounded-bl-lg px-5 py-5 bg-[rgba(255,255,255,0.2)]"
    >
      <SimpleSection
        dbTableName="about"
        desktopOnly={true}
        sectionClass="!mb-3 !p-0"
        sectionContainerClass="!bg-[rgba(255,255,255,0.7)]"
        lang={lang}
      />

      <nav aria-label="Site navigation">
        <ul className="flex flex-col justify-start items-stretch gap-3 list-none p-0 m-0">
          {menuPages.map((menuPage, index) => (
            <li key={`sidebar-button-${index}`}>
              <Link
                className="btn btn--nav"
                href={menuPage.href}
                aria-label={menuPage.title[lang] || menuPage.title.en}
              >
                <div className={`btn--sidebar ${menuPage.sidebarClass || ''}`}>
                  <Image
                    src={menuPage.iconSrc}
                    alt={menuPage.iconAlt[lang] || menuPage.iconAlt.en}
                    width={menuPage.width ?? 20}
                    height={menuPage.height ?? 20}
                  />
                </div>
                <span className="btn--nav-label">
                  {menuPage.title[lang] || menuPage.title.en}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
