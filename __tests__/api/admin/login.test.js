// Mock Next.js API route (with cookies support for login)
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init = {}) => ({
      body,
      status: init.status || 200,
      cookies: {
        set: jest.fn()
      }
    })
  }
}));

// Mock admin auth token generation
jest.mock('@/lib/admin/auth', () => ({
  generateAdminToken: jest.fn().mockResolvedValue('mocked-hashed-token')
}));

const { POST } = require('@/app/api/admin/login/route');

describe('POST /login', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...ORIGINAL_ENV,
      ADMIN_PASSWORD: 'correct-password',
      ADMIN_ENABLE_PASSWORD_LOGIN: 'true'
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns 401 if ADMIN_PASSWORD is not set', async () => {
    delete process.env.ADMIN_PASSWORD;

    const res = await POST({
      json: async () => ({ password: 'any-password' })
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid password');
  });

  it('returns 401 if password is missing', async () => {
    const res = await POST({ json: async () => ({}) });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid password');
  });

  it('returns 401 if password is incorrect', async () => {
    const res = await POST({
      json: async () => ({ password: 'wrong-password' })
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid password');
  });

  it('returns 200 and sets signed cookie on correct password', async () => {
    const res = await POST({
      json: async () => ({ password: 'correct-password' })
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.cookies.set).toHaveBeenCalledWith(
      'admin_auth',
      'mocked-hashed-token',
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/'
      })
    );
  });

  it('returns 400 on malformed request body', async () => {
    const res = await POST({
      json: async () => {
        throw new Error('Unexpected end of JSON input');
      }
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid request');
  });

  it('returns 404 when password login is disabled', async () => {
    delete process.env.ADMIN_ENABLE_PASSWORD_LOGIN;

    const res = await POST({
      json: async () => ({ password: 'correct-password' })
    });

    expect(res.status).toBe(404);
  });
});
