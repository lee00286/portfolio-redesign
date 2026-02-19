'use client';

import { useRouter } from 'next/navigation';

function DataListItem({
  dbTableName = '',
  uniqueIdKey = 'id',
  data = [],
  tableBody = []
}) {
  const router = useRouter();

  if (!data) return <></>;

  const handleNavigate = () => {
    router.push(`/${dbTableName}/${data[uniqueIdKey]}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate();
    }
  };

  return (
    <tr
      tabIndex={0}
      role="link"
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      aria-label={`View ${dbTableName.replace(/s$/, '')} details`}
    >
      {Array.isArray(tableBody) &&
        tableBody.length > 0 &&
        tableBody.map((field, j) => (
          <td key={`table-row-${data.id}-${j}`}>
            {Object.keys(data).includes(field) ? data[field] : ''}
          </td>
        ))}
    </tr>
  );
}

export default DataListItem;
