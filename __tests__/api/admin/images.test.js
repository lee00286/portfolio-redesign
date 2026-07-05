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

// Mock extractStoragePath
jest.mock('@/util/helpers', () => ({
  extractStoragePath: jest.fn()
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
    delete: jest.fn(() => ({
      eq: jest.fn().mockResolvedValue({ data: null, error: null })
    })),
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

const { GET } = require('@/app/api/admin/images/route');
const { PUT, DELETE } = require('@/app/api/admin/images/[id]/route');
const { createAdminSupabaseServer } = require('@/lib/supabase/admin');
const { extractStoragePath } = require('@/util/helpers');

jest.mock('@/lib/supabase/admin');

describe('GET /images', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const req = {
      nextUrl: { searchParams: new URLSearchParams() }
    };

    const res = await GET(req);

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns images successfully with default params', async () => {
    supabase.limit.mockResolvedValueOnce({
      data: [{ id: '1', image_url: 'https://example.com/img.jpg' }],
      error: null
    });

    const req = {
      nextUrl: { searchParams: new URLSearchParams() }
    };

    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([
      { id: '1', image_url: 'https://example.com/img.jpg' }
    ]);
  });

  it('applies skipSoftDelete filter when set', async () => {
    supabase.limit.mockResolvedValueOnce({
      data: [],
      error: null
    });

    const req = {
      nextUrl: {
        searchParams: new URLSearchParams({ skipSoftDelete: 'true' })
      }
    };

    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(supabase.is).toHaveBeenCalled();
  });
});

describe('PUT /images/[id]', () => {
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
    expect(res.body.error).toBe('Missing ID');
  });

  it('returns 400 if updateData is missing or empty', async () => {
    const res = await PUT({ json: async () => ({}) }, { params: { id: '1' } });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No update data provided');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const res = await PUT(
      { json: async () => ({ image_alt_en: 'test' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns 404 if image does not exist', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null
    });

    const res = await PUT(
      { json: async () => ({ image_alt_en: 'test' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Image data not found');
  });

  it('returns 500 if supabase update fails', async () => {
    supabase.maybeSingle.mockResolvedValueOnce({ data: { id: '1' } });

    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'DB error' }
    });

    const res = await PUT(
      { json: async () => ({ image_alt_en: 'fail' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('DB error');
  });

  it('updates image successfully', async () => {
    supabase = createSupabaseMock({
      id: '123',
      image_url: 'https://example.com/img.jpg',
      image_alt_en: 'old alt'
    });
    createAdminSupabaseServer.mockReturnValue(supabase);

    const res = await PUT(
      { json: async () => ({ image_alt_en: 'new alt' }) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(200);
    expect(res.body.data.image_alt_en).toBe('new alt');
  });
});

describe('DELETE /images/[id]', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
    extractStoragePath.mockReturnValue(null);
  });

  it('returns 400 if id is missing', async () => {
    const res = await DELETE({ json: async () => ({}) }, { params: {} });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Missing ID');
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

  it('returns 404 if image does not exist', async () => {
    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'Not found' }
    });

    const res = await DELETE(
      { json: async () => ({}) },
      { params: { id: 'test' } }
    );

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Image data not found');
  });

  it('returns 500 if storage delete fails', async () => {
    supabase.single.mockResolvedValueOnce({
      data: {
        id: '123',
        image_url:
          'https://example.com/storage/v1/object/public/images/test.jpg'
      },
      error: null
    });

    extractStoragePath.mockReturnValueOnce('images/test.jpg');

    supabase.storage.from.mockReturnValueOnce({
      remove: jest.fn().mockResolvedValue({
        error: { message: 'Storage error' }
      })
    });

    const res = await DELETE(
      { json: async () => ({}) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Failed to delete image file');
  });

  it('returns 500 if db delete fails', async () => {
    supabase.single.mockResolvedValueOnce({
      data: { id: '123', image_url: 'https://example.com/img.jpg' },
      error: null
    });

    extractStoragePath.mockReturnValueOnce(null);

    supabase.delete.mockReturnValueOnce({
      eq: jest.fn().mockResolvedValue({
        error: { message: 'DB delete error' }
      })
    });

    const res = await DELETE(
      { json: async () => ({}) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('DB delete error');
  });

  it('hard deletes image successfully with storage path', async () => {
    supabase.single.mockResolvedValueOnce({
      data: {
        id: '123',
        image_url:
          'https://example.com/storage/v1/object/public/images/folder/test.jpg'
      },
      error: null
    });

    extractStoragePath.mockReturnValueOnce('images/folder/test.jpg');

    const res = await DELETE(
      { json: async () => ({}) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(supabase.storage.from).toHaveBeenCalledWith('images');
  });

  it('hard deletes image successfully without storage path', async () => {
    supabase.single.mockResolvedValueOnce({
      data: { id: '123', image_url: null },
      error: null
    });

    extractStoragePath.mockReturnValueOnce(null);

    const res = await DELETE(
      { json: async () => ({}) },
      { params: { id: '123' } }
    );

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
