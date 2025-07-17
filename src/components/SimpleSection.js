'use client';

import React from 'react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

function SimpleSection({ title = '', description = '', dbTableName = '' }) {
  const { dbData } = useSupabaseData(dbTableName);

  return (
    <section
      id={dbTableName || 'simple-section'}
      className="simple-section flex flex-col gap-5 p-6 w-full"
    >
      {(title || description) && (
        <div className="simple-section--container items-center text-center">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}
      {Array.isArray(dbData) && dbData.length > 0 && (
        <div className="simple-section--container">
          {dbData.map((data, index) =>
            <React.Fragment key={data.id || `data-${index}`}></React.Fragment>
          )}
        </div>
      )}
    </section>
  );
}

export default SimpleSection;
