import { getLang } from '@/lib/lang';
import WindowLayout from '@/components/computer/WindowLayout';
import DataList from '@/components/list/DataList';

const selectQueryEN =
  'id, education_id, start_date, end_date, school_en, major_en';
const selectQueryKO =
  'id, education_id, start_date, end_date, school_ko, major_ko';
const tableHeadersEN = ['School Name', 'Major', 'Start Date', 'End Date'];
const tableHeadersKO = ['학교 이름', '전공', '시작 날짜', '종료 날짜'];
const tableBodyEN = ['school_en', 'major_en', 'start_date', 'end_date'];
const tableBodyKO = ['school_ko', 'major_ko', 'start_date', 'end_date'];

export default async function EducationDetails() {
  const lang = await getLang();

  const selectQuery = lang === 'en' ? selectQueryEN : selectQueryKO;
  const tableHeaders = lang === 'en' ? tableHeadersEN : tableHeadersKO;
  const tableBody = lang === 'en' ? tableBodyEN : tableBodyKO;

  return (
    <WindowLayout>
      <div
        className="sm:rounded-b-xl w-full h-full max-h-full overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="px-4 sm:px-5 py-3 w-full h-full overflow-x-hidden overflow-y-auto">
          <DataList
            title={lang === 'ko' ? '학력' : 'Educations'}
            dbTableName="educations"
            uniqueIdKey="education_id"
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
