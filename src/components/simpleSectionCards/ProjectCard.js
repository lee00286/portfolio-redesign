import { getFilteredProjectData } from '@/util/helpers';
import NewWindowIcon from '../icons/NewWindowIcon';
import GitHubLogo from '../icons/GitHubLogo';

const lang = 'en';

function ProjectCard({ cardIndex, data }) {
  if (!data) return <></>;

  const filteredData = getFilteredProjectData(data, lang);

  return (
    <div className="simple-section--card">
      {filteredData.image_url && (
        <img
          src={filteredData.image_url}
          alt={filteredData.title}
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

        {(filteredData.position || filteredData.title) && (
          <h3>
            {filteredData.position || ''}
            {filteredData.title && ` - ${filteredData.title}`}
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
                key={`project-${cardIndex}-tech-stack-${index}`}
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

export default ProjectCard;
