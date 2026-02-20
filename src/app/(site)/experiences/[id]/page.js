import { ModalProvider } from '@/contexts/ModalProvider';
import WindowLayout from '@/components/computer/WindowLayout';
import Details from '@/components/details/Details';
import DetailsHeader from '@/components/details/DetailsHeader';
import TechStack from '@/components/details/TechStack';
import DetailsSection from '@/components/details/DetailsSection';
import DetailsMarkdown from '@/components/markdown/DetailsMarkdown';
import ImageModal from '@/components/ImageModal';

function renderExperienceSections(data, logoUrl, lang) {
  const title = [data.position, data.company_name].filter(Boolean).join(' - ');

  return (
    <>
      <DetailsHeader data={data} title={title} location={data.location} />

      <TechStack techStack={data.tech_stack} prefix="experience" />

      {data.company_description && (
        <DetailsSection
          title={lang === 'ko' ? '회사 소개' : 'About Company'}
          subtitle={data.company_name}
          logoUrl={logoUrl}
          logoAlt={data.company_name}
        >
          <p className="!text-gray-700">{data.company_description}</p>
        </DetailsSection>
      )}

      {data.pos_description && (
        <DetailsSection
          title={lang === 'ko' ? '직무 소개' : 'About Position'}
          subtitle={data.position}
        >
          <p className="!text-gray-700">{data.pos_description}</p>
        </DetailsSection>
      )}

      {data.description && (
        <DetailsSection title={lang === 'ko' ? '업무 내용' : 'About Work'}>
          <p className="!text-gray-700">{data.description}</p>
        </DetailsSection>
      )}

      {data?.detail_md && (
        <>
          <hr />
          <DetailsMarkdown data={data} lang={lang} />
        </>
      )}
    </>
  );
}

export default async function ExperienceDetails({ params }) {
  const { id: experienceId } = await params;

  return (
    <WindowLayout>
      <ModalProvider>
        <div
          className="sm:rounded-b-xl w-full h-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
            <Details
              dbTableName="experiences"
              dbFilters={{ experience_id: experienceId }}
              renderSections={renderExperienceSections}
            />
          </div>

          <ImageModal />
        </div>
      </ModalProvider>
    </WindowLayout>
  );
}
