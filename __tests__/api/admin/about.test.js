// Mock Next.js API route
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init = {}) => ({
      body,
      status: init.status || 200
    })
  }
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

const { POST } = require('@/app/api/admin/about/route');
const { createAdminSupabaseServer } = require('@/lib/supabase/admin');

jest.mock('@/lib/supabase/admin');

describe('POST /about', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 400 if id is missing', async () => {
    const res1 = await POST({ json: async () => ({}) });
    const res2 = await POST({ json: async () => ({ id: '' }) });

    expect(res1.status).toBe(400);
    expect(res1.body.error).toBe('About ID is required');
    expect(res2.status).toBe(400);
    expect(res2.body.error).toBe('About ID is required');
  });

  it('returns 400 if updateData is empty', async () => {
    const res = await POST({ json: async () => ({ id: '1' }) });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No update data provided');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const res = await POST({
      json: async () => ({ id: '1', title: 'test' })
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns 500 if supabase update fails', async () => {
    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'DB error' }
    });

    const res = await POST({
      json: async () => ({ id: '1', title: 'fail' })
    });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('DB error');
  });

  it('updates about data successfully', async () => {
    supabase = createSupabaseMock({
      id: '1',
      title: 'Original Title',
      description: 'Original Desc'
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await POST({
      json: async () => ({ id: '1', title: 'Updated Title' })
    });

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated Title');
  });
});
