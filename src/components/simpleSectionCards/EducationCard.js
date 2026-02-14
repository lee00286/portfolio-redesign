import { getFilteredEducationData } from '@/util/helpers';

const lang = 'en';

/**
 * Displays education data.
 * Skips rendering if the entry is marked inactive.
 */
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
          className="rounded-lg w-full h-48 object-cover"
        />
      )}

      <div className="w-full">
        {(filteredData.start_date || filteredData.end_date) && (
          <p className="eyebrow mb-1.5">
            <span className="text-nowrap">
              {filteredData.start_date || 'Unknown'}
            </span>{' '}
            &mdash;&nbsp;
            <span className="text-nowrap">
              {filteredData.end_date || 'Present'}
            </span>
          </p>
        )}

        {(filteredData.major || filteredData.school) && (
          <h3 className="h4">
            {filteredData.major || ''}
            {filteredData.school && ` - ${filteredData.school}`}
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
    </div>
  );
}

export default EducationCard;
