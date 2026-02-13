import { cache } from 'react';
import { createSupabaseServer } from '@/lib/supabase/server';

export const getServerData = cache(async (tableName, options = {}) => {
  const supabase = createSupabaseServer();

  if (!supabase) {
    throw new Error('Supabase server not initialized');
  }

  const {
    select = '*',
    order = 'created_at',
    ascending = false,
    limit = 5,
    filters = {},
    skipSoftDelete = true
  } = options;

  try {
    let query = supabase.from(tableName).select(select);

    if (skipSoftDelete) {
      query = query.is('deleted_at', null);
    }

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    query = query.order(order, { ascending }).limit(limit);

    const { data } = await query.throwOnError();

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected server data fetch error:', error);
    return {
      data: [],
      error: {
        message: error.message ?? 'Unexpected server data fetch error',
        code: error.code ?? null,
        status: error.status ?? null
      }
    };
  }
});

export async function getSupabaseData(tableName, options = {}) {
  const { data, error } = await getServerData(tableName, options);
  return { dbData: data, error };
}
