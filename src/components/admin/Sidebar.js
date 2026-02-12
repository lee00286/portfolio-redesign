'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ConfirmModalButton from './ConfirmModalButton';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', exact: true },
  { label: 'About', href: '/admin/about' },
  { label: 'Educations', href: '/admin/educations' },
  { label: 'Experiences', href: '/admin/experiences' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Images', href: '/admin/images' }
];

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <aside className="w-40 md:w-48 border-r border-gray-900 bg-white flex flex-col">
      <nav className="flex flex-col p-4 gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

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
      <div className="p-4 border-t border-black">
        <ConfirmModalButton
          text="Logout"
          data={{
            title: 'Are you sure?',
            description: 'This will log you out of the admin dashboard.',
            danger: true,
            onConfirm: handleLogout
          }}
          buttonClass="btn btn-danger-inverse flex justify-center items-center w-full text-center text-sm"
        />
      </div>
    </aside>
  );
}

export default Sidebar;
