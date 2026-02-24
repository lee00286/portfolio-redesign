import React from 'react';

function FormInput({
  inputId,
  name,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled,
  required
}) {
  if (!inputId) return <></>;

  return (
    <>
      <label htmlFor={inputId} className="admin-field-label">
        {label || name}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        name={name || inputId}
        type={type}
        value={value || ''}
        onChange={onChange || null}
        className="admin-field-input"
        placeholder={placeholder || ''}
        disabled={disabled}
      />
    </>
  );
}

export default FormInput;
