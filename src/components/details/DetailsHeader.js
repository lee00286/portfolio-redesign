/**
 * Renders the header block shared across all detail types.
 */
function DetailsHeader({ data, title, subtitle, location }) {
  return (
    <div className="space-y-2">
      {(data.start_date || data.end_date) && (
        <p className="eyebrow">
          <span className="text-nowrap">{data.start_date || 'Unknown'}</span>{' '}
          &mdash;&nbsp;
          <span className="text-nowrap">{data.end_date || 'Present'}</span>
        </p>
      )}

      {title && <h2>{title}</h2>}
      {subtitle && <h3 className="!text-xl mt-0">{subtitle}</h3>}
      {location && (
        <p className="!text-gray-500 !font-medium !text-sm">{location}</p>
      )}
    </div>
  );
}

export default DetailsHeader;
