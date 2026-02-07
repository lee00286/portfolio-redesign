import Link from 'next/link';
import React from 'react';

function GridView({
  entityName = '',
  uniqueKey = '',
  items,
  isArchived = false,
  usageMap = {}
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
            className={`
              data-grid-item ${
                usageMap?.[item.id]?.count > 0 ? 'grid-warning' : ''
              }
            `}
          >
            {usageMap?.[item.id]?.count > 0 && (
              <span className="tooltip z-[2] absolute top-2 left-2 badge badge-warning">
                In Use
                <span className="tooltip-text">
                  <strong>Use Count</strong>: {usageMap[item.id].count}
                  <br />
                  <strong>Used In</strong>:
                  <br />
                  {usageMap[item.id].entities.map((entity, index) => (
                    <React.Fragment key={entity}>
                      {index > 0 && <br />}
                      -&nbsp;{entity}
                    </React.Fragment>
                  ))}
                </span>
              </span>
            )}

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
