import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import ListView from '@/components/admin/ListView';

const title = 'experiences';

export default async function AdminExperienceListPage() {
  const { dbData, error } = await getAdminSupabaseData(title, {
    order: 'start_date',
    ascending: false,
    skipSoftDelete: false
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const experiences = dbData ?? [];
  const activeExperiences =
    experiences?.filter((experience) => !experience.deleted_at) ?? [];
  const archivedExperiences =
    experiences?.filter((experience) => !!experience.deleted_at) ?? [];

  return (
    <section className="!p-0 w-full">
      <div className="flex sm-max:flex-col justify-between items-center sm-max:items-start gap-3 mb-4 w-full">
        <h2 className="h3 capitalize">{title}</h2>
        <Link href="/admin/experiences/new" className="btn btn-secondary">
          + Add New
        </Link>
      </div>

      {/* Active Experiences */}
      <ListView
        entityName="experiences"
        uniqueKey="experience_id"
        headingKey="company_name_en"
        subheadingKey="pos_title_en"
        items={activeExperiences}
      />

      {/* Archived Experiences */}
      {archivedExperiences.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer font-bold text-sm text-gray-600">
            Archived ({archivedExperiences.length})
          </summary>

          <div className="mt-3">
            <ListView
              entityName="experiences"
              uniqueKey="experience_id"
              headingKey="company_name_en"
              subheadingKey="pos_title_en"
              items={archivedExperiences}
              isArchived
            />
          </div>
        </details>
      )}
    </section>
  );
}
