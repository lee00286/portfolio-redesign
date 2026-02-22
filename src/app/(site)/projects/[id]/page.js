import { ModalProvider } from '@/contexts/ModalProvider';
import { getSupabaseData } from '@/lib/supabase/getSupbaseData';
import { getLang } from '@/lib/lang';
import { getFilteredProjectData } from '@/util/helpers';
import WindowLayout from '@/components/computer/WindowLayout';
import Details from '@/components/details/Details';
import DetailsHeader from '@/components/details/DetailsHeader';
import TechStack from '@/components/details/TechStack';
import DetailsSection from '@/components/details/DetailsSection';
import DetailsMarkdown from '@/components/markdown/DetailsMarkdown';
import ImageModal from '@/components/ImageModal';

export async function generateMetadata({ params, searchParams }) {
  const { id } = await params;

  const lang = await getLang(searchParams);

  const { dbData } = await getSupabaseData('projects', {
    filters: { project_id: id }
  });

  if (!dbData?.length) return { title: 'Project' };

  const d = getFilteredProjectData(dbData[0], lang);
  const title = [d.position, d.title].filter(Boolean).join(' - ');

  return {
    title: title || 'Project',
    description: d.description || undefined,
    openGraph: { title, description: d.description || undefined }
  };
}

function renderProjectSections(data, logoUrl, lang) {
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
                aria-label={
                  lang === 'en'
                    ? 'Demo (opens in new tab)'
                    : '데모 (새 탭에서 열림)'
                }
              >
                {lang === 'en' ? 'Demo' : '데모'}
              </a>
            )}
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn !py-1 !text-xs"
                aria-label={
                  lang === 'en'
                    ? 'GitHub (opens in new tab)'
                    : 'GitHub (새 탭에서 열림)'
                }
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
          <DetailsMarkdown data={data} lang={lang} />
        </>
      )}
    </>
  );
}

export default async function ProjectDetails({ params, searchParams }) {
  const { id: projectId } = await params;

  const lang = await getLang(searchParams);

  return (
    <WindowLayout>
      <ModalProvider>
        <div
          className="sm:rounded-b-xl w-full h-full max-h-full overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
            <Details
              dbTableName="projects"
              dbFilters={{ project_id: projectId }}
              renderSections={renderProjectSections}
              lang={lang}
            />
          </div>

          <ImageModal />
        </div>
      </ModalProvider>
    </WindowLayout>
  );
}
