'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'About', href: '/admin/about' },
  { label: 'Educations', href: '/admin/educations' },
  { label: 'Experiences', href: '/admin/experiences' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Images', href: '/admin/images' }
];

function Sidebar() {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return null;
  }

  return (
    <aside className="w-48 border-r bg-white">
      <nav className="flex flex-col p-4 gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                rounded px-3 py-2 font-semibold text-sm
                ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'hover:bg-gray-100 text-black'
                }
              `}
              style={{ transition: 'background-color 0.2s ease-in-out' }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
