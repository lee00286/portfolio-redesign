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

const { POST } = require('@/app/api/admin/experiences/route');
const {
  PUT,
  PATCH,
  DELETE
} = require('@/app/api/admin/experiences/[id]/route');
const { createAdminSupabaseServer } = require('@/lib/supabase/admin');

jest.mock('@/lib/supabase/admin');

const FIXED_DATE = new Date('2020-01-01');

describe('POST /experiences', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();

    supabase.maybeSingle.mockResolvedValue({
      data: null,
      error: null
    });

    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 400 if experience_id is missing', async () => {
    const res1 = await POST({ json: async () => ({}) });
    const res2 = await POST({ json: async () => ({ experience_id: '' }) });

    expect(res1.status).toBe(400);
    expect(res1.body.error).toBe('experience_id is required.');
    expect(res2.status).toBe(400);
    expect(res2.body.error).toBe('experience_id is required.');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const res = await POST({
      json: async () => ({ experience_id: 'new-experience' })
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns 409 if experience_id already exists', async () => {
    createAdminSupabaseServer.mockReturnValue(supabase);

    supabase.maybeSingle.mockResolvedValueOnce({
      data: { id: '1', experience_id: 'new-experience' },
      error: null
    });

    const req = {
      json: async () => ({ experience_id: 'new-experience' })
    };

    const res = await POST(req);

    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Experience ID already exists');
  });

  it('returns 500 if supabase create fails', async () => {
    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'DB error' }
    });

    const res = await POST({
      json: async () => ({ experience_id: 'new-experience-500', name: 'Test' })
    });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('DB error');
  });

  it('creates experience successfully', async () => {
    const req = {
      json: async () => ({ experience_id: 'new-experience-3', name: 'Test' })
    };

    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});

describe('PUT /experiences/[id]', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 400 if id is missing', async () => {
    const res = await PUT({ json: async () => ({}) }, { params: {} });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Experience ID is required');
  });

  it('returns 400 if updateData is missing or empty', async () => {
    const res1 = await PUT({ json: async () => null }, { params: { id: '1' } });
    const res2 = await PUT(
      { json: async () => undefined },
      { params: { id: '1' } }
    );
    const res3 = await PUT({ json: async () => ({}) }, { params: { id: '1' } });

    expect(res1.status).toBe(400);
    expect(res1.body.error).toBe('No update data provided');
    expect(res2.status).toBe(400);
    expect(res2.body.error).toBe('No update data provided');
    expect(res3.status).toBe(400);
    expect(res3.body.error).toBe('No update data provided');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const res = await PUT(
      { json: async () => ({ title: 'test' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns 404 if experience does not exist', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null
    });

    const res = await PUT(
      { json: async () => ({ title: 'test' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Experience data not found');
  });

  it('returns 500 if supabase update fails', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({ data: { id: '1' } });

    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'DB error' }
    });

    const res = await PUT(
      { json: async () => ({ title: 'fail' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('DB error');
  });

  it('updates experience successfully', async () => {
    supabase = createSupabaseMock({
      id: '123',
      experience_id: 'new-experience-123',
      title: '123',
      is_active: true,
      deleted_at: null
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await PUT(
      { json: async () => ({ title: 'test 123' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('test 123');
  });
});

describe('PATCH /experiences/[id]', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 400 if id is missing', async () => {
    const res = await PATCH({ json: async () => ({}) }, { params: {} });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Experience ID is required');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const res = await PATCH(
      { json: async () => ({}) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns 404 if experience does not exist', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null
    });

    const res = await PATCH(
      { json: async () => ({ title: 'test' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Archived experience data not found');
  });

  it('returns 500 if supabase update fails', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({ data: { id: '1' } });

    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'DB error' }
    });

    const res = await PATCH(
      { json: async () => ({ title: 'fail' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('DB error');
  });

  it('restores experience successfully if is_active is false', async () => {
    supabase = createSupabaseMock({
      id: '123',
      experience_id: 'new-experience-123',
      title: '123',
      is_active: false,
      deleted_at: null
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await PATCH(null, { params: { id: '123' } });

    expect(res.status).toBe(200);
    expect(res.body.data.deleted_at).toBeNull();
    expect(res.body.data.is_active).toBe(false);
  });

  it('restores experience successfully if is_active is true', async () => {
    supabase = createSupabaseMock({
      id: '124',
      experience_id: 'new-experience-124',
      title: '124',
      is_active: true,
      deleted_at: null
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await PATCH(
      { json: async () => ({ title: 'test' }) },
      { params: { id: '124' } }
    );

    expect(res.status).toBe(200);
    expect(res.body.data.deleted_at).toBeNull();
    expect(res.body.data.is_active).toBe(false);
  });
});

describe('DELETE /experiences/[id]', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 400 if id is missing', async () => {
    const res = await DELETE({ json: async () => ({}) }, { params: {} });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Experience ID is required');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const res = await DELETE(
      { json: async () => ({}) },
      { params: { id: 'test' } }
    );

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns 404 if experience does not exist', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null
    });

    const res = await DELETE(
      { json: async () => ({ title: 'test' }) },
      { params: { id: 'test' } }
    );

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Experience data not found');
  });

  it('returns 500 if supabase update fails', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({ data: { id: 1 } });

    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'DB error' }
    });

    const res = await DELETE(
      { json: async () => ({ title: 'fail' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('DB error');
  });

  it('soft deletes experience successfully if deleted_at is not null', async () => {
    supabase = createSupabaseMock({
      id: '123',
      experience_id: 'new-experience-123',
      title: 'test 123',
      is_active: true,
      deleted_at: FIXED_DATE
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await DELETE(null, { params: { id: '123' } });

    expect(res.status).toBe(200);
    expect(res.body.data.deleted_at).toBeDefined();
    expect(res.body.data.is_active).toBe(false);
  });

  it('soft deletes experience successfully if is_active is true', async () => {
    supabase = createSupabaseMock({
      id: '123',
      experience_id: 'new-experience-123',
      title: 'test 123',
      is_active: true,
      deleted_at: null
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await DELETE(null, { params: { id: '123' } });

    expect(res.status).toBe(200);
    expect(res.body.data.deleted_at).toBeDefined();
    expect(res.body.data.is_active).toBe(false);
  });

  it('soft deletes experience successfully if is_active is false', async () => {
    supabase = createSupabaseMock({
      id: '124',
      experience_id: 'new-experience-124',
      title: 'test 124',
      is_active: false,
      deleted_at: null
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await DELETE(
      { json: async () => ({ title: 'test' }) },
      { params: { id: '124' } }
    );

    expect(res.status).toBe(200);
    expect(res.body.data.deleted_at).toBeDefined();
    expect(res.body.data.is_active).toBe(false);
  });
});
