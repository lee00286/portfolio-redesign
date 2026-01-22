export const getFilteredExperienceData = (data, lang = 'en') => {
  if (!data) return {};

  return {
    id: data.experience_id,
    logo: data.logo,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    company_name: lang === 'ko' ? data.company_name_ko : data.company_name_en,
    company_description:
      lang === 'ko' ? data.company_description_ko : data.company_description_en,
    position: lang === 'ko' ? data.pos_title_ko : data.pos_title_en,
    pos_description:
      lang === 'ko' ? data.pos_description_ko : data.pos_description_en,
    location: lang === 'ko' ? data.location_ko : data.location_en,
    description: lang === 'ko' ? data.description_ko : data.description_en,
    detail: lang === 'ko' ? data.detail_ko : data.detail_en,
    tech_stack: data.tech_stack || ''
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };
};
