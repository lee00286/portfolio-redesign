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
            className="data-list-item"
          >
            <div className="flex maxMd:flex-col justify-between items-center maxMd:items-start gap-3">
              <div className="space-y-1">
                <div className="flex justify-start items-center gap-2">
                  <p className="!font-bold">
                    {education.school_en || 'Untitled Education'}
                  </p>
                  {education.is_active ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-error">Inactive</span>
                  )}
                </div>
                <p className="!text-gray-600">{education.major_en || '—'}</p>
              </div>

              <span className="btn btn-primary maxMd:!py-0.5 maxMd:!text-sm">
                Edit
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default EducationsList;
