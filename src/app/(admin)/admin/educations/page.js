import Link from 'next/link';
import { getAdminSupabaseData } from '@/lib/supabase/admin';
import EducationsList from '@/components/admin/EducationsList';

const title = 'educations';

export default async function AdminEducationListPage() {
  const { dbData, error } = await getAdminSupabaseData(title, {
    order: 'start_date',
    ascending: false
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const educations = dbData ?? [];

  return (
    <section className="!p-0 w-full">
      <div className="flex sm-max:flex-col justify-between items-center sm-max:items-start gap-3 mb-4 w-full">
        <h2 className="h3 capitalize">{title}</h2>
        <Link href="/admin/educations/new" className="btn btn-secondary">
          + Add New
        </Link>
      </div>

      <EducationsList items={educations} />
    </section>
  );
}
