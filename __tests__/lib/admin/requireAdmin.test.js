jest.mock('next/headers', () => ({
  cookies: jest.fn()
}));
jest.mock('@/lib/supabase/serverClient', () => ({
  createSupabaseServerClient: jest.fn()
}));
jest.mock('@/lib/admin/auth', () => ({
  verifyAdminToken: jest.fn()
}));

const { cookies } = require('next/headers');
const { createSupabaseServerClient } = require('@/lib/supabase/serverClient');
const { verifyAdminToken } = require('@/lib/admin/auth');
const {
  getAdminUser,
  isAdminRequestAuthorized
} = require('@/lib/admin/requireAdmin');

const makeClient = (user) => ({
  auth: { getUser: jest.fn().mockResolvedValue({ data: { user } }) }
});

describe('getAdminUser', () => {
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

  it('returns the user when verified and allowlisted', async () => {
    const user = {
      email: 'you@gmail.com',
      user_metadata: { email_verified: true }
    };
    expect(await getAdminUser(makeClient(user))).toBe(user);
  });

  it('returns null when not allowlisted', async () => {
    const user = {
      email: 'no@gmail.com',
      user_metadata: { email_verified: true }
    };
    expect(await getAdminUser(makeClient(user))).toBeNull();
  });
});

describe('isAdminRequestAuthorized', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...ORIGINAL_ENV,
      ADMIN_EMAIL_ALLOWED_LIST: 'you@gmail.com'
    };
    delete process.env.ADMIN_ENABLE_PASSWORD_LOGIN;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('authorizes a valid Supabase session', async () => {
    const user = {
      email: 'you@gmail.com',
      user_metadata: { email_verified: true }
    };
    createSupabaseServerClient.mockResolvedValue(makeClient(user));
    expect(await isAdminRequestAuthorized()).toBe(true);
  });

  it('rejects when no session and password login is disabled', async () => {
    createSupabaseServerClient.mockResolvedValue(makeClient(null));
    expect(await isAdminRequestAuthorized()).toBe(false);
  });

  it('accepts a valid password login token when password login is enabled', async () => {
    process.env.ADMIN_ENABLE_PASSWORD_LOGIN = 'true';
    createSupabaseServerClient.mockResolvedValue(makeClient(null));
    cookies.mockResolvedValue({ get: () => ({ value: 'good-token' }) });
    verifyAdminToken.mockResolvedValue(true);
    expect(await isAdminRequestAuthorized()).toBe(true);
  });
});
