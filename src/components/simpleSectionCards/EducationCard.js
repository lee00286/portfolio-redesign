function EducationCard({ projectIndex, data }) {
  if (!data) return <></>;

  const lang = 'en';

  const filteredData = {
    logo: data.logo,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    school: lang === 'ko' ? data.school_ko : data.school_en,
    major: lang === 'ko' ? data.major_ko : data.major_en,
    location: lang === 'ko' ? data.location_ko : data.location_en,
    description: lang === 'ko' ? data.description_ko : data.description_en,
    detail: lang === 'ko' ? data.detail_ko : data.detail_en
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };

  return (
    <div className="simple-section--card">
      {filteredData.image_url && (
        <img
          src={filteredData.image_url}
          alt={filteredData.school}
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

        {(filteredData.major || filteredData.school) && (
          <h3 className="h4">
            {filteredData.major || ''}
            {filteredData.school && ` - ${filteredData.school}`}
          </h3>
        )}

        {filteredData.location && (
          <p className="mt-1 !text-gray-400 !font-bold !text-sm">
            {filteredData.location}
          </p>
        )}
      </div>

      {filteredData.description && <p>{filteredData.description}</p>}
    </div>
  );
}

export default EducationCard;
