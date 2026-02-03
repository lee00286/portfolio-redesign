import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import ExperiencesFormWrapper from '@/components/admin/ExperiencesFormWrapper';

const dbTitle = 'experiences';
const title = 'experience';

export default async function AdminExperiencePage({ params }) {
  const { id: experienceId } = await params;

  const { dbData, error } = await getAdminSupabaseData(dbTitle, {
    select: '*, logo:images (*)',
    limit: 1,
    skipSoftDelete: false,
    filters: { experience_id: experienceId }
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const experience = dbData?.[0] ?? null;

  if (!experience) {
    return (
      <p className="error-text">
        Experience data with ID{' '}
        <code className="bg-red-100 text-red-500">{experienceId}</code> not
        found.
      </p>
    );
  }

  return (
    <section className="!p-0 w-full">
      <div className="flex justify-start mb-4">
        <Link
          href="/admin/experiences"
          className="btn btn-secondary !py-0.5 !text-sm"
        >
          ← Back
        </Link>
      </div>

      <h2 className="h3 mb-4">
        <span className="capitalize">{title} ID</span>: {experienceId}
      </h2>

      <ExperiencesFormWrapper experience={experience} />
    </section>
  );
}
