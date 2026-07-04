jest.mock('next/server', () => ({
  NextResponse: {
    redirect: (url) => ({ status: 307, headers: { location: String(url) } })
  }
}));
jest.mock('@/lib/supabase/serverClient', () => ({
  createSupabaseServerClient: jest.fn()
}));

const { createSupabaseServerClient } = require('@/lib/supabase/serverClient');
const { GET } = require('@/app/api/auth/callback/route');

const req = (url) => ({ url });

describe('GET /api/auth/callback', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...ORIGINAL_ENV,
      ADMIN_EMAIL_ALLOWED_LIST: 'you@gmail.com'
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('redirects to login when the code is missing', async () => {
    const res = await GET(req('https://site.com/api/auth/callback'));
    expect(res.headers.location).toContain('/admin/login?error=oauth');
  });

  it('redirects to admin for an allowlisted verified user', async () => {
    createSupabaseServerClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession: jest.fn().mockResolvedValue({ error: null }),
        getUser: jest.fn().mockResolvedValue({
          data: {
            user: {
              email: 'you@gmail.com',
              user_metadata: { email_verified: true }
            }
          }
        }),
        signOut: jest.fn()
      }
    });
    const res = await GET(req('https://site.com/api/auth/callback?code=abc'));
    expect(res.headers.location).toBe('https://site.com/admin');
  });

  it('signs out and rejects a non allowlisted user', async () => {
    const signOut = jest.fn().mockResolvedValue({ error: null });
    createSupabaseServerClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession: jest.fn().mockResolvedValue({ error: null }),
        getUser: jest.fn().mockResolvedValue({
          data: {
            user: {
              email: 'no@gmail.com',
              user_metadata: { email_verified: true }
            }
          }
        }),
        signOut
      }
    });
    const res = await GET(req('https://site.com/api/auth/callback?code=abc'));
    expect(signOut).toHaveBeenCalled();
    expect(res.headers.location).toContain('/admin/login?error=not_authorized');
  });
});
