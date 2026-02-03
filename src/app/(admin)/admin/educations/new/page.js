import Link from 'next/link';
import { ADMIN_FORM_MODE } from '@/constants/admin';
import EducationsFormWrapper from '@/components/admin/EducationsFormWrapper';

const title = 'education';

export default async function AdminEducationNew({ params }) {
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
        Create a new <span className="capitalize">{title}</span> data
      </h2>

      <EducationsFormWrapper mode={ADMIN_FORM_MODE.CREATE} />
    </section>
  );
}
