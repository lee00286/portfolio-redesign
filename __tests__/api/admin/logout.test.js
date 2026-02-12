// Mock Next.js API route (with cookies support for logout)
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

const { POST } = require('@/app/api/admin/logout/route');

describe('POST /logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 and clears the admin cookie', async () => {
    const res = await POST();

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.cookies.set).toHaveBeenCalledWith(
      'admin_auth',
      '',
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      })
    );
  });
});
