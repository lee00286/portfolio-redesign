/**
 * Renders a titled content section.
 */
function DetailsSection({ title, subtitle, logoUrl, logoAlt, children }) {
  return (
    <>
      <hr />
      <div>
        {title && <h2 className="mt-0 mb-4 !text-2xl">{title}</h2>}
        {subtitle && <h3 className="mt-0 mb-3 !text-xl">{subtitle}</h3>}
        {logoUrl && (
          <img
            src={logoUrl}
            alt={logoAlt || ''}
            className="rounded-lg w-full max-h-48 max-w-[70%] md:max-w-[50%] object-cover mb-4"
          />
        )}
        {children ?? <></>}
      </div>
    </>
  );
}

export default DetailsSection;
