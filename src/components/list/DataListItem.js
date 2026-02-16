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

  return (
    <tr
      onClick={() => {
        router.push(`/${dbTableName}/${data[uniqueIdKey]}`);
      }}
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
