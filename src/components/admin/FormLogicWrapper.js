'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_BANNER_TYPE, ADMIN_FORM_MODE } from '@/constants/admin';
import { cleanUpAdminFormData, validateFormBySchema } from '@/util/helpers';
import AdminInfoBanner from './AdminInfoBanner';

function FormLogicWrapper({
  entityName = '',
  uniqueKey = '',
  mode,
  initialData,
  emptyData = {},
  validationSchema = {},
  render
}) {
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
    const isValid = validateFormBySchema({
      validationSchema,
      mode,
      formData
    });

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
      const res = await fetch(`/api/admin/${entityName}/${initialData?.id}`, {
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

      router.replace(`/admin/${entityName}/${result.data[uniqueKey]}`);
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
    const isValid = validateFormBySchema({
      validationSchema,
      mode,
      formData
    });

    if (!isValid) {
      setIsSaving(false);
      return;
    }

    // Create
    const payload = {
      ...cleanUpAdminFormData(formData, { uniqueIdKey: uniqueKey, mode })
    };

    try {
      const res = await fetch(`/api/admin/${entityName}`, {
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

      router.replace(`/admin/${entityName}/${result.data[uniqueKey]}`);
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
      const res = await fetch(`/api/admin/${entityName}/${initialData?.id}`, {
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

      router.replace(`/admin/${entityName}`);
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
      const res = await fetch(`/api/admin/${entityName}/${initialData?.id}`, {
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

      router.replace(`/admin/${entityName}/${result.data[uniqueKey]}`);
      onReset();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!entityName || !uniqueKey) return <></>;

  return (
    <>
      {formData?.deleted_at && (
        <AdminInfoBanner
          type={ADMIN_BANNER_TYPE.WARNING}
          message="This item is archived."
          confirmTitle="Restore this item?"
          confirmDescription="This item will remain inactive but will be back to your data list."
          action={{
            label: 'Restore',
            onClick: onRestore,
            disabled: isSaving || isUploading || isDeleting
          }}
        />
      )}
      <div className="editor space-y-4">
        {render({
          mode,
          isFetching,
          isUploading,
          setIsUploading,
          isSaving,
          isDeleting,
          formData,
          setFormData,
          validationSchema,
          isUpdated,
          resetKey,
          hasPendingImage,
          setHasPendingImage,
          onSave,
          onReset,
          onDelete
        })}
      </div>
    </>
  );
}

export default FormLogicWrapper;
