import { ModalProvider } from '@/contexts/ModalProvider';
import WindowLayout from '@/components/computer/WindowLayout';
import Details from '@/components/details/Details';
import DetailsHeader from '@/components/details/DetailsHeader';
import TechStack from '@/components/details/TechStack';
import DetailsSection from '@/components/details/DetailsSection';
import DetailsMarkdown from '@/components/markdown/DetailsMarkdown';
import ImageModal from '@/components/ImageModal';

const lang = 'en';

function renderProjectSections(data, logoUrl) {
  const title = [data.position, data.title].filter(Boolean).join(' - ');

  return (
    <>
      <DetailsHeader data={data} title={title} location={data.location} />

      <TechStack techStack={data.tech_stack} prefix="project" />

      <DetailsSection
        title={lang === 'ko' ? '프로젝트 소개' : 'About Project'}
        subtitle={data.title}
        logoUrl={logoUrl}
        logoAlt={data.title}
      >
        {data.description && (
          <p className="!text-gray-700">{data.description}</p>
        )}

        {(data.url || data.github) && (
          <div className="flex items-center gap-3 mt-5">
            {data.url && (
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary !py-1 !text-xs"
                aria-label="Demo (opens in new tab)"
              >
                Demo
              </a>
            )}
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn !py-1 !text-xs"
                aria-label="GitHub (opens in new tab)"
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </DetailsSection>

      {data?.detail_md && (
        <>
          <hr />
          <DetailsMarkdown data={data} />
        </>
      )}
    </>
  );
}

export default async function ProjectDetails({ params }) {
  const { id: projectId } = await params;

  return (
    <WindowLayout>
      <ModalProvider>
        <div
          className="sm:rounded-b-xl w-full h-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
            <Details
              dbTableName="projects"
              dbFilters={{ project_id: projectId }}
              renderSections={renderProjectSections}
            />
          </div>

          <ImageModal />
        </div>
      </ModalProvider>
    </WindowLayout>
  );
}
