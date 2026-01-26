import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/supabase';

// For CSR
export const createSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};
