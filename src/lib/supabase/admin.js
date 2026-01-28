import {
  SUPABASE_ADMIN_SERVICE_ROLE_KEY,
  SUPABASE_URL
} from '@/constants/supabase';

export const createAdminSupabaseServer = () => {
  if (!SUPABASE_URL || !SUPABASE_ADMIN_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase server env');
    // return null;
  }

  return createClient(SUPABASE_URL, SUPABASE_ADMIN_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

const getAdminServerData = cache(async (tableName, options = {}) => {
  const supabase = createAdminSupabaseServer();

  if (!supabase) {
    throw new Error('Supabase server not initialized');
  }

  const {
    select = '*',
    order = 'created_at',
    ascending = false,
    limit = 5,
    filters = {}
  } = options;

  try {
    let query = supabase.from(tableName).select(select);

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    query = query.order(order, { ascending }).limit(limit);

    const { data, error } = await query;

    if (error) {
      console.error(`Server Data Fetch Error for ${tableName}:`, error);
      return { data: [], error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected server data fetch error:', error);
    return { data: [], error };
  }
});

export async function getAdminSupabaseData(tableName, options = {}) {
  const { data, error } = await getAdminServerData(tableName, options);
  return { dbData: data, error };
}
