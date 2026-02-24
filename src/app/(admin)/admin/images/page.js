import Link from 'next/link';
import {
  getAdminImageUsageMap,
  getAdminSupabaseData
} from '@/lib/supabase/admin';
import GridView from '@/components/admin/GridView';

const title = 'images';

export default async function AdminImageGridPage() {
  const { dbData, error } = await getAdminSupabaseData(title, {
    order: 'created_at',
    ascending: false
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const images = dbData ?? [];

  const imageIds =
    Array.isArray(images) && images?.length > 0 ? images.map((i) => i.id) : [];
  const usageMap = await getAdminImageUsageMap(imageIds);

  if (usageMap?.error) {
    return <p className="error-text">Failed to load image usage map</p>;
  }

  return (
    <section className="!p-0 w-full">
      <div className="flex sm-max:flex-col justify-between items-center sm-max:items-start gap-3 mb-4 w-full">
        <h2 className="h3 capitalize">{title}</h2>
        <Link href="/admin/images/new" className="btn btn-secondary">
          + Add New
        </Link>
      </div>

      {/* Active Images */}
      <GridView
        entityName="images"
        uniqueKey="id"
        items={images}
        usageMap={usageMap}
      />
    </section>
  );
}
