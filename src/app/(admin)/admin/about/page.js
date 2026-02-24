import { getAdminSupabaseData } from '@/lib/supabase/admin';
import AboutEdit from '@/components/admin/AboutEdit';

const title = 'about';

export default async function AdminEducationPage({ params }) {
  const { dbData, error } = await getAdminSupabaseData(title, {
    limit: 1
  });

  if (error) {
    return <p className="error-text">Failed to load {title} data</p>;
  }

  const education = dbData?.[0] ?? null;

  return (
    <section className="!p-0 w-full">
      <h2 className="h3 mb-4 capitalize">{title}</h2>

      <AboutEdit initialData={education} />
    </section>
  );
}
