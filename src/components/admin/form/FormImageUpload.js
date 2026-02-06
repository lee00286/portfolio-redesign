'use client';

import { useEffect, useState } from 'react';
import FormInput from './FormInput';

function FormImageUpload({
  inputId,
  name,
  label = 'Logo',
  value, // image object or null
  resetKey,
  required = false,
  uploadPath = '',
  onUploaded,
  setIsUploading,
  setHasPendingImage // when the file is only uploaded locally
}) {
  const [uploading, setUploading] = useState(false);

  // Local status
  const [localFile, setLocalFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [altEN, setAltEN] = useState('');
  const [altKO, setAltKO] = useState('');
  const [captionEN, setCaptionEN] = useState('');
  const [captionKO, setCaptionKO] = useState('');

  // Reset local file if the resetKey changes
  useEffect(() => {
    onClearLocalFile();
  }, [resetKey]);

  useEffect(() => {
    if (setHasPendingImage) {
      setHasPendingImage(!!localFile);
    }
  }, [localFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!inputId) return <></>;

  const onUploading = (upload) => {
    if (setIsUploading) {
      setIsUploading(upload);
    }

    setUploading(upload);
  };

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Remove the previous preview image
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setLocalFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onClearLocalFile = () => {
    setLocalFile(null);
    setPreviewUrl(null);
  };

  const onUpload = async () => {
    if (!localFile) return;

    onUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', localFile);
      formData.append('filePath', uploadPath);
      formData.append('altEN', altEN);
      formData.append('altKO', altKO);
      formData.append('captionEN', captionEN);
      formData.append('captionKO', captionKO);

      const res = await fetch('/api/admin/images/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');

      const result = await res.json();
      if (onUploaded) {
        onUploaded(result.data);
      }

      onClearLocalFile();
    } catch (err) {
      alert(err.message);
    } finally {
      onUploading(false);
    }
  };

  return (
    <>
      <p className="admin-field-label">
        {label || name}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="admin-field-input space-y-4">
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor={inputId} className="admin-field-label">
              Image file
              {required && <span className="text-red-500">*</span>}
            </label>

            {(previewUrl || value?.image_url) && (
              <img
                src={previewUrl || value.image_url}
                alt="Preview image"
                className="mb-2 border border-black rounded h-20 object-contain"
              />
            )}

            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={onFileSelect}
              disabled={uploading}
              className="admin-field-file-input"
            />
          </div>
        </div>

        {localFile && (
          <>
            <div className="editor-row">
              <div className="editor-row-col">
                <FormInput
                  inputId={`${inputId}-alt-en`}
                  name="image_alt_en"
                  label="Alt text (EN)"
                  value={altEN}
                  placeholder="Write alt text (EN) here..."
                  onChange={(e) => setAltEN(e.target.value)}
                />
              </div>
              <div className="editor-row-col">
                <FormInput
                  inputId={`${inputId}-alt-ko`}
                  name="image_alt_ko"
                  label="Alt text (KO)"
                  value={altKO}
                  placeholder="Write alt text (KO) here..."
                  onChange={(e) => setAltKO(e.target.value)}
                />
              </div>
            </div>
            <div className="editor-row">
              <div className="editor-row-col">
                <FormInput
                  inputId={`${inputId}-caption-en`}
                  name="image_caption_en"
                  label="Caption (EN)"
                  value={captionEN}
                  placeholder="Write caption (EN) here..."
                  onChange={(e) => setCaptionEN(e.target.value)}
                />
              </div>
              <div className="editor-row-col">
                <FormInput
                  inputId={`${inputId}-caption-ko`}
                  name="image_caption_ko"
                  label="Caption (KO)"
                  value={captionKO}
                  placeholder="Write caption (KO) here..."
                  onChange={(e) => setCaptionKO(e.target.value)}
                />
              </div>
            </div>

            <div className="editor-row">
              <div className="editor-row-col">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onUpload}
                    disabled={uploading}
                  >
                    Upload Image
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClearLocalFile}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {uploading && (
        <p className="mt-2 font-bold text-sm text-gray-500">Uploading...</p>
      )}
    </>
  );
}

export default FormImageUpload;
