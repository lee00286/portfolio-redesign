'use client';

import { useEffect, useState } from 'react';
import FormImagePreview from './FormImagePreview';
import FormLabelSwitch from './FormLabelSwitch';
import FormImageUpload from './FormImageUpload';
import FormMediaSelector from './FormMediaSelector';
import ConfirmModalButton from '../ConfirmModalButton';

const MEDIA_SELECTOR_MODE = {
  UPLOAD: 'upload',
  LIBRARY: 'library'
};

function FormImage({
  inputId = '',
  name = '',
  label = 'Image',
  formLabel = 'New Image',
  currImage,
  resetKey,
  required = false,
  disabled = false,
  uploadPath = '',
  onChange,
  setIsUploading,
  setHasPendingImage
}) {
  const [state, setState] = useState({
    // actual saved value is controlled by parent via onChange
    original: currImage, // UI-only state
    selected: null, // UI-only state
    isChanging: false
  });
  const [selectorMode, setSelectorMode] = useState(MEDIA_SELECTOR_MODE.UPLOAD);

  useEffect(() => {
    setState((prev) => ({ ...prev, original: currImage }));
  }, [currImage]);

  // Reset local file if the resetKey changes
  useEffect(() => {
    setState({
      original: currImage,
      selected: null,
      isChanging: false
    });
  }, [resetKey]);

  const showUploader = (!state.original && !state.selected) || state.isChanging;

  return (
    <>
      <p className="admin-field-label">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>

      <div className="admin-field-input space-y-4">
        {(state.original || state.selected) && (
          <div className="editor-row">
            {/* Existing image */}
            {state.original && (
              <div className="editor-row-col">
                <FormImagePreview
                  title="Current image"
                  image={state.original}
                />
              </div>
            )}

            {/* Selected new image */}
            {state.selected && (
              <div className="editor-row-col">
                <FormImagePreview title="New image" image={state.selected} />
              </div>
            )}
          </div>
        )}

        {/* Upload / Picker */}
        {!disabled && showUploader && (
          <>
            <div className="editor-row">
              <div className="editor-row-col">
                <FormLabelSwitch
                  switchId="media-selector-mode"
                  name="media_selector_mode"
                  checked={selectorMode === MEDIA_SELECTOR_MODE.UPLOAD}
                  switchOnText="Upload"
                  switchOffText="Media Library"
                  onChange={(checked) => {
                    if (checked) {
                      setSelectorMode(MEDIA_SELECTOR_MODE.UPLOAD);
                    } else {
                      setSelectorMode(MEDIA_SELECTOR_MODE.LIBRARY);
                    }
                  }}
                />
              </div>
            </div>

            <div className="editor-row">
              <div className="editor-row-col">
                {selectorMode === MEDIA_SELECTOR_MODE.UPLOAD && (
                  <FormImageUpload
                    inputId={inputId}
                    name={name}
                    label={formLabel}
                    resetKey={resetKey}
                    uploadPath={uploadPath}
                    setIsUploading={setIsUploading}
                    setHasPendingImage={setHasPendingImage}
                    onUploaded={(img) => {
                      setState((prev) => ({
                        ...prev,
                        selected: img,
                        isChanging: false
                      }));
                      onChange(img ? img.id : null);
                    }}
                  />
                )}

                {selectorMode === MEDIA_SELECTOR_MODE.LIBRARY && (
                  <FormMediaSelector
                    label={formLabel}
                    onSelect={(img) => {
                      setState((prev) => ({
                        ...prev,
                        selected: img,
                        isChanging: false
                      }));
                      onChange(img ? img.id : null);
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        {(state.original || state.selected) && (
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={disabled}
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  selected: null,
                  isChanging: true
                }));
              }}
            >
              Change
            </button>

            {state?.isChanging && (
              <button
                type="button"
                className="btn btn-secondary"
                disabled={disabled}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    selected: null,
                    isChanging: false
                  }));
                  onChange(state.original ? state.original.id : null);
                }}
              >
                Cancel
              </button>
            )}

            <ConfirmModalButton
              text="Remove"
              disabled={disabled}
              data={{
                title: 'Remove image?',
                description: 'This will remove the image from this item.',
                danger: true,
                onConfirm: () => {
                  setState({
                    original: null,
                    selected: null,
                    isChanging: false
                  });
                  onChange(null);
                }
              }}
            >
              Remove
            </ConfirmModalButton>
          </div>
        )}
      </div>
    </>
  );
}

export default FormImage;
