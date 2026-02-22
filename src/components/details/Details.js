import { notFound } from 'next/navigation';
import { getLang } from '@/lib/lang';
import { getSupabaseData, getImageUrl } from '@/lib/supabase/getSupbaseData';

// Table names to their corresponding helper filter functions
const FILTER_FN_MAP = {
  experiences: 'getFilteredExperienceData',
  projects: 'getFilteredProjectData',
  educations: 'getFilteredEducationData'
};

/**
 * Fetches detail data and renders the provided sections.
 *
 * @param {string} dbTableName - The Supabase table name
 * @param {Object} dbFilters - Equality filters for the query
 * @param {Function} renderSections - Render function receiving (data, logoUrl, lang) and returning JSX
 */
async function Details({ dbTableName = '', dbFilters = {}, renderSections }) {
  if (!dbTableName || !dbFilters || !Object.keys(dbFilters).length) {
    notFound();
  }

  const filterFnName = FILTER_FN_MAP[dbTableName];
  if (!filterFnName) {
    notFound();
  }

  const { dbData, error } = await getSupabaseData(dbTableName, {
    filters: dbFilters
  });

  if (error) {
    return (
      <p className="!font-medium !text-red-500 !text-sm">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (!Array.isArray(dbData) || dbData.length === 0) {
    notFound();
  }

  const lang = await getLang();

  // Dynamically import the filter function (to avoid importing all helpers at once)
  const helpers = await import('@/util/helpers');
  const filterFn = helpers[filterFnName];
  const data = filterFn(dbData[0], lang);

  if (!data.is_active) {
    notFound();
  }

  const logoUrl = data.logo ? await getImageUrl(data.logo) : null;

  return (
    <section className="details-section">
      {renderSections(data, logoUrl, lang)}
    </section>
  );
}

export default Details;
