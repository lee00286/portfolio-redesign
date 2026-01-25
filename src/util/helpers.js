import { variantMap } from '@/constants/markdown';

export const getFilteredAboutData = (data, lang = 'en') => {
  if (!data) return {};

  return {
    name: lang === 'ko' ? data.name_ko : data.name_en,
    position: lang === 'ko' ? data.pos_title_ko : data.pos_title_en,
    summary: lang === 'ko' ? data.summary_ko : data.summary_en,
    detail: lang === 'ko' ? data.detail_ko : data.detail_en
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };
};

export const getFilteredEducationData = (data, lang = 'en') => {
  if (!data) return {};

  return {
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
};

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
    tech_stack: data.tech_stack || '',
    detail_md: lang === 'ko' ? data.detail_md_ko : data.detail_md_en
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };
};

export const getFilteredProjectData = (data, lang = 'en') => {
  if (!data) return {};

  return {
    logo: data.logo,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    title: lang === 'ko' ? data.title_ko : data.title_en,
    position: lang === 'ko' ? data.pos_title_ko : data.pos_title_en,
    location: lang === 'ko' ? data.location_ko : data.location_en,
    description: lang === 'ko' ? data.description_ko : data.description_en,
    detail: lang === 'ko' ? data.detail_ko : data.detail_en,
    tech_stack: data.tech_stack || '',
    github: data.github || '',
    url: data.url || ''
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };
};
