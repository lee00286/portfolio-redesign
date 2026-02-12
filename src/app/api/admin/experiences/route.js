import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';

export async function POST(req) {
  try {
    const body = await req.json();
    const { experience_id, ...newData } = body;

    if (!experience_id) {
      return NextResponse.json(
        { error: 'experience_id is required.' },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseServer();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Admin disabled in this environment' },
        { status: 403 }
      );
    }

    // Check if the experience already exists
    const { data: exists } = await supabase
      .from('experiences')
      .select('id')
      .eq('experience_id', experience_id)
      .maybeSingle();

    if (exists) {
      return NextResponse.json(
        { error: 'Experience ID already exists' },
        { status: 409 }
      );
    }

    // Create the experience data
    const { error, data } = await supabase
      .from('experiences')
      .insert({
        experience_id,
        ...newData
      })
      .select()
      .single();

    if (error) {
      console.error('[ADMIN EXPERIENCE CREATE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN EXPERIENCE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
