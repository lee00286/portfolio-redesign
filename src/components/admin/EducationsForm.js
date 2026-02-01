'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea';
import { ADMIN_BANNER_TYPE, ADMIN_FORM_MODE } from '@/constants/admin';
import { cleanUpAdminFormData } from '@/util/helpers';
import ConfirmModalButton from './ConfirmModalButton';
import AdminInfoBanner from './AdminInfoBanner';

const emptyData = {
  education_id: '',
  school_en: '',
  school_ko: '',
  location_en: '',
  location_ko: '',
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

function EducationsForm({ mode, initialData }) {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Data
  const [formData, setFormData] = useState({ ...emptyData });
  const [baseData, setBaseData] = useState({ ...emptyData });

  // Autosize textareas
  const descriptionENRef = useAutosizeTextarea(formData?.description_en);
  const descriptionKORef = useAutosizeTextarea(formData?.description_ko);
  const detailENRef = useAutosizeTextarea(formData?.detail_md_en);
  const detailKORef = useAutosizeTextarea(formData?.detail_md_ko);

  const isUpdated =
    mode === ADMIN_FORM_MODE.CREATE
      ? JSON.stringify(formData) !== JSON.stringify(emptyData)
      : JSON.stringify(formData) !== JSON.stringify(baseData);

  useEffect(() => {
    if (initialData) {
      setBaseData(initialData);
      setFormData(initialData);
    } else {
      setBaseData(emptyData);
      setFormData(emptyData);
    }
  }, [initialData]);

  const onReset = () => {
    setFormData(baseData);
  };

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onValidCheck = () => {
    if (mode === ADMIN_FORM_MODE.CREATE && !formData?.education_id.trim()) {
      alert('Education ID field is required');
      return false;
    }

    if (!formData?.school_en.trim() || !formData?.school_ko.trim()) {
      alert('School Name field is required');
      return false;
    }

    return true;
  };

  const onSave = async () => {
    if (mode === ADMIN_FORM_MODE.CREATE) {
      await onCreate();
    } else {
      await onUpdate();
    }
  };

  const onUpdate = async () => {
    if (isSaving || isDeleting) return;

    setIsSaving(true);

    if (!initialData?.id) {
      alert('Invalid data');
      setIsSaving(false);
      return;
    }

    // Validation Check
    const isValid = onValidCheck();

    if (!isValid) {
      setIsSaving(false);
      return;
    }

    // Update
    const payload = {
      ...cleanUpAdminFormData(formData)
    };

    setBaseData((prev) => ({ ...prev, ...payload }));

    try {
      const res = await fetch(`/api/admin/educations/${initialData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(res.statusText || 'Save failed');
      }

      const result = await res.json();

      setBaseData((prev) => ({ ...prev, ...result.data }));

      alert('Saved successfully');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onCreate = async () => {
    if (isSaving) return;

    setIsSaving(true);

    // Validation Check
    const isValid = onValidCheck();

    if (!isValid) {
      setIsSaving(false);
      return;
    }

    // Create
    const payload = {
      ...cleanUpAdminFormData(formData, { uniqueIdKey: 'education_id', mode })
    };

    try {
      const res = await fetch('/api/admin/educations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(res.statusText || 'Create failed');
      }

      const result = await res.json();

      setBaseData((prev) => ({ ...prev, ...result.data }));

      alert('Created successfully');
      router.replace(`/admin/educations/${result.data.education_id}`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = async () => {
    if (isSaving || isDeleting) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/educations/${initialData?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(res.statusText || 'Create failed');
      }

      const result = await res.json();

      alert('Deleted successfully');
      router.replace(`/admin/educations`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const onRestore = async () => {
    if (isSaving || isDeleting) return;

    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/educations/${initialData?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(res.statusText || 'Restore failed');
      }

      const result = await res.json();

      setBaseData((prev) => ({ ...prev, ...result.data }));

      alert('Restored successfully');
      router.replace(`/admin/educations/${result.data.education_id}`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {formData?.deleted_at && (
        <AdminInfoBanner
          type={ADMIN_BANNER_TYPE.WARNING}
          message="This item is archived."
          confirmTitle="Restore this education item?"
          confirmDescription="This item will remain inactive but will be back to your educations data list."
          action={{
            label: 'Restore',
            onClick: onRestore,
            disabled: isSaving || isDeleting
          }}
        />
      )}
      <div className="editor space-y-4">
        {/* Education ID */}
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor="education-id" className="admin-field-label">
              Education ID
            </label>
            <input
              id="education-id"
              name="education_id"
              value={formData?.education_id}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write Education ID here..."
              disabled={mode === ADMIN_FORM_MODE.EDIT}
            />
          </div>
        </div>

        {/* Is Active */}
        <div className="editor-row">
          <div className="editor-row-col flex flex-row items-center gap-2">
            <label htmlFor="is-active" className="admin-field-label">
              Is Active?
            </label>
            <label className="admin-field-switch">
              <input
                id="is-active"
                name="is_active"
                type="checkbox"
                checked={formData?.is_active}
                onChange={onChange}
                className="admin-field-switch-input"
              />
              <span className="admin-field-switch-slider"></span>
            </label>
          </div>
        </div>

        {/* Education Name */}
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor="school-en" className="admin-field-label">
              Education Name (EN)
            </label>
            <input
              id="school-en"
              name="school_en"
              value={formData?.school_en}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write education name (EN) here..."
            />
          </div>
          <div className="editor-row-col">
            <label htmlFor="school-ko" className="admin-field-label">
              Education Name (KO)
            </label>
            <input
              id="school-ko"
              name="school_ko"
              value={formData?.school_ko}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write education name (KO) here..."
            />
          </div>
        </div>

        {/* Logo */}

        {/* Location */}
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor="location-en" className="admin-field-label">
              Location (EN)
            </label>
            <input
              id="location-en"
              name="location_en"
              value={formData?.location_en || ''}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write location (EN) here..."
            />
          </div>
          <div className="editor-row-col">
            <label htmlFor="location-ko" className="admin-field-label">
              Location (KO)
            </label>
            <input
              id="location-ko"
              name="location_ko"
              value={formData?.location_ko || ''}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write location (KO) here..."
            />
          </div>
        </div>

        {/* Major */}
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor="major-en" className="admin-field-label">
              Major (EN)
            </label>
            <input
              id="major-en"
              name="major_en"
              value={formData?.major_en || ''}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write major (EN) here..."
            />
          </div>
          <div className="editor-row-col">
            <label htmlFor="major-ko" className="admin-field-label">
              Major (KO)
            </label>
            <input
              id="major-ko"
              name="major_ko"
              value={formData?.major_ko || ''}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write major (KO) here..."
            />
          </div>
        </div>

        {/* Dates */}
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor="start-date" className="admin-field-label">
              Education Start Date
            </label>
            <input
              id="start-date"
              name="start_date"
              type="date"
              value={formData?.start_date || ''}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write start date here..."
            />
          </div>
          <div className="editor-row-col">
            <label htmlFor="end-date" className="admin-field-label">
              Education End Date (optional)
            </label>
            <input
              id="end-date"
              name="end_date"
              type="date"
              value={formData?.end_date || ''}
              onChange={onChange}
              className="admin-field-input"
              placeholder="Write end date here..."
            />
          </div>
        </div>

        {/* Description */}
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor="description-en" className="admin-field-label">
              Description (EN)
            </label>
            <textarea
              id="description-en"
              name="description_en"
              ref={descriptionENRef}
              value={formData?.description_en || ''}
              onChange={onChange}
              className="admin-field-textarea textarea-autoresize"
              placeholder="Write description (EN) here..."
            />
          </div>
          <div className="editor-row-col">
            <label htmlFor="description-ko" className="admin-field-label">
              Description (KO)
            </label>
            <textarea
              id="description-ko"
              name="description_ko"
              ref={descriptionKORef}
              value={formData?.description_ko || ''}
              onChange={onChange}
              className="admin-field-textarea textarea-autoresize"
              placeholder="Write description (KO) here..."
            />
          </div>
        </div>

        {/* Detail */}
        <div className="editor-row">
          <div className="editor-row-col">
            <label htmlFor="detail-en" className="admin-field-label">
              Detail (EN)
            </label>
            <textarea
              id="detail-en"
              name="detail_md_en"
              ref={detailENRef}
              value={formData?.detail_md_en || ''}
              onChange={onChange}
              className="admin-field-textarea textarea-autoresize"
              placeholder="Write detail (EN) here..."
            />
          </div>
          <div className="editor-row-col">
            <label htmlFor="detail-ko" className="admin-field-label">
              Detail (KO)
            </label>
            <textarea
              id="detail-ko"
              name="detail_md_ko"
              ref={detailKORef}
              value={formData?.detail_md_ko || ''}
              onChange={onChange}
              className="admin-field-textarea textarea-autoresize"
              placeholder="Write detail (KO) here..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSave}
            disabled={isSaving || !isUpdated || isDeleting}
            className="btn btn-primary"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={onReset}
            disabled={isSaving || isDeleting}
            className="btn btn-secondary"
            style={{ transition: 'background-color 0.2s ease-in-out' }}
          >
            Reset
          </button>

          {/* Soft Delete (Archive) Button */}
          {mode === ADMIN_FORM_MODE.EDIT && (
            <ConfirmModalButton
              text="Archive"
              disabled={isSaving || isDeleting}
              data={{
                title: 'Archive this education item?',
                description:
                  'This item will be hidden from the public. You can restore it later.',
                danger: true,
                onConfirm: async () => await onDelete()
              }}
            >
              Archive
            </ConfirmModalButton>
          )}
        </div>
      </div>
    </>
  );
}

export default EducationsForm;
