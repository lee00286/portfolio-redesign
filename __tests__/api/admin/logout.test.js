jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init = {}) => ({
      body,
      status: init.status || 200,
      cookies: { set: jest.fn() }
    })
  }
}));
jest.mock('@/lib/supabase/serverClient', () => ({
  createSupabaseServerClient: jest.fn()
}));

const { createSupabaseServerClient } = require('@/lib/supabase/serverClient');
const { POST } = require('@/app/api/admin/logout/route');

describe('POST /logout', () => {
  it('signs out of Supabase and clears the admin cookie', async () => {
    const signOut = jest.fn().mockResolvedValue({ error: null });
    createSupabaseServerClient.mockResolvedValue({ auth: { signOut } });

    const res = await POST();

    expect(signOut).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.cookies.set).toHaveBeenCalledWith(
      'admin_auth',
      '',
      expect.objectContaining({ maxAge: 0, path: '/' })
    );
  });
});
