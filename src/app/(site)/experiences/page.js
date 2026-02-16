import WindowLayout from '@/components/computer/WindowLayout';
import DataList from '@/components/list/DataList';

const lang = 'en';

const selectQueryEN =
  'id, experience_id, start_date, end_date, company_name_en, pos_title_en';
const selectQueryKO =
  'id, experience_id, start_date, end_date, company_name_ko, pos_title_ko';
const tableHeadersEN = ['Company Name', 'Position', 'Start Date', 'End Date'];
const tableHeadersKO = ['회사 이름', '직책', '시작 날짜', '종료 날짜'];
const tableBodyEN = [
  'company_name_en',
  'pos_title_en',
  'start_date',
  'end_date'
];
const tableBodyKO = [
  'company_name_ko',
  'pos_title_ko',
  'start_date',
  'end_date'
];

export default async function ExperienceDetails() {
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
            title={lang === 'ko' ? '경력' : 'Experiences'}
            dbTableName="experiences"
            uniqueIdKey="experience_id"
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
