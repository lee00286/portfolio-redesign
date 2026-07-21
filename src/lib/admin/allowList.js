// Parse the allowlist env into a set of normalized emails
export function getAllowedAdminEmails() {
  const raw = process.env.ADMIN_EMAIL_ALLOWED_LIST ?? '';

  return new Set(
    raw
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

// True when the email is on the allowlist
export function isEmailAllowed(email) {
  if (!email) {
    return false;
  }

  return getAllowedAdminEmails().has(email.trim().toLowerCase());
}

// True only when the password login is explicitly enabled
export function isPasswordLoginEnabled() {
  return process.env.ADMIN_ENABLE_PASSWORD_LOGIN === 'true';
}

// True when the Supabase user has a verified allowlisted email
export function isAuthorizedAdmin(user) {
  if (!user?.email) {
    return false;
  }

  if (user.user_metadata?.email_verified !== true) {
    return false;
  }

  return isEmailAllowed(user.email);
}
