import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import ProjectsFormWrapper from '@/components/admin/ProjectsFormWrapper';

const dbTitle = 'projects';
const title = 'project';

export default async function AdminProjectPage({ params }) {
  const { id: projectId } = await params;

  const { dbData, error } = await getAdminSupabaseData(dbTitle, {
    select: '*, logo:images (*)',
    limit: 1,
    skipSoftDelete: false,
    filters: { project_id: projectId }
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const project = dbData?.[0] ?? null;

  if (!project) {
    return (
      <p className="error-text">
        Project data with ID{' '}
        <code className="bg-red-100 text-red-500">{projectId}</code> not found.
      </p>
    );
  }

  return (
    <section className="!p-0 w-full">
      <div className="flex justify-start mb-4">
        <Link
          href="/admin/projects"
          className="btn btn-secondary !py-0.5 !text-sm"
        >
          ← Back
        </Link>
      </div>

      <h2 className="h3 mb-4">
        <span className="capitalize">{title} ID</span>: {projectId}
      </h2>

      <ProjectsFormWrapper project={project} />
    </section>
  );
}
