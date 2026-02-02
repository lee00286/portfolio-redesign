import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    let rawFilePath = formData.get('filePath');
    const altEN = formData.get('altEN') || '';
    const altKO = formData.get('altKO') || '';
    const captionEN = formData.get('captionEN') || '';
    const captionKO = formData.get('captionKO') || '';

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    if (!rawFilePath) {
      rawFilePath = '';
    }

    // Remove leading and trailing slashes
    if (rawFilePath.startsWith('/')) {
      rawFilePath = rawFilePath.substring(1);
    }
    if (rawFilePath.endsWith('/')) {
      rawFilePath = rawFilePath.substring(0, rawFilePath.length - 1);
    }

    const supabase = createAdminSupabaseServer();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Admin disabled in this environment' },
        { status: 403 }
      );
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = rawFilePath ? `${rawFilePath}/${fileName}` : fileName;

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        contentType: file.type
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    // Insert the image url into the database
    const { data: image, error } = await supabase
      .from('images')
      .insert({
        image_url: imageUrl,
        image_alt_en: altEN,
        image_alt_ko: altKO,
        image_caption_en: captionEN,
        image_caption_ko: captionKO
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: image
    });
  } catch (err) {
    console.error('[IMAGE UPLOAD ERROR]', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
