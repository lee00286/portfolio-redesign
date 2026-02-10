const { ADMIN_FORM_MODE } = require('@/constants/admin');
const {
  getFilteredAboutData,
  getFilteredEducationData,
  getFilteredExperienceData,
  getFilteredProjectData,
  cleanUpAdminFormData,
  extractStoragePath
} = require('@/util/helpers');

const FIXED_DATE = new Date('2020-01-01');

const mockDbData = {
  education_id: 'test-education-id',
  experience_id: 'test-experience-id',
  project_id: 'test-project-id',
  name_en: 'Name',
  name_ko: '이름',
  school_en: 'School Name',
  school_ko: '학교 이름',
  company_name_en: 'Company Name',
  company_name_ko: '회사 이름',
  company_description_en: 'Company Description',
  company_description_ko: '회사 설명',
  title_en: 'Title',
  title_ko: '제목',
  logo: '',
  location_en: 'Location',
  location_ko: '위치',
  major_en: 'Major',
  major_ko: '전공',
  pos_title_en: 'Position Title',
  pos_title_ko: '직책',
  pos_description_en: 'Position Description',
  pos_description_ko: '직책 설명',
  start_date: FIXED_DATE,
  end_date: FIXED_DATE,
  summary_en: 'Summary',
  summary_ko: '요약',
  description_en: 'Description',
  description_ko: '설명',
  detail_en: 'Detail',
  detail_ko: '상세 설명',
  detail_md_en: 'Detail Markdown',
  detail_md_ko: '상세 설명 마크다운',
  tech_stack: ['Tech Stack 1', 'Tech Stack 2'],
  github: 'https://github.com/',
  url: 'https://google.com/',
  is_active: true,
  created_at: FIXED_DATE,
  updated_at: FIXED_DATE,
  deleted_at: FIXED_DATE
};

describe('getFilteredAboutData', () => {
  const filteredDataEN = {
    name: mockDbData.name_en,
    position: mockDbData.pos_title_en,
    summary: mockDbData.summary_en,
    detail: mockDbData.detail_en
  };

  const filteredDataKO = {
    name: mockDbData.name_ko,
    position: mockDbData.pos_title_ko,
    summary: mockDbData.summary_ko,
    detail: mockDbData.detail_ko
  };

  it('returns the data with only English fields', () => {
    const result1 = getFilteredAboutData(mockDbData, 'en');
    const result2 = getFilteredAboutData(
      {
        ...mockDbData,
        name_en: null,
        pos_title_en: null
      },
      'en'
    );

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual({
      ...filteredDataEN,
      name: '',
      position: ''
    });
  });

  it('returns the data with only Korean fields', () => {
    const result1 = getFilteredAboutData(mockDbData, 'ko');
    const result2 = getFilteredAboutData(
      {
        ...mockDbData,
        summary_ko: null,
        detail_ko: null
      },
      'ko'
    );

    expect(result1).toEqual(filteredDataKO);
    expect(result2).toEqual({
      ...filteredDataKO,
      summary: '',
      detail: ''
    });
  });

  it('returns the data with only English fields for invalid language codes', () => {
    const result1 = getFilteredAboutData(mockDbData);
    const result2 = getFilteredAboutData(mockDbData, '');
    const result3 = getFilteredAboutData(mockDbData, 'fr');

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual(filteredDataEN);
    expect(result3).toEqual(filteredDataEN);
  });

  it('returns the empty object for empty data', () => {
    const result1 = getFilteredAboutData(null, 'en');
    const result2 = getFilteredAboutData(undefined, 'en');
    const result3 = getFilteredAboutData({}, 'en');

    expect(result1).toEqual({});
    expect(result2).toEqual({});
    expect(result3).toEqual({});
  });
});

describe('getFilteredEducationData', () => {
  const filteredDataEN = {
    id: mockDbData.education_id,
    logo: mockDbData.logo,
    start_date: mockDbData.start_date,
    end_date: mockDbData.end_date,
    school: mockDbData.school_en,
    location: mockDbData.location_en,
    major: mockDbData.major_en,
    description: mockDbData.description_en,
    detail_md: mockDbData.detail_md_en,
    is_active: mockDbData.is_active
  };

  const filteredDataKO = {
    id: mockDbData.education_id,
    logo: mockDbData.logo,
    start_date: mockDbData.start_date,
    end_date: mockDbData.end_date,
    school: mockDbData.school_ko,
    location: mockDbData.location_ko,
    major: mockDbData.major_ko,
    description: mockDbData.description_ko,
    detail_md: mockDbData.detail_md_ko,
    is_active: mockDbData.is_active
  };

  it('returns the data with only English fields', () => {
    const result1 = getFilteredEducationData(mockDbData, 'en');
    const result2 = getFilteredEducationData(
      {
        ...mockDbData,
        school_en: null,
        major_en: null
      },
      'en'
    );

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual({
      ...filteredDataEN,
      school: '',
      major: ''
    });
  });

  it('returns the data with only Korean fields', () => {
    const result1 = getFilteredEducationData(mockDbData, 'ko');
    const result2 = getFilteredEducationData(
      {
        ...mockDbData,
        description_ko: null,
        detail_md_ko: null
      },
      'ko'
    );

    expect(result1).toEqual(filteredDataKO);
    expect(result2).toEqual({
      ...filteredDataKO,
      description: '',
      detail_md: ''
    });
  });

  it('returns the data with only English fields for invalid language codes', () => {
    const result1 = getFilteredEducationData(mockDbData);
    const result2 = getFilteredEducationData(mockDbData, '');
    const result3 = getFilteredEducationData(mockDbData, 'fr');

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual(filteredDataEN);
    expect(result3).toEqual(filteredDataEN);
  });

  it('returns the empty object for empty data', () => {
    const result1 = getFilteredEducationData(null, 'en');
    const result2 = getFilteredEducationData(undefined, 'en');
    const result3 = getFilteredEducationData({}, 'en');

    expect(result1).toEqual({});
    expect(result2).toEqual({});
    expect(result3).toEqual({});
  });
});

describe('getFilteredExperienceData', () => {
  const filteredDataEN = {
    id: mockDbData.experience_id,
    logo: mockDbData.logo,
    start_date: mockDbData.start_date,
    end_date: mockDbData.end_date,
    company_name: mockDbData.company_name_en,
    company_description: mockDbData.company_description_en,
    location: mockDbData.location_en,
    position: mockDbData.pos_title_en,
    pos_description: mockDbData.pos_description_en,
    description: mockDbData.description_en,
    tech_stack: mockDbData.tech_stack,
    detail_md: mockDbData.detail_md_en,
    is_active: mockDbData.is_active
  };

  const filteredDataKO = {
    id: mockDbData.experience_id,
    logo: mockDbData.logo,
    start_date: mockDbData.start_date,
    end_date: mockDbData.end_date,
    company_name: mockDbData.company_name_ko,
    company_description: mockDbData.company_description_ko,
    location: mockDbData.location_ko,
    position: mockDbData.pos_title_ko,
    pos_description: mockDbData.pos_description_ko,
    description: mockDbData.description_ko,
    tech_stack: mockDbData.tech_stack,
    detail_md: mockDbData.detail_md_ko,
    is_active: mockDbData.is_active
  };

  it('returns the data with only English fields', () => {
    const result1 = getFilteredExperienceData(mockDbData, 'en');
    const result2 = getFilteredExperienceData(
      {
        ...mockDbData,
        company_name_en: null,
        pos_title_en: null
      },
      'en'
    );

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual({
      ...filteredDataEN,
      company_name: '',
      position: ''
    });
  });

  it('returns the data with only Korean fields', () => {
    const result1 = getFilteredExperienceData(mockDbData, 'ko');
    const result2 = getFilteredExperienceData(
      {
        ...mockDbData,
        company_description_ko: null,
        tech_stack: null
      },
      'ko'
    );

    expect(result1).toEqual(filteredDataKO);
    expect(result2).toEqual({
      ...filteredDataKO,
      company_description: '',
      tech_stack: []
    });
  });

  it('returns the data with only English fields for invalid language codes', () => {
    const result1 = getFilteredExperienceData(mockDbData);
    const result2 = getFilteredExperienceData(mockDbData, '');
    const result3 = getFilteredExperienceData(mockDbData, 'fr');

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual(filteredDataEN);
    expect(result3).toEqual(filteredDataEN);
  });

  it('returns the empty object for empty data', () => {
    const result1 = getFilteredExperienceData(null, 'en');
    const result2 = getFilteredExperienceData(undefined, 'en');
    const result3 = getFilteredExperienceData({}, 'en');

    expect(result1).toEqual({});
    expect(result2).toEqual({});
    expect(result3).toEqual({});
  });
});

describe('getFilteredProjectData', () => {
  const filteredDataEN = {
    id: mockDbData.project_id,
    logo: mockDbData.logo,
    start_date: mockDbData.start_date,
    end_date: mockDbData.end_date,
    title: mockDbData.title_en,
    location: mockDbData.location_en,
    position: mockDbData.pos_title_en,
    description: mockDbData.description_en,
    detail_md: mockDbData.detail_md_en,
    tech_stack: mockDbData.tech_stack,
    github: mockDbData.github,
    url: mockDbData.url,
    is_active: mockDbData.is_active
  };

  const filteredDataKO = {
    id: mockDbData.project_id,
    logo: mockDbData.logo,
    start_date: mockDbData.start_date,
    end_date: mockDbData.end_date,
    title: mockDbData.title_ko,
    location: mockDbData.location_ko,
    position: mockDbData.pos_title_ko,
    description: mockDbData.description_ko,
    detail_md: mockDbData.detail_md_ko,
    tech_stack: mockDbData.tech_stack,
    github: mockDbData.github,
    url: mockDbData.url,
    is_active: mockDbData.is_active
  };

  it('returns the data with only English fields', () => {
    const result1 = getFilteredProjectData(mockDbData, 'en');
    const result2 = getFilteredProjectData(
      {
        ...mockDbData,
        title_en: null,
        github: null
      },
      'en'
    );

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual({
      ...filteredDataEN,
      title: '',
      github: ''
    });
  });

  it('returns the data with only Korean fields', () => {
    const result1 = getFilteredProjectData(mockDbData, 'ko');
    const result2 = getFilteredProjectData(
      {
        ...mockDbData,
        description_ko: null,
        url: null
      },
      'ko'
    );

    expect(result1).toEqual(filteredDataKO);
    expect(result2).toEqual({
      ...filteredDataKO,
      description: '',
      url: ''
    });
  });

  it('returns the data with only English fields for invalid language codes', () => {
    const result1 = getFilteredProjectData(mockDbData);
    const result2 = getFilteredProjectData(mockDbData, '');
    const result3 = getFilteredProjectData(mockDbData, 'fr');

    expect(result1).toEqual(filteredDataEN);
    expect(result2).toEqual(filteredDataEN);
    expect(result3).toEqual(filteredDataEN);
  });

  it('returns the empty object for empty data', () => {
    const result1 = getFilteredProjectData(null, 'en');
    const result2 = getFilteredProjectData(undefined, 'en');
    const result3 = getFilteredProjectData({}, 'en');

    expect(result1).toEqual({});
    expect(result2).toEqual({});
    expect(result3).toEqual({});
  });
});

describe('cleanUpAdminFormData', () => {
  it('returns the same field with uniqueIdKey if the mode is not create', () => {
    const result1 = cleanUpAdminFormData(mockDbData, {
      uniqueIdKey: 'project_id',
      mode: ADMIN_FORM_MODE.EDIT
    });
    const result2 = cleanUpAdminFormData(mockDbData, {
      uniqueIdKey: 'project_id',
      mode: 'some-mode'
    });
    const result3 = cleanUpAdminFormData(mockDbData, {
      uniqueIdKey: 'project_id'
    });
    const result4 = cleanUpAdminFormData(mockDbData);

    expect(result1.project_id).toEqual(mockDbData.project_id);
    expect(result2.project_id).toEqual(mockDbData.project_id);
    expect(result3.project_id).toEqual(mockDbData.project_id);
    expect(result4.project_id).toEqual(mockDbData.project_id);
  });

  it('returns the empty string for the field with uniqueIdKey if the mode is create', () => {
    const result1 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: null
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );
    const result2 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: undefined
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );
    const result3 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: true
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );
    const result4 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: []
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );
    const result5 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: {}
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );

    expect(result1.project_id).toEqual('');
    expect(result2.project_id).toEqual('');
    expect(result3.project_id).toEqual('');
    expect(result4.project_id).toEqual('');
    expect(result5.project_id).toEqual('');
  });

  it('returns the cleaned up field with uniqueIdKey if the mode is create', () => {
    const result1 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: 'project-123!@#-id'
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );
    const result2 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: ' project-123 !@#id.   '
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );
    const result3 = cleanUpAdminFormData(
      {
        ...mockDbData,
        project_id: ' -- project-12 3!@#id. -  '
      },
      { uniqueIdKey: 'project_id', mode: ADMIN_FORM_MODE.CREATE }
    );

    expect(result1.project_id).toEqual('project-123-id');
    expect(result2.project_id).toEqual('project-123-id');
    expect(result3.project_id).toEqual('project-12-3-id');
  });

  it('returns the empty object if raw form data is empty', () => {
    const result1 = cleanUpAdminFormData(null);
    const result2 = cleanUpAdminFormData(undefined);

    expect(result1).toEqual({});
    expect(result2).toEqual({});
  });

  it('returns the raw form data if it is valid', () => {
    const result = cleanUpAdminFormData(mockDbData);

    expect(result).toEqual(mockDbData);
  });

  it('returns the raw form data with normalized start date if date is invalid', () => {
    const result1 = cleanUpAdminFormData({
      ...mockDbData,
      start_date: null
    });
    const result2 = cleanUpAdminFormData({
      ...mockDbData,
      start_date: ''
    });
    const result3 = cleanUpAdminFormData({
      ...mockDbData,
      start_date: 'invalid'
    });

    expect(result1.start_date).toEqual(null);
    expect(result2.start_date).toEqual(null);
    expect(result3.start_date).toEqual(null);
  });

  it('returns the raw form data with the same start date if date is valid', () => {
    const mockStartDate = new Date('2022-02-02');

    const result1 = cleanUpAdminFormData({
      ...mockDbData,
      start_date: '2022-02-02'
    });
    const result2 = cleanUpAdminFormData({
      ...mockDbData,
      start_date: '2022-02-02T00:00:00.000Z'
    });
    const result3 = cleanUpAdminFormData({
      ...mockDbData,
      start_date: mockStartDate
    });

    expect(result1.start_date).toEqual('2022-02-02');
    expect(result2.start_date).toEqual('2022-02-02T00:00:00.000Z');
    expect(result3.start_date).toEqual(mockStartDate);
  });

  it('returns the raw form data with normalized end date if date is invalid', () => {
    const result1 = cleanUpAdminFormData({
      ...mockDbData,
      end_date: null
    });
    const result2 = cleanUpAdminFormData({
      ...mockDbData,
      end_date: ''
    });
    const result3 = cleanUpAdminFormData({
      ...mockDbData,
      end_date: 'invalid'
    });

    expect(result1.end_date).toEqual(null);
    expect(result2.end_date).toEqual(null);
    expect(result3.end_date).toEqual(null);
  });

  it('returns the raw form data with the same end date if date is valid', () => {
    const mockEndDate = new Date('2011-01-01');

    const result1 = cleanUpAdminFormData({
      ...mockDbData,
      end_date: '2011-01-01'
    });
    const result2 = cleanUpAdminFormData({
      ...mockDbData,
      end_date: '2011-01-01T00:00:00.000Z'
    });
    const result3 = cleanUpAdminFormData({
      ...mockDbData,
      end_date: mockEndDate
    });

    expect(result1.end_date).toEqual('2011-01-01');
    expect(result2.end_date).toEqual('2011-01-01T00:00:00.000Z');
    expect(result3.end_date).toEqual(mockEndDate);
  });

  it('returns the raw form data with logo id if logo is an object', () => {
    const result1 = cleanUpAdminFormData({
      ...mockDbData,
      logo: { id: 'test-logo-id' }
    });
    const result2 = cleanUpAdminFormData({
      ...mockDbData,
      logo: 'test-logo-id'
    });

    expect(result1).toEqual({ ...mockDbData, logo: 'test-logo-id' });
    expect(result2).toEqual({ ...mockDbData, logo: 'test-logo-id' });
  });

  it('returns the raw form data with null logo id if logo is an object without id', () => {
    const result1 = cleanUpAdminFormData({
      ...mockDbData,
      logo: null
    });
    const result2 = cleanUpAdminFormData({
      ...mockDbData,
      logo: { test: 'id' }
    });
    const result3 = cleanUpAdminFormData({
      ...mockDbData,
      logo: { id: '' }
    });

    expect(result1).toEqual({ ...mockDbData, logo: null });
    expect(result2).toEqual({ ...mockDbData, logo: null });
    expect(result3).toEqual({ ...mockDbData, logo: null });
  });

  it('returns the raw form data with tech_stack as an empty array if tech_stack is invalid', () => {
    const result1 = cleanUpAdminFormData({
      ...mockDbData,
      tech_stack: 'test'
    });
    const result2 = cleanUpAdminFormData({
      ...mockDbData,
      tech_stack: false
    });
    const result3 = cleanUpAdminFormData({
      ...mockDbData,
      tech_stack: {}
    });
    const result4 = cleanUpAdminFormData({
      ...mockDbData,
      tech_stack: []
    });
    const result5 = cleanUpAdminFormData({
      ...mockDbData,
      tech_stack: null
    });
    const result6 = cleanUpAdminFormData({
      ...mockDbData,
      tech_stack: undefined
    });

    expect(result1).toEqual({ ...mockDbData, tech_stack: [] });
    expect(result2).toEqual({ ...mockDbData, tech_stack: [] });
    expect(result3).toEqual({ ...mockDbData, tech_stack: [] });
    expect(result4).toEqual({ ...mockDbData, tech_stack: [] });
    expect(result5).toEqual({ ...mockDbData, tech_stack: [] });
    expect(result6).toEqual({ ...mockDbData, tech_stack: [] });
  });

  it('returns the empty object for empty data', () => {
    const result1 = cleanUpAdminFormData(null);
    const result2 = cleanUpAdminFormData(undefined, {
      uniqueIdKey: 'project_id'
    });
    const result3 = cleanUpAdminFormData({});

    expect(result1).toEqual({});
    expect(result2).toEqual({});
    expect(result3).toEqual({});
  });
});

describe('extractStoragePath', () => {
  it('returns null if the imageUrl is invalid', () => {
    const result1 = extractStoragePath(null);
    const result2 = extractStoragePath(undefined);
    const result3 = extractStoragePath('');

    expect(result1).toEqual(null);
    expect(result2).toEqual(null);
    expect(result3).toEqual(null);
  });

  it('returns null if the imageUrl does not contain the marker', () => {
    const result1 = extractStoragePath('https://example.com/image.jpg');
    const result2 = extractStoragePath('https://example.com/image.jpg?foo=bar');
    const result3 = extractStoragePath('https://example.com/image.jpg#foo');

    expect(result1).toEqual(null);
    expect(result2).toEqual(null);
    expect(result3).toEqual(null);
  });

  it('returns the path after the marker if the imageUrl contains the marker', () => {
    const result1 = extractStoragePath(
      'https://example.com/storage/v1/object/public/image.jpg'
    );
    const result2 = extractStoragePath(
      'https://example.com/some/path/storage/v1/object/public/image.jpg?foo=bar'
    );
    const result3 = extractStoragePath(
      'https://example.com/some/path/storage/v1/object/public/more/path/image.jpg#foo'
    );

    expect(result1).toEqual('image.jpg');
    expect(result2).toEqual('image.jpg?foo=bar');
    expect(result3).toEqual('more/path/image.jpg#foo');
  });
});
