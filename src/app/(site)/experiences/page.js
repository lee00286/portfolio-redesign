import WindowLayout from '@/components/computer/WindowLayout';
import Timeline from '@/components/timeline/Timeline';
import TimelineExperienceCard from '@/components/timeline/TimelineExperienceCard';

export default async function ExperienceDetails() {
  return (
    <WindowLayout>
      <div
        className="sm:rounded-b-xl w-full h-full max-h-full overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
          <Timeline
            dbTableName="experiences"
            queryOptions={{
              select: '*',
              order: 'start_date',
              ascending: false,
              limit: 20,
              skipSoftDelete: true,
              isActiveFilter: true
            }}
            renderItem={({ data, index, lang }) => (
              <TimelineExperienceCard data={data} index={index} lang={lang} />
            )}
          />
        </div>
      </div>
    </WindowLayout>
  );
}
