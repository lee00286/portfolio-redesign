import { notFound } from 'next/navigation';
import { getSupabaseData, getImageUrl } from '@/lib/supabase/getSupbaseData';
import { getFilteredExperienceData } from '@/util/helpers';

const lang = 'en';

/**
 * Fetches detail data and renders the provided sections.
 *
 * @param {string} dbTableName - The Supabase table name
 * @param {Object} dbFilters - Equality filters for the query
 * @param {Function} renderSections - Render function receiving (data, logoUrl) and returning JSX
 */
async function Details({ dbTableName = '', dbFilters = {}, renderSections }) {
  if (!dbTableName || !dbFilters || !Object.keys(dbFilters).length) {
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

  const data = getFilteredExperienceData(dbData[0], lang);

  if (!data.is_active) {
    notFound();
  }

  const logoUrl = data.logo ? await getImageUrl(data.logo) : null;

  return (
    <section className="details-section">
      {renderSections(data, logoUrl)}
    </section>
  );
}

export default Details;
