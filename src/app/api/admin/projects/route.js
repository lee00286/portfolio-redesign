import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';

export async function POST(req) {
  try {
    const body = await req.json();
    const { project_id, ...newData } = body;

    if (!project_id) {
      return NextResponse.json(
        { error: 'Project ID is required.' },
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

    // Check if the project already exists
    const { data: exists } = await supabase
      .from('projects')
      .select('id')
      .eq('project_id', project_id)
      .maybeSingle();

    if (exists) {
      return NextResponse.json(
        { error: 'Project ID already exists' },
        { status: 409 }
      );
    }

    // Create the project data
    const { error, data } = await supabase
      .from('projects')
      .insert({
        project_id,
        ...newData
      })
      .select()
      .single();

    if (error) {
      console.error('[ADMIN PROJECT CREATE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN PROJECT API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
