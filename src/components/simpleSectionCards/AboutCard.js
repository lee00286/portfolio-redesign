import Link from 'next/link';
import { getFilteredAboutData } from '@/util/helpers';

const lang = 'en';

function AboutCard({ data }) {
  if (!data) return <></>;

  const filteredData = getFilteredAboutData(data, lang);

  return (
    <div className="simple-section--card text-center">
      <div className="w-full">
        {filteredData.name && (
          <h1 className="h3">
            <Link
              href="/"
              className="text-primary-500 hover:text-primary-500 focus:text-primary-500 visited:text-primary-500 no-underline hover:underline focus:underline visited:no-underline"
            >
              {filteredData.name}
            </Link>
          </h1>
        )}

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
