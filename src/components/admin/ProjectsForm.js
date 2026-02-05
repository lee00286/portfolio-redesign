import { ADMIN_FORM_MODE } from '@/constants/admin';
import ConfirmModalButton from './ConfirmModalButton';
import FormInput from './form/FormInput';
import FormSwitch from './form/FormSwitch';
import FormTextarea from './form/FormTextarea';
import FormImage from './form/FormImage';
import FormTags from './form/FormTags';

function ProjectsForm({
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
      {/* Project ID */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="project-id"
            name="project_id"
            label="Project ID"
            value={formData?.project_id}
            onChange={onChange}
            placeholder="Write Project ID here..."
            disabled={isFetching || mode === ADMIN_FORM_MODE.EDIT}
            required={isRequired('project_id')}
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

      {/* Project Title */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="title-en"
            name="title_en"
            label="Project Title (EN)"
            value={formData?.title_en}
            placeholder="Write project title (EN) here..."
            disabled={isFetching}
            required={isRequired('title_en')}
            onChange={onChange}
          />
        </div>
        <div className="editor-row-col">
          <FormInput
            inputId="title-ko"
            name="title_ko"
            label="Project Title (KO)"
            value={formData?.title_ko}
            placeholder="Write project title (KO) here..."
            disabled={isFetching}
            required={isRequired('title_ko')}
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
            uploadPath="projects/logo"
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

      {/* Dates */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="start-date"
            name="start_date"
            type="date"
            label="Project Start Date"
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
            label="Project End Date (will say 'Present' if empty)"
            value={formData?.end_date}
            disabled={isFetching}
            required={isRequired('end_date')}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Position Title */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="pos-title-en"
            name="pos_title_en"
            label="Position Title (EN)"
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
            label="Position Title (KO)"
            value={formData?.pos_title_ko}
            placeholder="Write position title (KO) here..."
            disabled={isFetching}
            required={isRequired('pos_title_ko')}
            onChange={onChange}
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

      {/* Project URL */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="project-url"
            name="url"
            label="Project URL"
            type="url"
            value={formData?.url}
            placeholder="Write project url here..."
            disabled={isFetching}
            required={isRequired('url')}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Project GitHub URL */}
      <div className="editor-row">
        <div className="editor-row-col">
          <FormInput
            inputId="github-url"
            name="github"
            label="GitHub URL"
            type="url"
            value={formData?.github}
            placeholder="Write github url here..."
            disabled={isFetching}
            required={isRequired('github')}
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
            text="Archive"
            disabled={isFetching || isSaving || isUploading || isDeleting}
            data={{
              title: 'Archive this project item?',
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

export default ProjectsForm;
