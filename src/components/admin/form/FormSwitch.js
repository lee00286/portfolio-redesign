import React from 'react';

function FormSwitch({
  switchId,
  name,
  label,
  checked = false,
  disabled = false,
  onChange,
  required
}) {
  if (!switchId) return <></>;

  return (
    <>
      <label htmlFor={switchId} className="admin-field-label">
        {label || name}
        {required && <span className="text-red-500">*</span>}
      </label>
      <label className="admin-field-switch">
        <input
          id={switchId}
          name={name || switchId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange || null}
          className="admin-field-switch-input"
        />
        <span className="admin-field-switch-slider"></span>
      </label>
    </>
  );
}

export default FormSwitch;
