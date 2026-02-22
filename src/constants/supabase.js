export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
export const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
export const SUPABASE_ADMIN_SERVICE_ROLE_KEY =
  process.env.SUPABASE_ADMIN_SERVICE_ROLE_KEY ?? '';

// Simple Section Query Options
export const simpleSectionDefaultQueryOptions = {
  select: '*',
  order: 'created_at',
  ascending: false,
  limit: 5,
  skipSoftDelete: true
};

export const experiencesSimpleSectionQueryOptions = {
  select: '*',
  order: 'start_date',
  ascending: false,
  limit: 5,
  skipSoftDelete: true
};

// Data List Query Options
export const defaultQueryOptions = {
  select: '*',
  order: 'created_at',
  ascending: false,
  limit: 20,
  skipSoftDelete: true
};
