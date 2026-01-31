import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';

export async function POST(req) {
  try {
    const body = await req.json();
    const { education_id, ...newData } = body;

    if (!education_id) {
      return NextResponse.json(
        { error: 'Education ID is required.' },
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

    // Check if the education already exists
    const { data: exists } = await supabase
      .from('educations')
      .select('id')
      .eq('education_id', education_id)
      .maybeSingle();

    if (exists) {
      return NextResponse.json(
        { error: 'Education ID already exists' },
        { status: 409 }
      );
    }

    // Create the education data
    const { error, data } = await supabase
      .from('educations')
      .insert({
        education_id,
        ...newData
      })
      .select()
      .single();

    if (error) {
      console.error('[ADMIN EDUCATION CREATE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN EDUCATION API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(req) {
  try {
    // Get id from request
    const id = req.url.split('/').pop();

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

    // Check if the education already exists
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
    console.error('[ADMIN EDUCATION API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
