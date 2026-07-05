const {
  isEmailAllowed,
  isPasswordLoginEnabled,
  isAuthorizedAdmin
} = require('@/lib/admin/allowList');

describe('admin allowlist', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.ADMIN_EMAIL_ALLOWED_LIST;
    delete process.env.ADMIN_ENABLE_PASSWORD_LOGIN;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('denies when the allowlist env is empty', () => {
    expect(isEmailAllowed('you@gmail.com')).toBe(false);
  });

  it('matches case insensitively and trims whitespace', () => {
    process.env.ADMIN_EMAIL_ALLOWED_LIST = ' You@Gmail.com , friend@gmail.com ';
    expect(isEmailAllowed('you@gmail.com')).toBe(true);
    expect(isEmailAllowed('FRIEND@GMAIL.COM')).toBe(true);
  });

  it('denies an email not on the list', () => {
    process.env.ADMIN_EMAIL_ALLOWED_LIST = 'you@gmail.com';
    expect(isEmailAllowed('stranger@gmail.com')).toBe(false);
  });

  it('denies an empty or missing email', () => {
    process.env.ADMIN_EMAIL_ALLOWED_LIST = 'you@gmail.com';
    expect(isEmailAllowed('')).toBe(false);
    expect(isEmailAllowed(undefined)).toBe(false);
  });

  it('enables password login only when the flag is exactly true', () => {
    expect(isPasswordLoginEnabled()).toBe(false);
    process.env.ADMIN_ENABLE_PASSWORD_LOGIN = 'false';
    expect(isPasswordLoginEnabled()).toBe(false);
    process.env.ADMIN_ENABLE_PASSWORD_LOGIN = 'true';
    expect(isPasswordLoginEnabled()).toBe(true);
  });

  it('authorizes only a verified allowlisted user', () => {
    process.env.ADMIN_EMAIL_ALLOWED_LIST = 'you@gmail.com';
    expect(
      isAuthorizedAdmin({
        email: 'you@gmail.com',
        user_metadata: { email_verified: true }
      })
    ).toBe(true);
    expect(
      isAuthorizedAdmin({
        email: 'you@gmail.com',
        user_metadata: { email_verified: false }
      })
    ).toBe(false);
    expect(
      isAuthorizedAdmin({
        email: 'stranger@gmail.com',
        user_metadata: { email_verified: true }
      })
    ).toBe(false);
    expect(isAuthorizedAdmin(null)).toBe(false);
  });

  it('denies an allowlisted user when email_verified is absent', () => {
    process.env.ADMIN_EMAIL_ALLOWED_LIST = 'you@gmail.com';
    // No user_metadata at all
    expect(isAuthorizedAdmin({ email: 'you@gmail.com' })).toBe(false);
    // user_metadata present but email_verified not set
    expect(
      isAuthorizedAdmin({ email: 'you@gmail.com', user_metadata: {} })
    ).toBe(false);
  });
});
