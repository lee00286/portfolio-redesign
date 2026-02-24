'use client';

import React, { useRef, useState } from 'react';

function FormTags({
  inputId,
  name,
  label,
  type = 'text',
  value = [],
  placeholder,
  onChange,
  disabled,
  required
}) {
  const [inputText, setInputText] = useState('');

  if (!inputId) return <></>;

  const addTag = () => {
    const v = inputText?.trim();

    if (!v || value?.includes(v)) return;

    onChange(name, [...(Array.isArray(value) ? value : []), v]);

    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e?.key !== 'Enter') return;

    // Fix for Korean: Prevents adding a tag when composing
    if (e.nativeEvent?.isComposing) return;

    e.preventDefault();
    addTag();
  };

  const removeTag = (tag) => {
    onChange(
      name,
      value.filter((t) => t !== tag)
    );
  };

  return (
    <>
      <label htmlFor={inputId} className="admin-field-label">
        {label || name}
        {required && <span className="text-red-500">*</span>}
      </label>

      {Array.isArray(value) && value?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="badge flex justify-center items-center gap-1 bg-primary-200 text-gray-600"
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="flex justify-center items-center text-xs leading-[1]"
                >
                  <span className="mt-[1px]">×</span>
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      <input
        id={inputId}
        name={name || inputId}
        type={type}
        value={inputText || ''}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="admin-field-input"
        placeholder={placeholder || ''}
        disabled={disabled}
      />
    </>
  );
}

export default FormTags;
