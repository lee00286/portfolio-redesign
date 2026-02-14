import WindowLayout from '@/components/computer/WindowLayout';
import ScrollHashObserver from '@/components/ScrollHashObserver';
import SimpleSection from '@/components/SimpleSection';

const sections = [
  {
    title: 'Educations',
    description: 'List of educations.',
    dbTableName: 'educations',
    iconSrc: '/img/icons/education-icon.svg',
    iconAlt: 'Education',
    width: 25,
    height: 25,
    sidebarClass: 'btn--sidebar-lg'
  },
  {
    title: 'Experiences',
    description: 'List of experiences.',
    dbTableName: 'experiences',
    iconSrc: '/img/icons/work-bag-icon.svg',
    iconAlt: 'Work bag icon'
  },
  {
    title: 'Projects',
    description: 'List of projects I have worked on.',
    dbTableName: 'projects',
    iconSrc: '/img/icons/write-icon.svg',
    iconAlt: 'Write icon'
  }
];

export default function Home() {
  return (
    <WindowLayout>
      <div
        data-scroll-container
        className="px-4 sm:px-5 py-3 w-full h-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-x-hidden overflow-y-auto"
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
              title={section.title}
              description={section.description}
              dbTableName={section.dbTableName}
            />
          ))}
      </div>
    </WindowLayout>
  );
}
