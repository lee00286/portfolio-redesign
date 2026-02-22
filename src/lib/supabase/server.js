import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from '@/constants/supabase';

// For SSR or SSG
export const createSupabaseServer = () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase server env');
    // return null;
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    global: {
      fetch: async (url, options) => {
        const res = await fetch(url, options);

        if (!res.ok) {
          const text = await res.text();
          throw Object.assign(new Error(text), {
            status: res.status
          });
        }

        return res;
      }
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
