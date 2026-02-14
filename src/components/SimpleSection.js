import React from 'react';
import { getSupabaseData } from '@/lib/supabase/getSupbaseData';
import { handleSupabaseError } from '@/util/helpers';
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
  sectionContainerClass = ''
}) {
  const { dbData, error } = await getSupabaseData(dbTableName);

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
            {title && <h2>{title}</h2>}
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
              <AboutCard key={data.id} data={data} />
            ) : dbTableName === 'educations' ? (
              <EducationCard key={data.id} data={data} />
            ) : dbTableName === 'experiences' ? (
              <ExperienceCard key={data.id} cardIndex={index} data={data} />
            ) : dbTableName === 'projects' ? (
              <ProjectCard key={data.id} cardIndex={index} data={data} />
            ) : (
              <React.Fragment key={data.id || `data-${index}`}></React.Fragment>
            )
          )}
        </div>
      ) : Array.isArray(dbData) && dbData.length === 0 ? (
        <p className="!font-medium !text-gray-700 !text-sm">
          No {dbTableName} to display.
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
