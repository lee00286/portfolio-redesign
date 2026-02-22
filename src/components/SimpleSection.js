import React from 'react';
import Link from 'next/link';
import { getSupabaseData } from '@/lib/supabase/getSupbaseData';
import { handleSupabaseError } from '@/util/helpers';
import { simpleSectionDefaultQueryOptions } from '@/constants/supabase';
import { DEFAULT_LANG } from '@/constants/language';
import AboutCard from './simpleSectionCards/AboutCard';
import EducationCard from './simpleSectionCards/EducationCard';
import ExperienceCard from './simpleSectionCards/ExperienceCard';
import ProjectCard from './simpleSectionCards/ProjectCard';

/**
 * Fetches data for a database table name and returns the card components.
 */
async function SimpleSection({
  title = '',
  description = '',
  dbTableName = '',
  desktopOnly = false,
  mobileOnly = false,
  sectionClass = '',
  sectionContainerClass = '',
  queryOptions = simpleSectionDefaultQueryOptions,
  lang = DEFAULT_LANG
}) {
  const options = queryOptions
    ? Object.keys(queryOptions)?.length > 0
      ? queryOptions
      : simpleSectionDefaultQueryOptions
    : simpleSectionDefaultQueryOptions;

  const { dbData, error } = await getSupabaseData(dbTableName, options);

  return (
    <section
      id={dbTableName || 'simple-section'}
      className={`simple-section ${desktopOnly ? 'dskt-only' : ''} ${mobileOnly ? 'mbl-only' : ''} ${sectionClass ? sectionClass : ''}`}
    >
      {(title || description) && (
        <div className="simple-section--header">
          <div
            className="mt-1.5 mb-1 rounded-full w-[3px] h-auto bg-primary-500"
            aria-hidden="true"
            role="presentation"
          />
          <div>
            {title && (
              <Link
                href={`/#${dbTableName}`}
                className="h2 hover:underline focus:underline"
              >
                <h2>{title}</h2>
              </Link>
            )}
            {description && <p>{description}</p>}
          </div>
        </div>
      )}

      {Array.isArray(dbData) && dbData.length > 0 ? (
        <div
          className={`simple-section--container ${sectionContainerClass ? sectionContainerClass : ''}`}
        >
          {dbData.map((data, index) =>
            dbTableName === 'about' ? (
              <AboutCard key={data.id} data={data} lang={lang} />
            ) : dbTableName === 'educations' ? (
              <EducationCard key={data.id} data={data} lang={lang} />
            ) : dbTableName === 'experiences' ? (
              <ExperienceCard
                key={data.id}
                cardIndex={index}
                data={data}
                lang={lang}
              />
            ) : dbTableName === 'projects' ? (
              <ProjectCard
                key={data.id}
                cardIndex={index}
                data={data}
                lang={lang}
              />
            ) : (
              <React.Fragment key={data.id || `data-${index}`}></React.Fragment>
            )
          )}
        </div>
      ) : Array.isArray(dbData) && dbData.length === 0 ? (
        <p className="!font-medium !text-gray-700 !text-sm">
          {lang === 'ko'
            ? `표시할 ${dbTableName}이(가) 없습니다.`
            : `No ${dbTableName} to display.`}
        </p>
      ) : (
        <p className="!font-medium !text-red-500 !text-sm">
          {handleSupabaseError(error, dbTableName)}
        </p>
      )}
    </section>
  );
}

export default SimpleSection;
