import { getLang } from '@/lib/lang';
import WindowLayout from '@/components/computer/WindowLayout';
import Timeline from '@/components/timeline/Timeline';
import TimelineProjectCard from '@/components/timeline/TimelineProjectCard';

export default async function ProjectDetails({ searchParams }) {
  const lang = await getLang(searchParams);

  return (
    <WindowLayout>
      <div
        className="sm:rounded-b-xl w-full h-full max-h-full overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
          <Timeline
            dbTableName="projects"
            queryOptions={{
              select: '*',
              order: 'start_date',
              ascending: false,
              limit: 20,
              skipSoftDelete: true,
              isActiveFilter: true
            }}
            renderItem={({ data, index }) => (
              <TimelineProjectCard data={data} index={index} lang={lang} />
            )}
          />
        </div>
      </div>
    </WindowLayout>
  );
}
