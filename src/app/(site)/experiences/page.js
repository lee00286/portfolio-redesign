import { getLang } from '@/lib/lang';
import WindowLayout from '@/components/computer/WindowLayout';
import Timeline from '@/components/timeline/Timeline';
import TimelineExperienceCard from '@/components/timeline/TimelineExperienceCard';

export default async function ExperienceDetails({ searchParams }) {
  const lang = await getLang(searchParams);

  return (
    <WindowLayout>
      <div
        className="sm:rounded-b-xl w-full h-full max-h-full overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
          <Timeline
            dbTableName="experiences"
            uniqueKey="experience_id"
            queryOptions={{
              select: '*',
              order: 'start_date',
              ascending: false,
              limit: 20,
              skipSoftDelete: true,
              isActiveFilter: true
            }}
            renderItem={({ data, index, uniqueKey }) => (
              <TimelineExperienceCard
                data={data}
                index={index}
                uniqueKey={uniqueKey}
                lang={lang}
              />
            )}
            lang={lang}
          />
        </div>
      </div>
    </WindowLayout>
  );
}
