import Link from 'next/link';
import { getFilteredExperienceData } from '@/util/helpers';
import { DEFAULT_LANG } from '@/constants/language';

/**
 * Timeline card for experience
 */
function TimelineExperienceCard({
  data,
  uniqueKey = 'id',
  index = 0,
  lang = DEFAULT_LANG
}) {
  if (!data) return null;

  const d = getFilteredExperienceData(data, lang);

  if (d.is_active === false) return null;

  const urlPath = uniqueKey ? data[uniqueKey] : d.id;

  return (
    <>
      {(d.start_date || d.end_date) && (
        <p className="eyebrow mb-1">
          <span className="text-nowrap">
            {d.start_date || (lang === 'ko' ? '미정' : 'Unknown')}
          </span>{' '}
          &mdash;&nbsp;
          <span className="text-nowrap">
            {d.end_date || (lang === 'ko' ? '현재' : 'Present')}
          </span>
        </p>
      )}

      {(d.position || d.company_name) && (
        <h3 className="h5">
          <Link
            href={urlPath ? `/experiences/${urlPath}` : '#'}
            className="text-primary-base no-underline hover:underline focus:underline"
          >
            {d.position || ''}
            {d.company_name && ` - ${d.company_name}`}
          </Link>
        </h3>
      )}

      {d.location && (
        <p className="mt-0.5 !text-gray-500 !text-sm">{d.location}</p>
      )}

      {d.description && (
        <p className="mt-1.5 !text-gray-700 !text-sm">{d.description}</p>
      )}

      {Array.isArray(d.tech_stack) && d.tech_stack.length > 0 && (
        <div className="flex flex-wrap justify-start items-center gap-1.5 mt-2 w-full">
          {d.tech_stack.map((stack, i) => (
            <p key={`experience-${index}-ts-${i}`} className="tech-stack">
              {stack}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default TimelineExperienceCard;
