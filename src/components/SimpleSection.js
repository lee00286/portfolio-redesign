'use client';

import React from 'react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import EducationCard from './simpleSectionCards/EducationCard';
import ExperienceCard from './simpleSectionCards/ExperienceCard';
import ProjectCard from './simpleSectionCards/ProjectCard';

function SimpleSection({ title = '', description = '', dbTableName = '' }) {
  const { dbData } = useSupabaseData(dbTableName);

  return (
    <section id={dbTableName || 'simple-section'} className="simple-section">
      {(title || description) && (
        <div className="simple-section--container items-center text-center">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}

      {Array.isArray(dbData) && dbData.length > 0 && (
        <div className="simple-section--container">
          {dbData.map((data, index) =>
            dbTableName === 'educations' ? (
              <EducationCard key={data.id} projectIndex={index} data={data} />
            ) : dbTableName === 'experiences' ? (
              <ExperienceCard key={data.id} projectIndex={index} data={data} />
            ) : dbTableName === 'projects' ? (
              <ProjectCard key={data.id} projectIndex={index} data={data} />
            ) : (
              <React.Fragment key={data.id || `data-${index}`}></React.Fragment>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default SimpleSection;
