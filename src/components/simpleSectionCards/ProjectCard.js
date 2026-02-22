import Image from 'next/image';
import Link from 'next/link';
import { getFilteredProjectData } from '@/util/helpers';
import { DEFAULT_LANG } from '@/constants/language';
import NewWindowIcon from '../icons/NewWindowIcon';
import GitHubLogo from '../icons/GitHubLogo';

/**
 * Displays project data.
 * Skips rendering if the entry is marked inactive.
 */
function ProjectCard({ cardIndex, data, lang = DEFAULT_LANG }) {
  if (!data) return <></>;

  const filteredData = getFilteredProjectData(data, lang);

  if (filteredData.is_active === false) return <></>;

  const titleText = [filteredData.position, filteredData.title]
    .filter(Boolean)
    .join(' - ');

  return (
    <div className="simple-section--card">
      {filteredData.image_url && (
        <Image
          src={filteredData.image_url}
          alt={filteredData.title || 'Project card image'}
          width={600}
          height={192}
          className="rounded-lg w-full h-48 object-cover"
        />
      )}

      <div className="w-full">
        {(filteredData.start_date || filteredData.end_date) && (
          <div className="flex justify-between items-center gap-3 mb-1.5 w-full">
            <p className="eyebrow">
              <span className="text-nowrap">
                {filteredData.start_date ||
                  (lang === 'ko' ? '미정' : 'Unknown')}
              </span>{' '}
              &mdash;&nbsp;
              <span className="text-nowrap">
                {filteredData.end_date || (lang === 'ko' ? '현재' : 'Present')}
              </span>
            </p>

            <div className="hidden xmd:flex justify-end items-center gap-2.5 md:gap-3">
              {filteredData.url && (
                <a
                  href={filteredData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--link !text-xs"
                  aria-label={
                    lang === 'ko'
                      ? '데모 (새 탭에서 열림)'
                      : 'Demo (opens in new tab)'
                  }
                >
                  <span className="block">
                    {lang === 'ko' ? '데모' : 'Demo'}
                  </span>
                  <NewWindowIcon />
                </a>
              )}
              {filteredData.github && (
                <a
                  href={filteredData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--link !text-xs"
                  aria-label={
                    lang === 'ko'
                      ? 'GitHub (새 탭에서 열림)'
                      : 'GitHub (opens in new tab)'
                  }
                >
                  <span className="block">GitHub</span>
                  <GitHubLogo />
                </a>
              )}
            </div>
          </div>
        )}

        {titleText && (
          <h3>
            <Link
              href={`/projects/${filteredData.id}`}
              className="text-primary-base no-underline hover:underline focus:underline"
              style={{ transition: 'color 0.15s ease' }}
            >
              {titleText}
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
                key={`project-${cardIndex}-tech-stack-${index}`}
                className="tech-stack"
              >
                {stack}
              </p>
            ))}
          </div>
        )}

      <div className="flex xmd:hidden justify-start items-center gap-3 mt-1.5 border-t border-gray-200 pt-3 w-full">
        {filteredData.url && (
          <a
            href={filteredData.url}
            target="_blank"
            rel="noopener"
            className="btn btn--link !text-xs"
          >
            <span className="block">Demo</span>
            <NewWindowIcon />
          </a>
        )}
        {filteredData.github && (
          <a
            href={filteredData.github}
            target="_blank"
            rel="noopener"
            className="btn btn--link !text-xs"
          >
            <span className="block">GitHub</span>
            <GitHubLogo />
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
