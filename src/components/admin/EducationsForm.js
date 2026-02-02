'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_BANNER_TYPE, ADMIN_FORM_MODE } from '@/constants/admin';
import { cleanUpAdminFormData } from '@/util/helpers';
import ConfirmModalButton from './ConfirmModalButton';
import AdminInfoBanner from './AdminInfoBanner';
import FormInput from './form/FormInput';
import FormSwitch from './form/FormSwitch';
import FormTextarea from './form/FormTextarea';
import FormImage from './form/FormImage';

const emptyData = {
  education_id: '',
  school_en: '',
  school_ko: '',
  location_en: '',
  location_ko: '',
  logo: null,
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

  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasPendingImage, setHasPendingImage] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Reset key to trigger resets on local image uploads

  // Data
  const [formData, setFormData] = useState({ ...emptyData });
  const [baseData, setBaseData] = useState({ ...emptyData });

  const isUpdated =
    mode === ADMIN_FORM_MODE.CREATE
      ? JSON.stringify(formData) !== JSON.stringify(emptyData)
      : JSON.stringify(formData) !== JSON.stringify(baseData);

  useEffect(() => {
    if (mode === ADMIN_FORM_MODE.CREATE) {
      return;
    }

    setIsFetching(true);

    if (initialData) {
      setBaseData(initialData);
      setFormData(initialData);
      setIsFetching(false);
    }
  }, [initialData, mode]);

  const onReset = () => {
    setFormData(baseData);
    setResetKey((prev) => prev + 1);
    setHasPendingImage(false);
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
    if (isSaving || isUploading || isDeleting || hasPendingImage) return;

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

      router.replace(`/admin/educations/${result.data.education_id}`);
      onReset();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onCreate = async () => {
    if (isSaving || isUploading || hasPendingImage) return;

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
      onReset();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = async () => {
    if (isSaving || isUploading || isDeleting) return;

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
    if (isSaving || isUploading || isDeleting) return;

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
      onReset();
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
            disabled: isSaving || isUploading || isDeleting
          }}
        />
      )}
      <div className="editor space-y-4">
        {/* Education ID */}
        <div className="editor-row">
          <div className="editor-row-col">
            <FormInput
              inputId="education-id"
              name="education_id"
              label="Education ID"
              value={formData?.education_id}
              onChange={onChange}
              placeholder="Write Education ID here..."
              disabled={isFetching || mode === ADMIN_FORM_MODE.EDIT}
              required
            />
          </div>
        </div>

        {/* Is Active */}
        <div className="editor-row">
          <div className="editor-row-col flex flex-row items-center gap-2">
            <FormSwitch
              switchId="is-active"
              name="is_active"
              label="Is Active?"
              checked={formData?.is_active}
              disabled={isFetching}
              onChange={onChange}
              required
            />
          </div>
        </div>

        {/* Education Name */}
        <div className="editor-row">
          <div className="editor-row-col">
            <FormInput
              inputId="school-en"
              name="school_en"
              label="Education Name (EN)"
              value={formData?.school_en}
              placeholder="Write education name (EN) here..."
              disabled={isFetching}
              onChange={onChange}
              required
            />
          </div>
          <div className="editor-row-col">
            <FormInput
              inputId="school-ko"
              name="school_ko"
              label="Education Name (KO)"
              value={formData?.school_ko}
              placeholder="Write education name (KO) here..."
              disabled={isFetching}
              onChange={onChange}
              required
            />
          </div>
        </div>

        {/* Logo */}
        <div className="editor-row">
          <div className="editor-row-col space-y-1">
            <FormImage
              inputId="logo"
              name="logo"
              label="Logo image"
              formLabel="New logo image"
              currImage={formData?.logo}
              resetKey={resetKey}
              disabled={isFetching}
              uploadPath="educations/logo"
              setIsUploading={setIsUploading}
              setHasPendingImage={setHasPendingImage}
              onChange={(imgId) =>
                setFormData((prev) => ({ ...prev, logo: imgId || null }))
              }
            />
          </div>
        </div>

        {/* Location */}
        <div className="editor-row">
          <div className="editor-row-col">
            <FormInput
              inputId="location-en"
              name="location_en"
              label="Location (EN)"
              value={formData?.location_en}
              placeholder="Write location (EN) here..."
              disabled={isFetching}
              onChange={onChange}
            />
          </div>
          <div className="editor-row-col">
            <FormInput
              inputId="location-ko"
              name="location_ko"
              label="Location (KO)"
              value={formData?.location_ko}
              placeholder="Write location (KO) here..."
              disabled={isFetching}
              onChange={onChange}
            />
          </div>
        </div>

        {/* Major */}
        <div className="editor-row">
          <div className="editor-row-col">
            <FormInput
              inputId="major-en"
              name="major_en"
              label="Major/Program (EN)"
              value={formData?.major_en}
              placeholder="Write major or program (EN) here..."
              disabled={isFetching}
              onChange={onChange}
            />
          </div>
          <div className="editor-row-col">
            <FormInput
              inputId="major-ko"
              name="major_ko"
              label="Major/Program (KO)"
              value={formData?.major_ko}
              placeholder="Write major or program (KO) here..."
              disabled={isFetching}
              onChange={onChange}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="editor-row">
          <div className="editor-row-col">
            <FormInput
              inputId="start-date"
              name="start_date"
              type="date"
              label="Education Start Date"
              value={formData?.start_date}
              disabled={isFetching}
              onChange={onChange}
              requied
            />
          </div>
          <div className="editor-row-col">
            <FormInput
              inputId="end-date"
              name="end_date"
              type="date"
              label="Education End Date (will say 'Present' if empty)"
              value={formData?.end_date}
              disabled={isFetching}
              onChange={onChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="editor-row">
          <div className="editor-row-col">
            <FormTextarea
              textareaId="description-en"
              name="description_en"
              label="Description (EN)"
              value={formData?.description_en}
              placeholder="Write description (EN) here..."
              disabled={isFetching}
              onChange={onChange}
              autoResize
            />
          </div>
          <div className="editor-row-col">
            <FormTextarea
              textareaId="description-ko"
              name="description_ko"
              label="Description (KO)"
              value={formData?.description_ko}
              placeholder="Write description (KO) here..."
              disabled={isFetching}
              onChange={onChange}
              autoResize
            />
          </div>
        </div>

        {/* Detail */}
        <div className="editor-row">
          <div className="editor-row-col">
            <FormTextarea
              textareaId="detail-en"
              name="detail_md_en"
              label="Detail (EN)"
              value={formData?.detail_md_en}
              placeholder="Write detail (EN) here..."
              disabled={isFetching}
              onChange={onChange}
              autoResize
            />
          </div>
          <div className="editor-row-col">
            <FormTextarea
              textareaId="detail-ko"
              name="detail_md_ko"
              label="Detail (KO)"
              value={formData?.detail_md_ko}
              placeholder="Write detail (KO) here..."
              disabled={isFetching}
              onChange={onChange}
              autoResize
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSave}
            disabled={
              isFetching ||
              isSaving ||
              !isUpdated ||
              isUploading ||
              isDeleting ||
              hasPendingImage
            }
            className="btn btn-primary"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={onReset}
            disabled={isFetching || isSaving || isUploading || isDeleting}
            className="btn btn-secondary"
            style={{ transition: 'background-color 0.2s ease-in-out' }}
          >
            Reset
          </button>

          {/* Soft Delete (Archive) Button */}
          {mode === ADMIN_FORM_MODE.EDIT && (
            <ConfirmModalButton
              text="Archive"
              disabled={isFetching || isSaving || isUploading || isDeleting}
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

        {hasPendingImage && (
          <p className="font-bold text-red-500">
            Please finish uploading the image or cancel the selected image
            before saving.
          </p>
        )}
      </div>
    </>
  );
}

export default EducationsForm;
