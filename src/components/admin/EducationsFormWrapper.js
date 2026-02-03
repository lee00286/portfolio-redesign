'use client';

import React from 'react';
import { ADMIN_FORM_MODE } from '@/constants/admin';
import FormLogicWrapper from './FormLogicWrapper';
import EducationsForm from './EducationsForm';

const emptyData = {
  education_id: '',
  school_en: '',
  school_ko: '',
  location_en: '',
  location_ko: '',
  logo: null,
  major_en: '',
  major_ko: '',
  start_date: '',
  end_date: '',
  description_en: '',
  description_ko: '',
  detail_md_en: '',
  detail_md_ko: '',
  is_active: false
};

const validationSchema = {
  education_id: {
    required: true,
    requiredOn: [ADMIN_FORM_MODE.CREATE],
    label: 'Education ID'
  },
  school_en: {
    required: true,
    label: 'Education Name (EN)'
  },
  school_ko: {
    required: true,
    label: 'Education Name (KO)'
  },
  start_date: {
    required: true,
    label: 'Start Date'
  }
};

function EducationsFormWrapper({ education }) {
  return (
    <FormLogicWrapper
      entityName="educations"
      uniqueKey="education_id"
      mode={ADMIN_FORM_MODE.EDIT}
      initialData={education}
      emptyData={emptyData}
      validationSchema={validationSchema}
      render={(form) => <EducationsForm {...form} />}
    />
  );
}

export default EducationsFormWrapper;
