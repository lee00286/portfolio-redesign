import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';
import { updateExperienceById } from '@/lib/admin/updateData';

export async function PUT(req, { params }) {
  try {
    // Get id from request
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Experience ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body || Object.keys(body)?.length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' },
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

    // Check if the experience exists
    const { data: exists } = await supabase
      .from('experiences')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (!exists) {
      return NextResponse.json(
        { error: 'Experience data not found' },
        { status: 404 }
      );
    }

    // Update the experience data
    if (body?.['experience_id']) {
      delete body['experience_id'];
    }

    const { error, data } = await supabase
      .from('experiences')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[ADMIN EXPERIENCE UPDATE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN EXPERIENCE UPDATE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/**
 * Restore
 */
export async function PATCH(req, { params }) {
  try {
    // Get id from request
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Experience ID is required' },
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

    return updateExperienceById({
      supabase,
      id,
      updateData: {
        deleted_at: null,
        is_active: false
      },
      notFoundMessage: 'Archived experience data not found'
    });
  } catch (err) {
    console.error('[ADMIN EXPERIENCE RESTORE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/**
 * Soft Delete
 */
export async function DELETE(req, { params }) {
  try {
    // Get id from request
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Experience ID is required' },
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

    return updateExperienceById({
      supabase,
      id,
      updateData: {
        deleted_at: new Date().toISOString(),
        is_active: false
      },
      notFoundMessage: 'Experience data not found'
    });
  } catch (err) {
    console.error('[ADMIN EXPERIENCE DELETE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
