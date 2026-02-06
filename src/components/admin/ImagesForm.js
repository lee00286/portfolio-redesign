import { ADMIN_FORM_MODE } from '@/constants/admin';
import ConfirmModalButton from './ConfirmModalButton';
import FormInput from './form/FormInput';
import FormImageUpload from './form/FormImageUpload';
import { useRouter } from 'next/navigation';

function ImagesForm({
  mode,
  isFetching = false,
  isUploading = false,
  setIsUploading = () => {},
  isSaving = false,
  isDeleting = false,
  formData,
  setFormData = () => {},
  validationSchema = {},
  hasPendingImage = false,
  setHasPendingImage = () => {},
  isUpdated,
  resetKey,
  onSave, // Controlls create/update
  onReset,
  onDelete
}) {
  const router = useRouter();

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isRequired = (fieldName) => validationSchema?.[fieldName]?.required;

  return mode === ADMIN_FORM_MODE.CREATE ? (
    <>
      {/* Upload Image */}
      <FormImageUpload
        inputId="Image"
        name="image"
        label="Upload Image"
        resetKey={resetKey}
        uploadPath=""
        setIsUploading={setIsUploading}
        setHasPendingImage={setHasPendingImage}
        onUploaded={() => {
          router.replace('/admin/images');
        }}
      />
      {hasPendingImage && (
        <p className="font-bold text-red-500">
          Please finish uploading the image or cancel the selected image before
          exit.
        </p>
      )}
    </>
  ) : mode === ADMIN_FORM_MODE.EDIT ? (
    <>
      {/* Image URL */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="image-url"
            name="image_url"
            label="GitHub URL"
            type="url"
            value={formData?.image_url}
            placeholder="Write image url here..."
            disabled={isFetching}
            required={isRequired('image_url')}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Alt Text */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="image-alt-en"
            name="image_alt_en"
            label="Alt Text (EN)"
            value={formData?.image_alt_en}
            placeholder="Write alt text (EN) here..."
            disabled={isFetching}
            required={isRequired('image_alt_en')}
            onChange={onChange}
          />
        </div>
        <div className="editor-row-col">
          <FormInput
            inputId="image-alt-ko"
            name="image_alt_ko"
            label="Alt Text (KO)"
            value={formData?.image_alt_ko}
            placeholder="Write alt text (KO) here..."
            disabled={isFetching}
            required={isRequired('image_alt_ko')}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Caption */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="image-caption-en"
            name="image_caption_en"
            label="Caption (EN)"
            value={formData?.image_caption_en}
            placeholder="Write caption (EN) here..."
            disabled={isFetching}
            required={isRequired('image_caption_en')}
            onChange={onChange}
          />
        </div>
        <div className="editor-row-col">
          <FormInput
            inputId="image-caption-ko"
            name="image_caption_ko"
            label="Caption (KO)"
            value={formData?.image_caption_ko}
            placeholder="Write caption (KO) here..."
            disabled={isFetching}
            required={isRequired('image_caption_ko')}
            onChange={onChange}
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
            text="Delete Permanently"
            disabled={isFetching || isSaving || isUploading || isDeleting}
            data={{
              title: 'Delete this image permanently?',
              description:
                'This image will be deleted from the storage and the database. This action cannot be undone.',
              danger: true,
              onConfirm: async () => await onDelete()
            }}
          >
            Delete
          </ConfirmModalButton>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

export default ImagesForm;
