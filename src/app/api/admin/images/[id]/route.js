import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';
import { extractStoragePath } from '@/util/helpers';

export async function PUT(req, { params }) {
  try {
    // Get id from request
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const body = await req.json();
    const { ...updateData } = body;

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

    // Check if the image exists
    const { data: exists } = await supabase
      .from('images')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (!exists) {
      return NextResponse.json(
        { error: 'Image data not found' },
        { status: 404 }
      );
    }

    // Update the image data
    const { error, data } = await supabase
      .from('images')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[ADMIN IMAGE UPDATE ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[ADMIN IMAGE UPDATE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/**
 * Hard Delete
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

    // Check if the image exists
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('id, image_url')
      .eq('id', id)
      .single();

    if (fetchError || !image) {
      return NextResponse.json(
        { error: 'Image data not found' },
        { status: 404 }
      );
    }

    // Remove file from Supabase storage
    const storagePath = extractStoragePath(image.image_url);
    if (storagePath) {
      const [bucket, ...pathParts] = storagePath.split('/');
      const filePath = pathParts.join('/');

      const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (storageError) {
        console.error('[STORAGE DELETE ERROR]', storageError);
        return NextResponse.json(
          { error: 'Failed to delete image file' },
          { status: 500 }
        );
      }
    }

    // Delete database row
    const { error: deleteError } = await supabase
      .from('images')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('[ADMIN IMAGE DB DELETE ERROR]', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true
    });
  } catch (err) {
    console.error('[ADMIN IMAGE DELETE API ERROR]', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
