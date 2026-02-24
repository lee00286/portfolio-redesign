import Link from 'next/link';
import { getFilteredProjectData } from '@/util/helpers';
import { DEFAULT_LANG } from '@/constants/language';
import NewWindowIcon from '@/components/icons/NewWindowIcon';
import GitHubLogo from '@/components/icons/GitHubLogo';

/**
 * Timeline card for project
 */
function TimelineProjectCard({
  data,
  uniqueKey = 'id',
  index = 0,
  lang = DEFAULT_LANG
}) {
  if (!data) return null;

  const d = getFilteredProjectData(data, lang);

  if (d.is_active === false) return null;

  const titleText = [d.position, d.title].filter(Boolean).join(' - ');
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

      {titleText && (
        <h3 className="h5">
          <Link
            href={urlPath ? `/projects/${urlPath}` : '#'}
            className="text-primary-base no-underline hover:underline focus:underline"
          >
            {titleText}
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
            <p key={`project-${index}-ts-${i}`} className="tech-stack">
              {stack}
            </p>
          ))}
        </div>
      )}

      {(d.url || d.github) && (
        <div className="flex justify-start items-center gap-3 mt-3 w-full">
          {d.url && (
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--link !text-xs"
              aria-label={
                lang === 'ko'
                  ? '데모 (새 탭에서 열림)'
                  : 'Demo (opens in new tab)'
              }
            >
              <span>{lang === 'ko' ? '데모' : 'Demo'}</span>
              <NewWindowIcon />
            </a>
          )}
          {d.github && (
            <a
              href={d.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--link !text-xs"
              aria-label={
                lang === 'ko'
                  ? 'GitHub (새 탭에서 열림)'
                  : 'GitHub (opens in new tab)'
              }
            >
              <span>GitHub</span>
              <GitHubLogo />
            </a>
          )}
        </div>
      )}
    </>
  );
}

export default TimelineProjectCard;
