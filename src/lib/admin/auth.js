const SALT = 'portfolio-admin-session';

/**
 * Generate a token for the admin session.
 * It uses SHA-256 and a salt to generate a unique token for each user.
 * @returns {string} The generated token.
 */
export async function generateAdminToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;

  const encoder = new TextEncoder();
  const textAsBuffer = encoder.encode(`${SALT}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hash;
}

/**
 * Verify the admin token.
 * @param {*} token The token to verify.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
export async function verifyAdminToken(token) {
  if (!token) return false;

  const expected = await generateAdminToken();

  return token === expected;
}
