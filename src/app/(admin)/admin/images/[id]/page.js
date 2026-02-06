import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import ImagesFormWrapper from '@/components/admin/ImagesFormWrapper';

const dbTitle = 'images';
const title = 'image';

export default async function AdminImagePage({ params }) {
  const { id: imageId } = await params;

  const { dbData, error } = await getAdminSupabaseData(dbTitle, {
    select: '*',
    limit: 1,
    skipSoftDelete: false,
    filters: { id: imageId }
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const image = dbData?.[0] ?? null;

  if (!image) {
    return (
      <p className="error-text">
        Image data with ID{' '}
        <code className="bg-red-100 text-red-500">{imageId}</code> not found.
      </p>
    );
  }

  return (
    <section className="!p-0 w-full">
      <div className="flex justify-start mb-4">
        <Link
          href="/admin/images"
          className="btn btn-secondary !py-0.5 !text-sm"
        >
          ← Back
        </Link>
      </div>

      <h2 className="h3 mb-4">
        <span className="capitalize">{title} ID</span>: {imageId}
      </h2>

      <ImagesFormWrapper image={image} />
    </section>
  );
}
