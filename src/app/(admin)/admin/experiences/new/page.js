import Link from 'next/link';
import { ADMIN_FORM_MODE } from '@/constants/admin';
import ExperiencesFormWrapper from '@/components/admin/ExperiencesFormWrapper';

const title = 'experience';

export default async function AdminExperienceNew({ params }) {
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
        Create a new <span className="capitalize">{title}</span> data
      </h2>

      <ExperiencesFormWrapper mode={ADMIN_FORM_MODE.CREATE} />
    </section>
  );
}
