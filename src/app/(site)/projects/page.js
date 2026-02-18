import WindowLayout from '@/components/computer/WindowLayout';
import DataList from '@/components/list/DataList';

const lang = 'en';

const selectQueryEN =
  'id, project_id, start_date, end_date, title_en, pos_title_en';
const selectQueryKO =
  'id, project_id, start_date, end_date, title_ko, pos_title_ko';
const tableHeadersEN = ['Project Name', 'Position', 'Start Date', 'End Date'];
const tableHeadersKO = ['프로젝트 이름', '직책', '시작 날짜', '종료 날짜'];
const tableBodyEN = ['title_en', 'pos_title_en', 'start_date', 'end_date'];
const tableBodyKO = ['title_ko', 'pos_title_ko', 'start_date', 'end_date'];

export default async function ProjectDetails() {
  const selectQuery = lang === 'en' ? selectQueryEN : selectQueryKO;
  const tableHeaders = lang === 'en' ? tableHeadersEN : tableHeadersKO;
  const tableBody = lang === 'en' ? tableBodyEN : tableBodyKO;

  return (
    <WindowLayout>
      <div
        className="sm:rounded-b-xl w-full h-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
          <DataList
            title={lang === 'ko' ? '프로젝트' : 'Projects'}
            dbTableName="projects"
            uniqueIdKey="project_id"
            queryOptions={{
              select: selectQuery,
              order: 'start_date',
              ascending: false,
              limit: 20,
              skipSoftDelete: true,
              isActiveFilter: true
            }}
            tableHeaders={tableHeaders}
            tableBody={tableBody}
          />
        </div>
      </div>
    </WindowLayout>
  );
}
