import { NextResponse } from 'next/server';
import { createAdminSupabaseServer } from '@/lib/supabase/admin';
import { guardAdmin } from '@/lib/admin/guardAdmin';

export const POST = guardAdmin(async (req) => {
  try {
    const { imageIds = [] } = await req.json();

    if (!Array.isArray(imageIds) || imageIds?.length === 0) {
      return NextResponse.json(
        { error: 'Image IDs are required.' },
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

    // Find the image data from the database that has the image fields
    const [{ data: educations }, { data: experiences }, { data: projects }] =
      await Promise.all([
        supabase.from('educations').select('id, logo').in('logo', imageIds),
        supabase.from('experiences').select('id, logo').in('logo', imageIds),
        supabase.from('projects').select('id, logo').in('logo', imageIds)
      ]);

    // Create image usage map
    const usageMap = {};

    imageIds.forEach((id) => {
      usageMap[id] = { count: 0, entities: [] };
    });

    const registerImageUsage = (rows, entity) => {
      if (!Array.isArray(rows) || rows?.length === 0) return;

      rows?.forEach((row) => {
        if (!row.logo) return;

        usageMap[row.logo].count += 1;

        if (!usageMap[row.logo].entities.includes(entity)) {
          usageMap[row.logo].entities.push(entity);
        }
      });
    };

    registerImageUsage(educations, 'educations');
    registerImageUsage(experiences, 'experiences');
    registerImageUsage(projects, 'projects');

    return NextResponse.json({
      success: true,
      data: usageMap
    });
  } catch (err) {
    console.error('[IMAGE USAGE SUMMARY ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to fetch image usage summary' },
      { status: 500 }
    );
  }
});
