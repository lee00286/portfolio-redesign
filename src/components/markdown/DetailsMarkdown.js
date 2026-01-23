import ReactMarkdown from 'react-markdown';

function DetailsMarkdown({ data }) {
  if (!data) return <></>;

  return (
    <article className="detail-markdown">
      <ReactMarkdown>{data.detail_md}</ReactMarkdown>
    </article>
  );
}

export default DetailsMarkdown;
