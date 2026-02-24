import Link from 'next/link';
import { getFilteredAboutData } from '@/util/helpers';
import { DEFAULT_LANG } from '@/constants/language';

/**
 * Displays the "About" data from the database.
 * Used in both the sidebar (desktop) and main content area (mobile).
 */
function AboutCard({ data, lang = DEFAULT_LANG }) {
  if (!data) return <></>;

  const filteredData = getFilteredAboutData(data, lang);

  return (
    <div className="simple-section--card text-center">
      <div className="w-full">
        {filteredData.name && (
          <h1 className="h3">
            <Link
              href="/"
              className="text-primary-base no-underline"
              style={{
                textShadow: '0px 1px 2px rgb(251 215 51 / 0.3)',
                transition: 'color 0.15s ease'
              }}
            >
              {filteredData.name}
            </Link>
          </h1>
        )}

        {filteredData.position && (
          <p className="mt-1.5 !font-[600] !text-primary-600 !text-sm">
            {filteredData.position}
          </p>
        )}
      </div>

      {filteredData.summary && (
        <p className="!text-gray-700 !text-sm !leading-relaxed">
          {filteredData.summary}
        </p>
      )}
    </div>
  );
}

export default AboutCard;
