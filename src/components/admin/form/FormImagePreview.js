function FormImagePreview({ image, title }) {
  return (
    <div>
      <p className="text-sm font-bold">{title}</p>
      {image?.image_url ? (
        <img
          src={image.image_url}
          alt={image.alt_en || ''}
          className="border border-black rounded h-20 object-contain"
        />
      ) : (
        <p className="flex justify-center items-center border border-black rounded p-1 w-20 h-20 text-sm text-black object-video">
          No image
        </p>
      )}
    </div>
  );
}

export default FormImagePreview;
