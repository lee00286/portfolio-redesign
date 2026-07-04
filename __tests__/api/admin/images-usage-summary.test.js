// Mock Next.js API route
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init = {}) => ({
      body,
      status: init.status || 200
    })
  }
}));

jest.mock('@/lib/admin/requireAdmin', () => ({
  isAdminRequestAuthorized: jest.fn().mockResolvedValue(true)
}));

// Mock Supabase Chain functions
const createSupabaseMock = (initialData = {}) => {
  let row = { ...initialData };

  const chain = {
    // Chaining methods: Allways return mock object
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    not: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    is: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue({ data: [], error: null }),
    update: jest.fn((patch) => {
      row = { ...row, ...patch };
      return chain;
    }),
    insert: jest.fn((data) => {
      row = { id: 'new-id', ...data };
      return chain;
    }),
    delete: jest.fn(() => {
      row = null;
      return chain;
    }),
    maybeSingle: jest.fn(async () => ({
      data: row ?? null,
      error: null
    })),
    single: jest.fn(async () => ({
      data: row,
      error: null
    })),
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn().mockResolvedValue({ error: null }),
        remove: jest.fn().mockResolvedValue({ error: null }),
        getPublicUrl: jest.fn(() => ({
          data: { publicUrl: 'https://example.com/image.jpg' }
        }))
      }))
    }
  };

  return chain;
};

const { POST } = require('@/app/api/admin/images/usage-summary/route');
const { createAdminSupabaseServer } = require('@/lib/supabase/admin');

jest.mock('@/lib/supabase/admin');

describe('POST /images/usage-summary', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 400 if imageIds is missing', async () => {
    const res = await POST({ json: async () => ({}) });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Image IDs are required.');
  });

  it('returns 400 if imageIds is not an array', async () => {
    const res = await POST({ json: async () => ({ imageIds: 'not-array' }) });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Image IDs are required.');
  });

  it('returns 400 if imageIds is empty array', async () => {
    const res = await POST({ json: async () => ({ imageIds: [] }) });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Image IDs are required.');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const res = await POST({
      json: async () => ({ imageIds: ['img-1'] })
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns usage summary with no usage', async () => {
    // Mock in() to resolve with empty data for all three tables
    supabase.in
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] });

    const res = await POST({
      json: async () => ({ imageIds: ['img-1', 'img-2'] })
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data['img-1']).toEqual({ count: 0, entities: [] });
    expect(res.body.data['img-2']).toEqual({ count: 0, entities: [] });
  });

  it('returns usage summary with usage across entities', async () => {
    // Mock in() to resolve with data for each table
    supabase.in
      .mockResolvedValueOnce({
        data: [{ id: 'edu-1', logo: 'img-1' }]
      })
      .mockResolvedValueOnce({
        data: [{ id: 'exp-1', logo: 'img-1' }]
      })
      .mockResolvedValueOnce({
        data: [
          { id: 'proj-1', logo: 'img-1' },
          { id: 'proj-2', logo: 'img-1' }
        ]
      });

    const res = await POST({
      json: async () => ({ imageIds: ['img-1'] })
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data['img-1'].count).toBe(4);
    expect(res.body.data['img-1'].entities).toContain('educations');
    expect(res.body.data['img-1'].entities).toContain('experiences');
    expect(res.body.data['img-1'].entities).toContain('projects');
  });
});
