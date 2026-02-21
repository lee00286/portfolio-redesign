import Link from 'next/link';
import { getFilteredEducationData } from '@/util/helpers';

/**
 * Timeline card for education
 */
function TimelineEducationCard({ data, uniqueKey = 'id', lang = 'en' }) {
  if (!data) return null;

  const d = getFilteredEducationData(data, lang);

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

      {(d.major || d.school) && (
        <h3 className="h5">
          <Link
            href={urlPath ? `/educations/${urlPath}` : '#'}
            className="text-primary-base no-underline hover:underline focus:underline"
          >
            {d.school || ''}
          </Link>
        </h3>
      )}

      {d.major && (
        <p className="mt-0.5 !font-medium !text-gray-600 !text-sm">{d.major}</p>
      )}

      {d.location && (
        <p className="mt-0.5 !text-gray-500 !text-sm">{d.location}</p>
      )}

      {d.description && (
        <p className="mt-1.5 !text-gray-700 !text-sm">{d.description}</p>
      )}
    </>
  );
}

export default TimelineEducationCard;
