// Each response mock gets its own stateful cookie store
jest.mock('next/server', () => ({
  NextResponse: {
    next: () => ({
      __type: 'next',
      cookies: (() => {
        const store = [];
        return {
          set(nameOrObj, value, options) {
            if (typeof nameOrObj === 'object' && nameOrObj !== null) {
              const { name, value: val, ...opts } = nameOrObj;
              store.push({ name, value: val, ...opts });
            } else {
              store.push({ name: nameOrObj, value, ...options });
            }
          },
          getAll() {
            return [...store];
          }
        };
      })()
    }),
    json: (body, init = {}) => ({
      __type: 'json',
      body,
      status: init.status || 200,
      cookies: (() => {
        const store = [];
        return {
          set(nameOrObj, value, options) {
            if (typeof nameOrObj === 'object' && nameOrObj !== null) {
              const { name, value: val, ...opts } = nameOrObj;
              store.push({ name, value: val, ...opts });
            } else {
              store.push({ name: nameOrObj, value, ...options });
            }
          },
          getAll() {
            return [...store];
          }
        };
      })()
    }),
    redirect: (url) => ({
      __type: 'redirect',
      location: String(url),
      cookies: (() => {
        const store = [];
        return {
          set(nameOrObj, value, options) {
            if (typeof nameOrObj === 'object' && nameOrObj !== null) {
              const { name, value: val, ...opts } = nameOrObj;
              store.push({ name, value: val, ...opts });
            } else {
              store.push({ name: nameOrObj, value, ...options });
            }
          },
          getAll() {
            return [...store];
          }
        };
      })()
    })
  }
}));
jest.mock('@/lib/supabase/middlewareClient', () => ({
  createSupabaseMiddlewareClient: jest.fn(() => ({}))
}));
jest.mock('@/lib/admin/requireAdmin', () => ({
  getAdminUser: jest.fn()
}));
jest.mock('@/lib/admin/auth', () => ({ verifyAdminToken: jest.fn() }));

const { getAdminUser } = require('@/lib/admin/requireAdmin');
const { verifyAdminToken } = require('@/lib/admin/auth');
const { middleware } = require('@/middleware');

const req = (pathname) => ({
  nextUrl: { pathname, searchParams: new URLSearchParams() },
  url: `https://site.com${pathname}`,
  cookies: { get: () => undefined }
});

describe('admin middleware', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.ADMIN_ENABLE_PASSWORD_LOGIN;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('allows an authorized admin through', async () => {
    getAdminUser.mockResolvedValue({ email: 'you@gmail.com' });
    const res = await middleware(req('/admin/projects'));
    expect(res.__type).toBe('next');
  });

  it('redirects an unauthorized page request to login', async () => {
    getAdminUser.mockResolvedValue(null);
    const res = await middleware(req('/admin/projects'));
    expect(res.__type).toBe('redirect');
    expect(res.location).toContain('/admin/login');
  });

  it('returns 401 for an unauthorized api request', async () => {
    getAdminUser.mockResolvedValue(null);
    const res = await middleware(req('/api/admin/projects'));
    expect(res.__type).toBe('json');
    expect(res.status).toBe(401);
  });

  it('never gates the login page', async () => {
    const res = await middleware(req('/admin/login'));
    expect(res.__type).toBe('next');
    expect(getAdminUser).not.toHaveBeenCalled();
  });

  it('copies language cookie onto the redirect when user is unauthorized', async () => {
    getAdminUser.mockResolvedValue(null);

    // Request with ?lang=ko and no existing lang cookie
    const langReq = {
      nextUrl: {
        pathname: '/admin/projects',
        searchParams: new URLSearchParams('lang=ko')
      },
      url: 'https://site.com/admin/projects?lang=ko',
      cookies: { get: () => undefined }
    };

    const res = await middleware(langReq);

    expect(res.__type).toBe('redirect');
    expect(res.location).toContain('/admin/login');

    // The lang cookie written onto res must be copied onto the redirect
    const cookies = res.cookies.getAll();
    const langCookie = cookies.find((c) => c.name === 'lang');
    expect(langCookie).toBeDefined();
    expect(langCookie.value).toBe('ko');
  });
});
