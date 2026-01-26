'use server';

import { createSupabaseServer } from '@/lib/supabase/server';

export async function adminUpdate(table, payload, match) {
  const supabase = createSupabaseServer();

  const { error } = await supabase.from(table).update(payload).match(match);

  if (error) throw error;
}
