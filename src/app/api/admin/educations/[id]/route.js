import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';

export async function PUT(req, { params }) {
  try {
    // Get id from request
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const body = await req.json();
    const { education_id, ...updateData } = body;

    if (Object.keys(updateData).length === 0) {
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
    const { error, data } = await supabase
      .from('educations')
      .update(updateData)
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
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
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
      .not('deleted_at', 'is', null)
      .maybeSingle();

    if (!exists) {
      return NextResponse.json(
        { error: 'Archived education data not found' },
        { status: 404 }
      );
    }

    // Update the education data
    const { error, data } = await supabase
      .from('educations')
      .update({
        deleted_at: null,
        is_active: false
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[ADMIN EDUCATION RESTORE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
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
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
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
    const deletedAt = new Date();
    const { error, data } = await supabase
      .from('educations')
      .update({
        deleted_at: deletedAt.toISOString(),
        is_active: false
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[ADMIN EDUCATION SOFT DELETE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN EDUCATION DELETE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
