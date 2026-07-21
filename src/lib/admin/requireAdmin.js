import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { verifyAdminToken } from '@/lib/admin/auth';
import {
  isAuthorizedAdmin,
  isPasswordLoginEnabled
} from '@/lib/admin/allowList';

// Return the authorized admin user or null from a given Supabase client
export async function getAdminUser(supabase) {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return isAuthorizedAdmin(user) ? user : null;
}

// Authorize a route handler via Supabase session or the password login token
export async function isAdminRequestAuthorized() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (isAuthorizedAdmin(user)) {
    return true;
  }

  if (isPasswordLoginEnabled()) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_auth')?.value;

    if (await verifyAdminToken(token)) {
      return true;
    }
  }

  return false;
}
