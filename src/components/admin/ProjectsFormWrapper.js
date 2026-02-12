'use client';

import React from 'react';
import { ADMIN_FORM_MODE } from '@/constants/admin';
import FormLogicWrapper from './FormLogicWrapper';
import ProjectsForm from './ProjectsForm';

const emptyData = {
  project_id: '',
  title_en: '',
  title_ko: '',
  logo: null,
  location_en: '',
  location_ko: '',
  start_date: '',
  end_date: '',
  pos_title_en: '',
  pos_title_ko: '',
  tech_stack: [],
  description_en: '',
  description_ko: '',
  detail_md_en: '',
  detail_md_ko: '',
  url: '',
  github: '',
  is_active: false
};

const validationSchema = {
  project_id: {
    required: true,
    requiredOn: [ADMIN_FORM_MODE.CREATE],
    label: 'Project ID'
  },
  title_en: {
    required: true,
    label: 'Project Title (EN)'
  },
  title_ko: {
    required: true,
    label: 'Project Title (KO)'
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

function ProjectsFormWrapper({ mode = ADMIN_FORM_MODE.EDIT, project }) {
  return (
    <FormLogicWrapper
      entityName="projects"
      uniqueKey="project_id"
      mode={mode}
      initialData={project}
      emptyData={emptyData}
      validationSchema={validationSchema}
      render={(form) => <ProjectsForm {...form} />}
    />
  );
}

export default ProjectsFormWrapper;
