import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import ListView from '@/components/admin/ListView';

const title = 'educations';

export default async function AdminEducationListPage() {
  const { dbData, error } = await getAdminSupabaseData(title, {
    order: 'start_date',
    ascending: false,
    skipSoftDelete: false
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const educations = dbData ?? [];
  const activeEducations =
    educations?.filter((education) => !education.deleted_at) ?? [];
  const archivedEducations =
    educations?.filter((education) => !!education.deleted_at) ?? [];

  return (
    <section className="!p-0 w-full">
      <div className="flex sm-max:flex-col justify-between items-center sm-max:items-start gap-3 mb-4 w-full">
        <h2 className="h3 capitalize">{title}</h2>
        <Link href="/admin/educations/new" className="btn btn-secondary">
          + Add New
        </Link>
      </div>

      {/* Active Educations */}
      <ListView
        entityName="educations"
        uniqueKey="education_id"
        items={activeEducations}
      />

      {/* Archived Educations */}
      {archivedEducations.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer font-bold text-sm text-gray-600">
            Archived ({archivedEducations.length})
          </summary>

          <div className="mt-3">
            <ListView
              entityName="educations"
              uniqueKey="education_id"
              items={archivedEducations}
              isArchived
            />
          </div>
        </details>
      )}
    </section>
  );
}
