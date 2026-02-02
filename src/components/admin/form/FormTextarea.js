'use client';

import React from 'react';
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea';

function FormTextarea({
  textareaId,
  name,
  label,
  value,
  placeholder,
  onChange,
  autoResize = false,
  disabled,
  required
}) {
  // Ref for autoResize
  const textareaRef = useAutosizeTextarea(value || '');

  if (!textareaId) return <></>;

  return (
    <>
      <label htmlFor={textareaId} className="admin-field-label">
        {label || name}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={textareaId}
        name={name || textareaId}
        ref={autoResize ? textareaRef : null}
        value={value || ''}
        onChange={onChange || null}
        className={`admin-field-textarea ${autoResize ? 'textarea-autoresize' : ''}`}
        placeholder={placeholder || ''}
        disabled={disabled}
      />
    </>
  );
}

export default FormTextarea;
