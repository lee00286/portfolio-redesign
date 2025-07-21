function AboutCard({ data }) {
  if (!data) return <></>;

  const lang = 'en';

  const filteredData = {
    name: lang === 'ko' ? data.name_ko : data.name_en,
    position: lang === 'ko' ? data.pos_title_ko : data.pos_title_en,
    summary: lang === 'ko' ? data.summary_ko : data.summary_en,
    detail: lang === 'ko' ? data.detail_ko : data.detail_en
    // created_at: data.created_at,
    // updated_at: data.updated_at
  };

  return (
    <div className="simple-section--card text-center">
      <div className="w-full">
        {filteredData.name && <h3>{filteredData.name}</h3>}

        {filteredData.position && (
          <p className="mt-1 !text-yellow-400 !font-bold">
            {filteredData.position}
          </p>
        )}
      </div>

      {filteredData.summary && <p>{filteredData.summary}</p>}
    </div>
  );
}

export default AboutCard;
