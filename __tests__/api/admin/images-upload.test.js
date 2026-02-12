// Mock Next.js API route
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init = {}) => ({
      body,
      status: init.status || 200
    })
  }
}));

// Mock crypto.randomUUID
global.crypto = {
  randomUUID: jest.fn(() => 'test-uuid')
};

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

const createFormDataMock = (data = {}) => ({
  get: jest.fn((key) => data[key] ?? null)
});

const { POST } = require('@/app/api/admin/images/upload/route');
const { createAdminSupabaseServer } = require('@/lib/supabase/admin');

jest.mock('@/lib/supabase/admin');

describe('POST /images/upload', () => {
  let supabase;

  beforeEach(() => {
    jest.clearAllMocks();
    supabase = createSupabaseMock();
    // Return new Supabase mock object for each test
    createAdminSupabaseServer.mockReturnValue(supabase);
  });

  it('returns 400 if no file is provided', async () => {
    const formData = createFormDataMock({});

    const res = await POST({ formData: async () => formData });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No file');
  });

  it('returns 403 if admin is disabled', async () => {
    createAdminSupabaseServer.mockReturnValueOnce(null);

    const formData = createFormDataMock({
      file: { name: 'test.png', type: 'image/png' }
    });

    const res = await POST({ formData: async () => formData });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Admin disabled in this environment');
  });

  it('returns 500 if storage upload fails', async () => {
    supabase.storage.from.mockReturnValueOnce({
      upload: jest.fn().mockResolvedValue({
        error: { message: 'Upload failed' }
      }),
      getPublicUrl: jest.fn(() => ({
        data: { publicUrl: 'https://example.com/image.jpg' }
      }))
    });

    const formData = createFormDataMock({
      file: { name: 'test.png', type: 'image/png' }
    });

    const res = await POST({ formData: async () => formData });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Upload failed');
  });

  it('returns 500 if db insert fails', async () => {
    supabase.single.mockResolvedValueOnce({
      data: null,
      error: { message: 'DB insert error' }
    });

    const formData = createFormDataMock({
      file: { name: 'test.png', type: 'image/png' }
    });

    const res = await POST({ formData: async () => formData });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Upload failed');
  });

  it('uploads image successfully', async () => {
    const formData = createFormDataMock({
      file: { name: 'photo.jpg', type: 'image/jpeg' },
      filePath: 'uploads',
      altEN: 'English alt',
      altKO: 'Korean alt',
      captionEN: 'English caption',
      captionKO: 'Korean caption'
    });

    const res = await POST({ formData: async () => formData });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('uploads image successfully with leading/trailing slashes in filePath', async () => {
    const formData = createFormDataMock({
      file: { name: 'photo.jpg', type: 'image/jpeg' },
      filePath: '/uploads/'
    });

    const res = await POST({ formData: async () => formData });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('uploads image successfully without filePath', async () => {
    const formData = createFormDataMock({
      file: { name: 'photo.jpg', type: 'image/jpeg' }
    });

    const res = await POST({ formData: async () => formData });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
