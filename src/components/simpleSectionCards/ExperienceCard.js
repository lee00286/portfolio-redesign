import { getFilteredExperienceData } from '@/util/helpers';
import Link from 'next/link';

const lang = 'en';

function ExperienceCard({ cardIndex, data }) {
  if (!data) return <></>;

  const filteredData = getFilteredExperienceData(data, lang);

  return (
    <div className="simple-section--card">
      {filteredData.image_url && (
        <img
          src={filteredData.image_url}
          alt={filteredData.company_name}
          className="w-full h-48 object-cover rounded"
        />
      )}

      <div className="w-full">
        <div className="flex justify-between items-center gap-3 mb-2 w-full">
          {(filteredData.start_date || filteredData.end_date) && (
            <p className="eyebrow">
              <span className="text-nowrap">
                {filteredData.start_date || 'Unknown'}
              </span>{' '}
              &mdash;&nbsp;
              <span className="text-nowrap">
                {filteredData.end_date || 'Present'}
              </span>
            </p>
          )}
        </div>

        {(filteredData.position || filteredData.company_name) && (
          <h3>
            <Link
              href={filteredData.id ? `/experiences/${filteredData.id}` : '#'}
              className="text-primary-500 hover:text-primary-500 focus:text-primary-500 visited:text-primary-500 no-underline hover:underline focus:underline visited:no-underline"
            >
              {filteredData.position || ''}
              {filteredData.company_name && ` - ${filteredData.company_name}`}
            </Link>
          </h3>
        )}

        {filteredData.location && (
          <p className="mt-1 !text-gray-400 !font-bold !text-sm">
            {filteredData.location}
          </p>
        )}
      </div>

      {filteredData.description && <p>{filteredData.description}</p>}

      {Array.isArray(filteredData.tech_stack) &&
        filteredData.tech_stack.length > 0 && (
          <div className="flex flex-wrap justify-start items-center gap-2 mt-2 w-full">
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
