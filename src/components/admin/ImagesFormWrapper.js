'use client';

import React from 'react';
import { ADMIN_FORM_MODE } from '@/constants/admin';
import FormLogicWrapper from './FormLogicWrapper';
import ImagesForm from './ImagesForm';

const emptyData = {
  image_url: '',
  image_alt_en: '',
  image_alt_ko: '',
  image_caption_en: '',
  image_caption_ko: ''
};

const validationSchema = {
  image_url: {
    required: true,
    label: 'Image URL'
  },
  image_alt_en: {
    required: true,
    label: 'Image Alt (EN)'
  },
  image_alt_ko: {
    required: true,
    label: 'Image Alt (KO)'
  }
};

function ImagesFormWrapper({ mode = ADMIN_FORM_MODE.EDIT, image, imageUsage }) {
  return (
    <FormLogicWrapper
      entityName="images"
      uniqueKey="id"
      mode={mode}
      initialData={image}
      emptyData={emptyData}
      validationSchema={validationSchema}
      imageUsage={imageUsage}
      editorClass="admin-form-image-create"
      render={(form) => <ImagesForm {...form} />}
    />
  );
}

export default ImagesFormWrapper;
