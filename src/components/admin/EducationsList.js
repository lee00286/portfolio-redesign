import Link from 'next/link';

function EducationsList({ items }) {
  if (!items || items.length === 0) {
    return <p className="error-text">No education entries found.</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((education) => (
        <li key={`education-${education.education_id}`}>
          <Link
            href={`/admin/educations/${education.education_id}`}
            className="block rounded-lg border px-4 py-3 hover:bg-muted transition"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="!font-bold">
                  {education.school_en || 'Untitled Education'}
                </p>
                <p className="!text-gray-600">{education.major_en || '—'}</p>
              </div>

              <span className="btn btn-primary">Edit</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default EducationsList;
