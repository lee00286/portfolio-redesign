import { ModalProvider } from '@/contexts/ModalProvider';
import WindowLayout from '@/components/computer/WindowLayout';
import Details from '@/components/details/Details';
import DetailsHeader from '@/components/details/DetailsHeader';
import DetailsSection from '@/components/details/DetailsSection';
import DetailsMarkdown from '@/components/markdown/DetailsMarkdown';
import ImageModal from '@/components/ImageModal';

function renderEducationSections(data, logoUrl, lang) {
  return (
    <>
      <DetailsHeader
        data={data}
        title={data.school}
        subtitle={data.major}
        location={data.location}
      />

      <DetailsSection
        title={lang === 'ko' ? '학교 소개' : 'About School'}
        subtitle={data.school}
        logoUrl={logoUrl}
        logoAlt={data.school}
      >
        {data.description && (
          <p className="!text-gray-700">{data.description}</p>
        )}
      </DetailsSection>

      {data?.detail_md && (
        <>
          <hr />
          <DetailsMarkdown data={data} lang={lang} />
        </>
      )}
    </>
  );
}

export default async function EducationDetails({ params }) {
  const { id: educationId } = await params;

  return (
    <WindowLayout>
      <ModalProvider>
        <div
          className="sm:rounded-b-xl w-full h-full max-h-full overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
            <Details
              dbTableName="educations"
              dbFilters={{ education_id: educationId }}
              renderSections={renderEducationSections}
            />
          </div>

          <ImageModal />
        </div>
      </ModalProvider>
    </WindowLayout>
  );
}
