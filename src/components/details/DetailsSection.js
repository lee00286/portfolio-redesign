/**
 * Renders a titled content section.
 */
function DetailsSection({ title, subtitle, logoUrl, logoAlt, children }) {
  if (!children) return null;

  return (
    <>
      <hr className="my-4 border-gray-300" />
      <div>
        {title && <h2 className="mt-0 mb-4 !text-2xl">{title}</h2>}
        {subtitle && <h3 className="mt-0 mb-3 !text-xl">{subtitle}</h3>}
        {logoUrl && (
          <img
            src={logoUrl}
            alt={logoAlt || ''}
            className="rounded-lg w-full max-h-48 object-cover mb-4"
          />
        )}
        {children}
      </div>
    </>
  );
}

export default DetailsSection;
