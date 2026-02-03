import Link from 'next/link';

function ListView({
  entityName = '',
  uniqueKey = '',
  items,
  isArchived = false
}) {
  if (!entityName || !uniqueKey) return <></>;

  if (!items || items.length === 0) {
    return (
      <p className="error-text">
        {isArchived ? 'No archived entries found.' : 'No entries found.'}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={`item-${item[uniqueKey]}`}>
          <Link
            href={`/admin/${entityName}/${item[uniqueKey]}`}
            className="data-list-item"
          >
            <div className="flex md-max:flex-col justify-between items-center md-max:items-start gap-3">
              <div className="space-y-1">
                <div className="flex justify-start items-center gap-2">
                  <p className="!font-bold">
                    {item.school_en || 'Untitled item'}
                  </p>
                  {item.deleted_at ? (
                    <span className="badge badge-warning">Archived</span>
                  ) : item.is_active ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-error">Inactive</span>
                  )}
                </div>
                <p className="!text-gray-600">{item.major_en || '—'}</p>

                {item.deleted_at && (
                  <p className="text-xs text-gray-400">
                    Archived at {new Date(item.deleted_at).toLocaleDateString()}
                  </p>
                )}
              </div>

              <span className="btn btn-primary md-max:!py-0.5 md-max:!text-sm">
                {item.deleted_at ? 'View' : 'Edit'}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ListView;
