import { getSupabaseData } from '@/lib/supabase/getSupbaseData';
import { getFilteredExperienceData } from '@/util/helpers';
import DetailsMarkdown from './markdown/DetailsMarkdown';

async function Details({ dbTableName = '', dbFilters = {}, dataId = '' }) {
  if (!dbTableName || !dbFilters || !Object.keys(dbFilters).length) {
    return <></>;
  }

  const { dbData, error } = await getSupabaseData(dbTableName, {
    filters: dbFilters
  });

  if (error) {
    return (
      <p className="!font-bold !text-red-600">
        {error ?? `Failed to load ${dataId} data.`}
      </p>
    );
  }

  if (!Array.isArray(dbData) || dbData?.length === 0) {
    return (
      <p className="!font-bold !text-blue-600">
        Data for <span className="font-bold italic">{dataId}</span> was not
        found.
      </p>
    );
  }

  const data = getFilteredExperienceData(dbData[0]);

  return (
    <section className="details-section">
      <div className="space-y-3">
        <div className="flex justify-between items-center gap-3 w-full">
          {(data.start_date || data.end_date) && (
            <p className="eyebrow">
              <span className="text-nowrap">
                {data.start_date || 'Unknown'}
              </span>{' '}
              &mdash;&nbsp;
              <span className="text-nowrap">{data.end_date || 'Present'}</span>
            </p>
          )}
        </div>

        {data.position && (
          <h2>
            {data.position || ''}
            {data.company_name && ` - ${data.company_name}`}
          </h2>
        )}
        {data.location && (
          <p className="mt-1 !text-gray-500 !font-bold !text-sm">
            {data.location}
          </p>
        )}
      </div>

      {Array.isArray(data.tech_stack) && data.tech_stack.length > 0 && (
        <div className="flex flex-wrap justify-start items-center gap-2 mt-2 w-full">
          {data.tech_stack.map((stack, index) => (
            <p
              key={`${dbTableName}-${dataId}-tech-stack-${index}`}
              className="tech-stack"
            >
              {stack}
            </p>
          ))}
        </div>
      )}

      {data.description && <p>{data.description}</p>}

      {data.detail_md && <DetailsMarkdown data={data} />}
    </section>
  );
}

export default Details;
