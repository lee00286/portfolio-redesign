import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';
import { updateEducationById } from '@/lib/admin/updateData';

export async function PUT(req, { params }) {
  try {
    // Get id from request
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Education ID is required' },
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

    // Check if the education exists
    const { data: exists } = await supabase
      .from('educations')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (!exists) {
      return NextResponse.json(
        { error: 'Education data not found' },
        { status: 404 }
      );
    }

    // Update the education data
    if (body?.['education_id']) {
      delete body['education_id'];
    }

    const { error, data } = await supabase
      .from('educations')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[ADMIN EDUCATION UPDATE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN EDUCATION UPDATE API ERROR]', err);
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
        { error: 'Education ID is required' },
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

    return updateEducationById({
      supabase,
      id,
      updateData: {
        deleted_at: null,
        is_active: false
      },
      notFoundMessage: 'Archived education data not found'
    });
  } catch (err) {
    console.error('[ADMIN EDUCATION RESTORE API ERROR]', err);
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
        { error: 'Education ID is required' },
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

    return updateEducationById({
      supabase,
      id,
      updateData: {
        deleted_at: new Date().toISOString(),
        is_active: false
      },
      notFoundMessage: 'Education data not found'
    });
  } catch (err) {
    console.error('[ADMIN EDUCATION DELETE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
