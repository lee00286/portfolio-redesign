import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';
import { guardAdmin } from '@/lib/admin/guardAdmin';

export const GET = guardAdmin(async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const select = searchParams.get('select') || '*';
    const order = searchParams.get('order') || 'created_at';
    const ascending = searchParams.get('ascending') === 'true';
    const limit = searchParams.get('limit') || 5;
    const skipSoftDelete = searchParams.get('skipSoftDelete') === 'true';

    const supabase = createAdminSupabaseServer();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Admin disabled in this environment' },
        { status: 403 }
      );
    }

    // Apply options to the query
    let query = supabase.from('images').select(select);

    if (skipSoftDelete) {
      query = query.is('deleted_at', null);
    }

    query = query.order(order, { ascending }).limit(limit);

    // Get all images from the database based on the query
    const { data } = await query;

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN IMAGES GET API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
});
