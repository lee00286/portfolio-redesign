import NewWindowIcon from '../icons/NewWindowIcon';
import GitHubLogo from '../icons/GitHubLogo';

function ExperienceCard({ projectIndex, data }) {
  if (!data) return <></>;

  const lang = 'en';

  const filteredData = {
    logo: data.logo,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    company_name: lang === 'ko' ? data.company_name_ko : data.company_name_en,
    company_description:
      lang === 'ko' ? data.company_description_ko : data.company_description_en,
    position: lang === 'ko' ? data.pos_title_ko : data.pos_title_en,
    pos_description:
      lang === 'ko' ? data.pos_description_ko : data.pos_description_en,
    location: lang === 'ko' ? data.location_ko : data.location_en,
    description: lang === 'ko' ? data.description_ko : data.description_en,
    detail: lang === 'ko' ? data.detail_ko : data.detail_en,
    tech_stack: data.tech_stack || ''
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };

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

          <div className="flex justify-end items-center gap-2.5 md:gap-4">
            {filteredData.url && (
              <a
                href={filteredData.url}
                target="_blank"
                rel="noopener"
                className="btn btn--link !text-sm"
              >
                <span className="hidden md:block">Demo</span>
                <NewWindowIcon />
              </a>
            )}
            {filteredData.github && (
              <a
                href={filteredData.github}
                target="_blank"
                rel="noopener"
                className="btn btn--link !text-sm"
              >
                <span className="hidden md:block">GitHub</span>
                <GitHubLogo />
              </a>
            )}
          </div>
        </div>

        {(filteredData.position || filteredData.company_name) && (
          <h3>
            {filteredData.position || ''}
            {filteredData.company_name && ` - ${filteredData.company_name}`}
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
                key={`project-${projectIndex}-tech-stack-${index}`}
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
