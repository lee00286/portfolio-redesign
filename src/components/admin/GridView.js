import Link from 'next/link';

function GridView({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {items.map((item) => (
        <div key={`item-${item[uniqueKey]}`}>
          <Link
            href={`/admin/${entityName}/${item[uniqueKey]}`}
            className="data-grid-item"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.image_alt_en || item.image_alt_ko || 'Preview image'}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default GridView;
