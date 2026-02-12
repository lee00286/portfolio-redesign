import React from 'react';
import { getSupabaseData } from '@/lib/supabase/getSupbaseData';
import AboutCard from './simpleSectionCards/AboutCard';
import EducationCard from './simpleSectionCards/EducationCard';
import ExperienceCard from './simpleSectionCards/ExperienceCard';
import ProjectCard from './simpleSectionCards/ProjectCard';

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
        <div className="simple-section--container items-center text-center">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
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
        <p className="!font-bold !text-blue-600">
          <span className="capitalize">{dbTableName}</span> list is empty.
        </p>
      ) : (
        <p className="!font-bold !text-red-600">
          {error ?? `Failed to load ${dbTableName} data.`}
        </p>
      )}
    </section>
  );
}

export default SimpleSection;
