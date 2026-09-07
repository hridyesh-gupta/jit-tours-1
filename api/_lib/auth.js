import crypto from 'crypto';

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function safeEqual(a, b) {
  const bufA = crypto.createHash('sha256').update(String(a)).digest();
  const bufB = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(bufA, bufB);
}

// True once the owner has set real admin credentials — until then, login
// always fails safely instead of accepting a blank/default password.
export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
    process.env.ADMIN_PASSWORD &&
    process.env.ADMIN_SESSION_SECRET
  );
}

export function verifyCredentials(username, password) {
  if (!isAdminConfigured()) return false;
  return (
    safeEqual(username || '', process.env.ADMIN_USERNAME) &&
    safeEqual(password || '', process.env.ADMIN_PASSWORD)
  );
}

export function createSessionToken(username) {
  const expires = Date.now() + TOKEN_TTL_MS;
  const payload = `${username}.${expires}`;
  const sig = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}.${sig}`).toString('base64url');
}

export function verifySessionToken(token) {
  if (!isAdminConfigured() || !token) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('.');
    if (parts.length !== 3) return false;

    const [username, expires, sig] = parts;
    const expected = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(`${username}.${expires}`).digest('hex');
    if (!safeEqual(sig, expected)) return false;
    if (Date.now() > Number(expires)) return false;

    return true;
  } catch {
    return false;
  }
}
