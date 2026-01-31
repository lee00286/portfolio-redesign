import { ADMIN_FORM_MODE } from '@/constants/admin';

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
    id: data.education_id,
    logo: data.logo,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    school: lang === 'ko' ? data.school_ko : data.school_en,
    major: lang === 'ko' ? data.major_ko : data.major_en,
    location: lang === 'ko' ? data.location_ko : data.location_en,
    description: lang === 'ko' ? data.description_ko : data.description_en,
    detail: lang === 'ko' ? data.detail_md_ko : data.detail_md_en,
    is_active: data.is_active
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

const cleanUpTableUniqueId = (rawUniqueId) => {
  if (!rawUniqueId || typeof rawUniqueId !== 'string') return '';

  const newUniqueId = rawUniqueId
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens

  return newUniqueId;
};

const normalizeDate = (v) =>
  typeof v === 'string' && v.trim() === '' ? null : v;

export const cleanUpAdminFormData = (rawFormData, options = {}) => {
  const { uniqueIdKey, mode = ADMIN_FORM_MODE.EDIT } = options;

  if (!rawFormData) return {};

  const newFormData = { ...rawFormData };

  if (
    mode === ADMIN_FORM_MODE.CREATE &&
    uniqueIdKey &&
    newFormData?.[uniqueIdKey]
  ) {
    newFormData[uniqueIdKey] = cleanUpTableUniqueId(newFormData[uniqueIdKey]);
  }

  if ('start_date' in newFormData) {
    newFormData.start_date = normalizeDate(newFormData.start_date);
  }

  if ('end_date' in newFormData) {
    newFormData.end_date = normalizeDate(newFormData.end_date);
  }

  return newFormData;
};
