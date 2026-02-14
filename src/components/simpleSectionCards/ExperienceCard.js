import { getFilteredExperienceData } from '@/util/helpers';
import Link from 'next/link';

const lang = 'en';

/**
 * Displays experience data.
 * Skips rendering if the entry is marked inactive.
 */
function ExperienceCard({ cardIndex, data }) {
  if (!data) return <></>;

  const filteredData = getFilteredExperienceData(data, lang);

  if (filteredData.is_active === false) return <></>;

  return (
    <div className="simple-section--card">
      {filteredData.image_url && (
        <img
          src={filteredData.image_url}
          alt={filteredData.company_name}
          className="rounded-lg w-full h-48 object-cover"
        />
      )}

      <div className="w-full">
        {(filteredData.start_date || filteredData.end_date) && (
          <p className="eyebrow mb-1.5">
            <span className="text-nowrap">
              {filteredData.start_date || 'Unknown'}
            </span>{' '}
            &mdash;&nbsp;
            <span className="text-nowrap">
              {filteredData.end_date || 'Present'}
            </span>
          </p>
        )}

        {(filteredData.position || filteredData.company_name) && (
          <h3>
            <Link
              href={filteredData.id ? `/experiences/${filteredData.id}` : '#'}
              className="text-primary-base no-underline hover:underline focus:underline"
              style={{ transition: 'color 0.15s ease' }}
            >
              {filteredData.position || ''}
              {filteredData.company_name && ` - ${filteredData.company_name}`}
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

      {Array.isArray(filteredData.tech_stack) &&
        filteredData.tech_stack.length > 0 && (
          <div className="flex flex-wrap justify-start items-center gap-1.5 mt-1 w-full">
            {filteredData.tech_stack.map((stack, index) => (
              <p
                key={`experience-${cardIndex}-tech-stack-${index}`}
                className="tech-stack"
              >
                {stack}
              </p>
            ))}
          </div>
        )}
    </div>
  );
}

export default ExperienceCard;
