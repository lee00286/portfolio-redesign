import Image from 'next/image';
import Link from 'next/link';
import { getFilteredEducationData } from '@/util/helpers';
import { DEFAULT_LANG } from '@/constants/language';

/**
 * Displays education data.
 * Skips rendering if the entry is marked inactive.
 */
function EducationCard({ data, lang = DEFAULT_LANG }) {
  if (!data) return <></>;

  const filteredData = getFilteredEducationData(data, lang);

  if (filteredData.is_active === false) return <></>;

  return (
    <div className="simple-section--card">
      {filteredData.image_url && (
        <Image
          src={filteredData.image_url}
          alt={filteredData.school || 'Education card image'}
          width={600}
          height={192}
          className="rounded-lg w-full h-48 object-cover"
        />
      )}

      <div className="w-full">
        {(filteredData.start_date || filteredData.end_date) && (
          <p className="eyebrow mb-1.5">
            <span className="text-nowrap">
              {filteredData.start_date || (lang === 'ko' ? '미정' : 'Unknown')}
            </span>{' '}
            &mdash;&nbsp;
            <span className="text-nowrap">
              {filteredData.end_date || (lang === 'ko' ? '현재' : 'Present')}
            </span>
          </p>
        )}

        {(filteredData.major || filteredData.school) && (
          <h3 className="h4">
            <Link
              href={filteredData.id ? `/educations/${filteredData.id}` : '#'}
              className="text-primary-base no-underline hover:underline focus:underline"
              style={{ transition: 'color 0.15s ease' }}
            >
              {filteredData.major || ''}
              {filteredData.school && ` - ${filteredData.school}`}
            </Link>
          </h3>
        )}

        {filteredData.location && (
          <p className="mt-1 !text-gray-500 !font-medium !text-sm">
            {filteredData.location}
          </p>
        )}
      </div>

      {filteredData.description && (
        <p className="!text-gray-700">{filteredData.description}</p>
      )}
    </div>
  );
}

export default EducationCard;
