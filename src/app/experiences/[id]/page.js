import WindowLayout from '@/components/computer/WindowLayout';
import SimpleSection from '@/components/SimpleSection';
import Details from '@/components/Details';

export default async function ExperienceDetails({ params }) {
  const { id: experienceId } = await params;

  return (
    <WindowLayout>
      <div className="px-4 py-2 w-full h-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-x-hidden overflow-y-scroll">
        <SimpleSection
          dbTableName="about"
          mobileOnly={true}
          sectionContainerClass="!bg-[rgba(255,255,255,0.8)]"
        />

        <Details
          dbTableName="experiences"
          dbFilters={{
            experience_id: experienceId
          }}
          dataId={experienceId}
        />
      </div>
    </WindowLayout>
  );
}
