import { getFilteredAboutData } from '@/util/helpers';

const lang = 'en';

function AboutCard({ data }) {
  if (!data) return <></>;

  const filteredData = getFilteredAboutData(data, lang);

  return (
    <div className="simple-section--card text-center">
      <div className="w-full">
        {filteredData.name && <h3>{filteredData.name}</h3>}

        {filteredData.position && (
          <p className="mt-1 !text-yellow-400 !font-bold">
            {filteredData.position}
          </p>
        )}
      </div>

      {filteredData.summary && <p>{filteredData.summary}</p>}
    </div>
  );
}

export default AboutCard;
