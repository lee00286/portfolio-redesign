import { ADMIN_FORM_MODE } from '@/constants/admin';
import ConfirmModalButton from './ConfirmModalButton';
import FormInput from './form/FormInput';
import FormSwitch from './form/FormSwitch';
import FormTextarea from './form/FormTextarea';
import FormImage from './form/FormImage';

function EducationsForm({
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
  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isRequired = (fieldName) => validationSchema?.[fieldName]?.required;

  return (
    <>
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
            required={isRequired('education_id')}
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
            required={isRequired('is_active')}
            onChange={onChange}
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
            required={isRequired('school_en')}
            onChange={onChange}
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
            required={isRequired('school_ko')}
            onChange={onChange}
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
            required={isRequired('logo')}
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
            required={isRequired('location_en')}
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
            required={isRequired('location_ko')}
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
            required={isRequired('major_en')}
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
            required={isRequired('major_ko')}
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
            required={isRequired('start_date')}
            onChange={onChange}
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
            required={isRequired('end_date')}
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
            required={isRequired('description_en')}
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
            required={isRequired('description_ko')}
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
            required={isRequired('detail_md_en')}
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
            required={isRequired('detail_md_ko')}
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
          Please finish uploading the image or cancel the selected image before
          saving.
        </p>
      )}
    </>
  );
}

export default EducationsForm;
