import { getLang } from '@/lib/lang';
import { experiencesSimpleSectionQueryOptions } from '@/constants/supabase';
import WindowLayout from '@/components/computer/WindowLayout';
import ScrollHashObserver from '@/components/ScrollHashObserver';
import SimpleSection from '@/components/SimpleSection';

const sections = [
  {
    title: { en: 'Educations', ko: '학력' },
    description: { en: 'List of educations.', ko: '학력 목록입니다.' },
    dbTableName: 'educations'
  },
  {
    title: { en: 'Experiences', ko: '경력' },
    description: { en: 'List of experiences.', ko: '경력 목록입니다.' },
    dbTableName: 'experiences'
  },
  {
    title: { en: 'Projects', ko: '프로젝트' },
    description: {
      en: 'List of projects I have worked on.',
      ko: '제가 작업한 프로젝트 목록입니다.'
    },
    dbTableName: 'projects'
  }
];

export default async function Home() {
  const lang = await getLang();

  return (
    <WindowLayout>
      <div
        data-scroll-container
        className="px-4 xmd:px-5 py-3 w-full h-full max-h-full overflow-x-hidden overflow-y-auto"
      >
        <ScrollHashObserver />

        <SimpleSection
          dbTableName="about"
          mobileOnly={true}
          sectionContainerClass="!bg-[rgba(255,255,255,0.9)]"
        />

        {Array.isArray(sections) &&
          sections.length > 0 &&
          sections.map((section, index) => (
            <SimpleSection
              key={`simple-section-${index}`}
              title={section.title[lang] || section.title.en}
              description={
                section.description
                  ? section.description[lang] || section.description.en
                  : ''
              }
              dbTableName={section.dbTableName}
              queryOptions={
                section.dbTableName === 'experiences'
                  ? experiencesSimpleSectionQueryOptions
                  : null
              }
            />
          ))}
      </div>
    </WindowLayout>
  );
}
