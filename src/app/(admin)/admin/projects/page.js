import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import ListView from '@/components/admin/ListView';

const title = 'projects';

export default async function AdminProjectListPage() {
  const { dbData, error } = await getAdminSupabaseData(title, {
    order: 'start_date',
    ascending: false,
    skipSoftDelete: false
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const projects = dbData ?? [];
  const activeProjects =
    projects?.filter((project) => !project.deleted_at) ?? [];
  const archivedProjects =
    projects?.filter((project) => !!project.deleted_at) ?? [];

  return (
    <section className="!p-0 w-full">
      <div className="flex sm-max:flex-col justify-between items-center sm-max:items-start gap-3 mb-4 w-full">
        <h2 className="h3 capitalize">{title}</h2>
        <Link href="/admin/projects/new" className="btn btn-secondary">
          + Add New
        </Link>
      </div>

      {/* Active Projects */}
      <ListView
        entityName="projects"
        uniqueKey="project_id"
        headingKey="title_en"
        subheadingKey="pos_title_en"
        items={activeProjects}
      />

      {/* Archived Projects */}
      {archivedProjects.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer font-bold text-sm text-gray-600">
            Archived ({archivedProjects.length})
          </summary>

          <div className="mt-3">
            <ListView
              entityName="projects"
              uniqueKey="project_id"
              headingKey="title_en"
              subheadingKey="pos_title_en"
              items={archivedProjects}
              isArchived
            />
          </div>
        </details>
      )}
    </section>
  );
}
