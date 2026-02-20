import { getSupabaseData } from '@/lib/supabase/getSupbaseData';
import { getLang } from '@/lib/lang';
import { handleSupabaseError } from '@/util/helpers';
import { simpleSectionDefaultQueryOptions } from '@/constants/supabase';
import DataListItem from './DataListItem';

async function DataList({
  title = '',
  dbTableName = '',
  uniqueIdKey = 'id',
  queryOptions = simpleSectionDefaultQueryOptions,
  tableHeaders = [],
  tableBody = []
}) {
  const options =
    queryOptions && Object.keys(queryOptions).length > 0
      ? queryOptions
      : simpleSectionDefaultQueryOptions;

  const lang = await getLang();

  const { dbData, error } = await getSupabaseData(dbTableName, options);

  return (
    <div className="data-list">
      {title && <h2 className="m-0">{title}</h2>}

      {Array.isArray(dbData) && dbData.length > 0 ? (
        <div className="overflow-x-auto">
          <table>
            {Array.isArray(tableHeaders) && tableHeaders.length > 0 && (
              <thead>
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={`table-header-${index}`}>{header}</th>
                  ))}
                </tr>
              </thead>
            )}

            <tbody>
              {dbData.map((data, i) => (
                <DataListItem
                  key={`table-row-${i}`}
                  dbTableName={dbTableName}
                  uniqueIdKey={uniqueIdKey}
                  data={data}
                  tableBody={tableBody}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : Array.isArray(dbData) && dbData.length === 0 ? (
        <p className="!font-medium !text-gray-700 !text-sm">
          {lang === 'ko'
            ? `표시할 ${dbTableName}이(가) 없습니다.`
            : `No ${dbTableName} to display.`}
        </p>
      ) : (
        <p className="!font-medium !text-red-500 !text-sm">
          {handleSupabaseError(error, dbTableName)}
        </p>
      )}
    </div>
  );
}

export default DataList;
