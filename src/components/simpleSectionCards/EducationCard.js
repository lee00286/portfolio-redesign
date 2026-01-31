import { getFilteredEducationData } from '@/util/helpers';

const lang = 'en';

function EducationCard({ data }) {
  if (!data) return <></>;

  const filteredData = getFilteredEducationData(data, lang);

  if (filteredData.is_active === false) return <></>;

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
