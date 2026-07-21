import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { isAuthorizedAdmin } from '@/lib/admin/allowList';

const ADMIN_PATH = '/admin';

export async function GET(req) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');
  const oauthError = searchParams.get('error');

  if (oauthError || !code) {
    return NextResponse.redirect(`${origin}${ADMIN_PATH}/login?error=oauth`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}${ADMIN_PATH}/login?error=oauth`);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!isAuthorizedAdmin(user)) {
    // Signed in with Google but not on the allowlist
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.error('[ADMIN CALLBACK SIGNOUT ERROR]', signOutError);
    }

    return NextResponse.redirect(
      `${origin}${ADMIN_PATH}/login?error=not_authorized`
    );
  }

  return NextResponse.redirect(`${origin}${ADMIN_PATH}`);
}
