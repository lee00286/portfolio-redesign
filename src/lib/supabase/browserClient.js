import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/supabase';

// Browser Supabase client for client components
export const createSupabaseBrowserClient = () =>
  createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
