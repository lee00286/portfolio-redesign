const { buildImageUsageMap } = require('@/lib/supabase/admin');

describe('getAdminImageUsageMap', () => {
  const images = [{ id: 'img-1' }, { id: 'img-2' }, { id: 'img-3' }];
  const imageIds = images.map((i) => i.id);

  it('counts usage across multiple entity tables', () => {
    const result = buildImageUsageMap(imageIds, {
      educations: [{ logo: 'img-1' }],
      experiences: [{ logo: 'img-1' }],
      projects: [{ logo: 'img-2' }]
    });

    expect(result['img-1'].count).toBe(2);
    expect(result['img-2'].count).toBe(1);
    expect(result['img-3'].count).toBe(0);
  });

  it('merges entity names without duplication', () => {
    const result = buildImageUsageMap(imageIds, {
      educations: [{ logo: 'img-1' }],
      experiences: [{ logo: 'img-1' }],
      projects: []
    });

    expect(result['img-1'].entities.sort()).toEqual(
      ['educations', 'experiences'].sort()
    );
  });

  it('ignores null or undefined logo references', () => {
    const result = buildImageUsageMap(imageIds, {
      educations: [{ logo: null }],
      experiences: [{ logo: undefined }],
      projects: [{ logo: 'img-1' }]
    });

    expect(result['img-1'].count).toBe(1);
  });

  it('returns count 0 for unused images', () => {
    const result = buildImageUsageMap(imageIds, {
      educations: [],
      experiences: [],
      projects: []
    });

    expect(result['img-3']).toEqual({
      count: 0,
      entities: []
    });
  });
});
