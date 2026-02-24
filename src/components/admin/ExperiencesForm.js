import { ADMIN_FORM_MODE } from '@/constants/admin';
import ConfirmModalButton from './ConfirmModalButton';
import FormInput from './form/FormInput';
import FormSwitch from './form/FormSwitch';
import FormTextarea from './form/FormTextarea';
import FormImage from './form/FormImage';
import FormTags from './form/FormTags';

function ExperiencesForm({
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

  const onArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isRequired = (fieldName) => validationSchema?.[fieldName]?.required;

  return (
    <>
      {/* Experience ID */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="experience-id"
            name="experience_id"
            label="Experience ID"
            value={formData?.experience_id}
            onChange={onChange}
            placeholder="Write Experience ID here..."
            disabled={isFetching || mode === ADMIN_FORM_MODE.EDIT}
            required={isRequired('experience_id')}
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

      {/* Company Name */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="company-name-en"
            name="company_name_en"
            label="Company Name (EN)"
            value={formData?.company_name_en}
            placeholder="Write company name (EN) here..."
            disabled={isFetching}
            required={isRequired('company_name_en')}
            onChange={onChange}
          />
        </div>
        <div className="editor-row-col">
          <FormInput
            inputId="company-name-ko"
            name="company_name_ko"
            label="Company Name (KO)"
            value={formData?.company_name_ko}
            placeholder="Write company name (KO) here..."
            disabled={isFetching}
            required={isRequired('company_name_ko')}
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
            uploadPath="experiences/logo"
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
            placeholder="Write company location (EN) here..."
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
            placeholder="Write company location (KO) here..."
            disabled={isFetching}
            required={isRequired('location_ko')}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Company Description */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormTextarea
            textareaId="company-description-en"
            name="company_description_en"
            label="Company Description (EN)"
            value={formData?.company_description_en}
            placeholder="Write company description (EN) here..."
            disabled={isFetching}
            required={isRequired('company_description_en')}
            onChange={onChange}
            autoResize
          />
        </div>
        <div className="editor-row-col">
          <FormTextarea
            textareaId="company-description-ko"
            name="company_description_ko"
            label="Company Description (KO)"
            value={formData?.company_description_ko}
            placeholder="Write company description (KO) here..."
            disabled={isFetching}
            required={isRequired('company_description_ko')}
            onChange={onChange}
            autoResize
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
            label="Experience Start Date"
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
            label="Experience End Date (will say 'Present' if empty)"
            value={formData?.end_date}
            disabled={isFetching}
            required={isRequired('end_date')}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Work Position Title */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="pos-title-en"
            name="pos_title_en"
            label="Work Position Title (EN)"
            value={formData?.pos_title_en}
            placeholder="Write position title (EN) here..."
            disabled={isFetching}
            required={isRequired('pos_title_en')}
            onChange={onChange}
          />
        </div>
        <div className="editor-row-col">
          <FormInput
            inputId="pos-title-ko"
            name="pos_title_ko"
            label="Work Position Title (KO)"
            value={formData?.pos_title_ko}
            placeholder="Write position title (KO) here..."
            disabled={isFetching}
            required={isRequired('pos_title_ko')}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Position Description */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormTextarea
            textareaId="pos-description-en"
            name="pos_description_en"
            label="Position Description (EN)"
            value={formData?.pos_description_en}
            placeholder="Write position description (EN) here..."
            disabled={isFetching}
            required={isRequired('pos_description_en')}
            onChange={onChange}
            autoResize
          />
        </div>
        <div className="editor-row-col">
          <FormTextarea
            textareaId="pos-description-ko"
            name="pos_description_ko"
            label="Position Description (KO)"
            value={formData?.pos_description_ko}
            placeholder="Write position description (KO) here..."
            disabled={isFetching}
            required={isRequired('pos_description_ko')}
            onChange={onChange}
            autoResize
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormTags
            inputId="tech-stack"
            name="tech_stack"
            label="Tech Stack"
            value={formData?.tech_stack}
            placeholder="Write tech stack here..."
            disabled={isFetching}
            required={isRequired('tech_stack')}
            onChange={onArrayChange}
          />
        </div>
      </div>

      {/* Description */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormTextarea
            textareaId="description-en"
            name="description_en"
            label="Overall Description (EN)"
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
            label="Overall Description (KO)"
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
              title: 'Archive this experience item?',
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

export default ExperiencesForm;
