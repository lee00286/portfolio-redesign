import { cache } from 'react';
import { createSupabaseServer } from '@/lib/supabase';

export const getServerData = cache(async (tableName, options = {}) => {
  const supabase = createSupabaseServer();

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

export async function getSupabaseData(tableName, options = {}) {
  const { data, error } = await getServerData(tableName, options);
  return { dbData: data, error };
}
