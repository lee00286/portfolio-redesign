import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';

export async function POST() {
  // Clear the Supabase session to fully sign out from OAuth
  const supabase = await createSupabaseServerClient();
  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    console.error('[ADMIN LOGOUT SIGNOUT ERROR]', signOutError);
  }

  const res = NextResponse.json({ success: true });

  // Clear the password cookie
  res.cookies.set('admin_auth', '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  });

  return res;
}
