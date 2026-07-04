import { NextResponse } from 'next/server';
import { isAdminRequestAuthorized } from '@/lib/admin/requireAdmin';

// Wrap a route handler to only allow an authorized admin
export function guardAdmin(handler) {
  return async (req, ctx) => {
    if (!(await isAdminRequestAuthorized())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, ctx);
  };
}
