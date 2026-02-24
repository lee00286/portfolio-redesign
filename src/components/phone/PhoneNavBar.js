import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_LANG } from '@/constants/language';
import { mblMenuPages } from '@/constants/sidebar';

/**
 * Mobile bottom navbar
 * Displays nav buttons in a horizontal bar
 */
function PhoneNavBar({ lang = DEFAULT_LANG }) {
  return (
    <aside
      aria-label="Sidebar"
      className="mbl-only flex justify-around items-stretch gap-3 border-t px-4 pt-2.5 pb-6 bg-primary-100"
    >
      <nav aria-label="Site navigation" className="my-auto w-full">
        <ul className="flex justify-around items-stretch gap-3 m-0 p-0 list-none">
          {mblMenuPages.map((menuPage, index) => (
            <li key={`phone-navbar-${index}`} className="flex-1">
              <Link
                className="phone-nav-btn"
                href={menuPage.href}
                aria-label={menuPage.title[lang] || menuPage.title.en}
              >
                <div className="phone-nav-icon">
                  <Image
                    src={menuPage.iconSrc}
                    alt={menuPage.iconAlt[lang] || menuPage.iconAlt.en}
                    width={menuPage.width}
                    height={menuPage.height}
                  />
                </div>
                <span className="phone-nav-label">
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

export default PhoneNavBar;
