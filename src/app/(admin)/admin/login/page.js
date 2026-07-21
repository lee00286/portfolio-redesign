import { isPasswordLoginEnabled } from '@/lib/admin/allowList';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;

  return (
    <AdminLoginForm
      passwordLoginEnabled={isPasswordLoginEnabled()}
      errorCode={params?.error ?? null}
    />
  );
}

export default AdminLoginPage;
