import React from 'react';

function FormLabelSwitch({
  label = '',
  checked = false,
  switchOnText = '',
  switchOffText = '',
  onChange,
  required = false
}) {
  if (!switchOnText || !switchOffText) return <></>;

  const onClick = (checked) => {
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <>
      {label && (
        <label className="admin-field-label">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="admin-field-label-switch">
        <button
          className={`btn ${checked ? 'is-active' : ''}`}
          onClick={() => onClick(true)}
        >
          {switchOnText}
        </button>
        <button
          className={`btn ${checked ? '' : 'is-active'}`}
          onClick={() => onClick(false)}
        >
          {switchOffText}
        </button>
      </div>
    </>
  );
}

export default FormLabelSwitch;
