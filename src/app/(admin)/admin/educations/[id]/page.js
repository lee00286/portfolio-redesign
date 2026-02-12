import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import EducationsFormWrapper from '@/components/admin/EducationsFormWrapper';

const dbTitle = 'educations';
const title = 'education';

export default async function AdminEducationPage({ params }) {
  const { id: educationId } = await params;

  const { dbData, error } = await getAdminSupabaseData(dbTitle, {
    select: '*, logo:images (*)',
    limit: 1,
    skipSoftDelete: false,
    filters: { education_id: educationId }
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const education = dbData?.[0] ?? null;

  if (!education) {
    return (
      <p className="error-text">
        Education data with ID{' '}
        <code className="bg-red-100 text-red-500">{educationId}</code> not
        found.
      </p>
    );
  }

  return (
    <section className="!p-0 w-full">
      <div className="flex justify-start mb-4">
        <Link
          href="/admin/educations"
          className="btn btn-secondary !py-0.5 !text-sm"
        >
          ← Back
        </Link>
      </div>

      <h2 className="h3 mb-4">
        <span className="capitalize">{title} ID</span>: {educationId}
      </h2>

      <EducationsFormWrapper education={education} />
    </section>
  );
}
