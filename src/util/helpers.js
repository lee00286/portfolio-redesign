import { ADMIN_FORM_MODE } from '@/constants/admin';

export const getFilteredAboutData = (data, lang = 'en') => {
  if (!data) return {};
  if (!Object.keys(data)?.length) return {};

  return {
    name: (lang === 'ko' ? data.name_ko : data.name_en) || '',
    position: (lang === 'ko' ? data.pos_title_ko : data.pos_title_en) || '',
    summary: (lang === 'ko' ? data.summary_ko : data.summary_en) || '',
    detail: (lang === 'ko' ? data.detail_ko : data.detail_en) || ''
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };
};

export const getFilteredEducationData = (data, lang = 'en') => {
  if (!data) return {};
  if (!Object.keys(data)?.length) return {};

  return {
    id: data.education_id || '',
    logo: data.logo || '',
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    school: (lang === 'ko' ? data.school_ko : data.school_en) || '',
    location: (lang === 'ko' ? data.location_ko : data.location_en) || '',
    major: (lang === 'ko' ? data.major_ko : data.major_en) || '',
    description:
      (lang === 'ko' ? data.description_ko : data.description_en) || '',
    detail_md: (lang === 'ko' ? data.detail_md_ko : data.detail_md_en) || '',
    is_active: data.is_active ?? false
    // delete_at: data.delete_at,
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };
};

export const getFilteredExperienceData = (data, lang = 'en') => {
  if (!data) return {};
  if (!Object.keys(data)?.length) return {};

  return {
    id: data.experience_id || '',
    logo: data.logo || '',
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    company_name:
      (lang === 'ko' ? data.company_name_ko : data.company_name_en) || '',
    company_description:
      (lang === 'ko'
        ? data.company_description_ko
        : data.company_description_en) || '',
    location: (lang === 'ko' ? data.location_ko : data.location_en) || '',
    position: (lang === 'ko' ? data.pos_title_ko : data.pos_title_en) || '',
    pos_description:
      (lang === 'ko' ? data.pos_description_ko : data.pos_description_en) || '',
    description:
      (lang === 'ko' ? data.description_ko : data.description_en) || '',
    tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack : [],
    detail_md: (lang === 'ko' ? data.detail_md_ko : data.detail_md_en) || '',
    is_active: data.is_active ?? false
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };
};

export const getFilteredProjectData = (data, lang = 'en') => {
  if (!data) return {};
  if (!Object.keys(data)?.length) return {};

  return {
    id: data.project_id || '',
    logo: data.logo || '',
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    title: (lang === 'ko' ? data.title_ko : data.title_en) || '',
    location: (lang === 'ko' ? data.location_ko : data.location_en) || '',
    position: (lang === 'ko' ? data.pos_title_ko : data.pos_title_en) || '',
    description:
      (lang === 'ko' ? data.description_ko : data.description_en) || '',
    detail_md: (lang === 'ko' ? data.detail_md_ko : data.detail_md_en) || '',
    tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack : [],
    github: data.github || '',
    url: data.url || '',
    is_active: data.is_active ?? false
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

const normalizeDate = (v) => {
  if (v instanceof Date) {
    return v;
  }

  const date = new Date(v);
  return isNaN(date.getTime()) ? null : v;
};

export const cleanUpAdminFormData = (rawFormData, options = {}) => {
  const { uniqueIdKey, mode = ADMIN_FORM_MODE.EDIT } = options;

  if (!rawFormData) return {};

  const newFormData = { ...rawFormData };

  if (
    mode === ADMIN_FORM_MODE.CREATE &&
    uniqueIdKey &&
    uniqueIdKey in newFormData
  ) {
    newFormData[uniqueIdKey] = cleanUpTableUniqueId(newFormData[uniqueIdKey]);
  }

  if ('start_date' in newFormData) {
    newFormData.start_date = normalizeDate(newFormData.start_date);
  }

  if ('end_date' in newFormData) {
    newFormData.end_date = normalizeDate(newFormData.end_date);
  }

  if ('logo' in newFormData) {
    if (typeof newFormData.logo === 'object') {
      newFormData.logo = newFormData.logo?.id || null;
    }
  }

  const ARRAY_FIELDS = ['tech_stack'];

  ARRAY_FIELDS.forEach((key) => {
    if (!(key in newFormData)) return;

    if (!Array.isArray(newFormData[key])) {
      newFormData[key] = [];
    }
  });

  return newFormData;
};

export function validateFormBySchema({ validationSchema, mode, formData }) {
  if (!validationSchema) return false;

  for (const [field, rule] of Object.entries(validationSchema)) {
    const value = formData?.[field];

    // Mode-specific fields
    if (rule.requiredOn && !rule.requiredOn.includes(mode)) {
      continue;
    }

    // Required fields
    if (rule.required) {
      let isEmpty = false;

      if (rule.type === 'array') {
        isEmpty = !Array.isArray(value) || value.length === 0;
      } else {
        isEmpty =
          value === null ||
          value === undefined ||
          (typeof value === 'string' && !value.trim());
      }

      if (isEmpty) {
        alert(`${rule.label || field} is required`);
        return false;
      }
    }

    // Other validation rules
    if (rule.validate) {
      const result = rule.validate(value, formData);
      if (result !== true) {
        alert(result || `${rule.label || field} is invalid`);
        return false;
      }
    }
  }

  return true;
}

// Supabase - Extract the storage path from the image URL
export const extractStoragePath = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') return null;

  const marker = '/storage/v1/object/public/';
  const idx = imageUrl?.indexOf(marker);

  if (idx === -1) return null;

  return imageUrl.slice(idx + marker.length);
};
