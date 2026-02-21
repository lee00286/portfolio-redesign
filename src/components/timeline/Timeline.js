import { getSupabaseData } from '@/lib/supabase/getSupbaseData';
import { getLang } from '@/lib/lang';
import { handleSupabaseError } from '@/util/helpers';
import Link from 'next/link';

/**
 * Vertical timeline list
 * Fetches data and renders timeline items
 */
async function Timeline({
  title = '',
  dbTableName = '',
  uniqueKey = 'id',
  queryOptions = {},
  renderItem // card content
}) {
  const lang = await getLang();
  const { dbData, error } = await getSupabaseData(dbTableName, queryOptions);

  return (
    <div className="timeline">
      {title && <h2 className="m-0 mb-4">{title}</h2>}

      {Array.isArray(dbData) && dbData.length > 0 ? (
        <ol className="timeline-list">
          {dbData.map((data, index) => (
            <li key={data.id || index} className="timeline-item">
              {/* Timeline decoration */}
              <div className="timeline-marker" aria-hidden="true">
                <Link
                  href={
                    (uniqueKey ? data[uniqueKey] : data.id)
                      ? `/${dbTableName}/${uniqueKey ? data[uniqueKey] : data.id}`
                      : '#'
                  }
                >
                  <div className="timeline-dot" />
                </Link>
                {index < dbData.length - 1 && <div className="timeline-line" />}
              </div>

              {/* Card content */}
              <div className="timeline-content">
                {renderItem({ data, uniqueKey, index, lang })}
              </div>
            </li>
          ))}
        </ol>
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

export default Timeline;
