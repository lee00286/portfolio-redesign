import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  SUPABASE_ADMIN_SERVICE_ROLE_KEY,
  SUPABASE_URL
} from '@/constants/supabase';

export const createAdminSupabaseServer = () => {
  if (!SUPABASE_URL || !SUPABASE_ADMIN_SERVICE_ROLE_KEY) {
    // throw new Error('Missing Supabase server env');
    return null;
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
    return {
      data: [],
      error: {
        message: 'Admin API is not available in this environment.',
        status: 403
      }
    };
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

export async function getAdminImageUsageMap(imageIds) {
  if (!imageIds?.length) return {};

  const supabase = createAdminSupabaseServer();

  if (!supabase) {
    return {
      data: [],
      error: {
        message: 'Admin API is not available in this environment.',
        status: 403
      }
    };
  }

  try {
    // Find the image data from the database that has the image fields
    const [{ data: educations }, { data: experiences }, { data: projects }] =
      await Promise.all([
        supabase.from('educations').select('id, logo').in('logo', imageIds),
        supabase.from('experiences').select('id, logo').in('logo', imageIds),
        supabase.from('projects').select('id, logo').in('logo', imageIds)
      ]);

    // Create image usage map
    return buildImageUsageMap(imageIds, {
      educations,
      experiences,
      projects
    });
  } catch (error) {
    console.error('Unexpected server data fetch error:', error);
    return { error };
  }
}

export function buildImageUsageMap(imageIds, entityRowsMap) {
  if (!Array.isArray(imageIds) || imageIds?.length === 0) {
    return {};
  }

  if (!entityRowsMap || Object.keys(entityRowsMap)?.length === 0) {
    return {};
  }

  const usageMap = {};

  imageIds.forEach((id) => {
    usageMap[id] = { count: 0, entities: [] };
  });

  Object.entries(entityRowsMap).forEach(([entity, rows]) => {
    if (!Array.isArray(rows) || rows?.length === 0) return;

    rows.forEach((row) => {
      if (!row?.logo) return;

      if (!usageMap[row.logo]) {
        usageMap[row.logo] = { count: 0, entities: [] };
      }

      usageMap[row.logo].count++;

      if (!usageMap[row.logo].entities.includes(entity)) {
        usageMap[row.logo].entities.push(entity);
      }
    });
  });

  return usageMap;
}
