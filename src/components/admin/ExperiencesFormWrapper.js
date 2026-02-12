'use client';

import React from 'react';
import { ADMIN_FORM_MODE } from '@/constants/admin';
import FormLogicWrapper from './FormLogicWrapper';
import ExperiencesForm from './ExperiencesForm';

const emptyData = {
  experience_id: '',
  company_name_en: '',
  company_name_ko: '',
  logo: null,
  location_en: '',
  location_ko: '',
  company_description_en: '',
  company_description_ko: '',
  start_date: '',
  end_date: '',
  pos_title_en: '',
  pos_title_ko: '',
  pos_description_en: '',
  pos_description_ko: '',
  tech_stack: [],
  description_en: '',
  description_ko: '',
  detail_md_en: '',
  detail_md_ko: '',
  is_active: false
};

const validationSchema = {
  experience_id: {
    required: true,
    requiredOn: [ADMIN_FORM_MODE.CREATE],
    label: 'Experience ID'
  },
  company_name_en: {
    required: true,
    label: 'Company Name (EN)'
  },
  company_name_ko: {
    required: true,
    label: 'Company Name (KO)'
  },
  start_date: {
    required: true,
    label: 'Start Date'
  },
  tech_stack: {
    required: false,
    type: 'array'
  }
};

function ExperiencesFormWrapper({ mode = ADMIN_FORM_MODE.EDIT, experience }) {
  return (
    <FormLogicWrapper
      entityName="experiences"
      uniqueKey="experience_id"
      mode={mode}
      initialData={experience}
      emptyData={emptyData}
      validationSchema={validationSchema}
      render={(form) => <ExperiencesForm {...form} />}
    />
  );
}

export default ExperiencesFormWrapper;
