import Sidebar from '@/components/admin/Sidebar';
import '@/app/admin.css';

export default async function AdminLayout({ children }) {
  return (
    <div className="admin flex h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col items-stretch overflow-hidden">
        <header className="flex items-center justify-between border-b py-4 px-6 bg-white">
          <h1 className="h2">Admin Dashboard</h1>

          <div className="flex justify-end items-center">
            <p>Local Admin</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-scroll flex justify-start items-stretch !mx-0 !p-6 max-w-7xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
