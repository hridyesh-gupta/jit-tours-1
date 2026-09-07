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

// The token's inner payload is JSON, not a hand-built "field.field.field"
// string — a plain "." join broke as soon as a username contained a dot
// (e.g. an email address), since decoding just split on every dot.
export function createSessionToken(username) {
  const payload = JSON.stringify({ u: username, exp: Date.now() + TOKEN_TTL_MS });
  const sig = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(JSON.stringify({ p: payload, s: sig })).toString('base64url');
}

export function verifySessionToken(token) {
  if (!isAdminConfigured() || !token) return false;
  try {
    const { p, s } = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    const expected = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(p).digest('hex');
    if (!safeEqual(s, expected)) return false;

    const { exp } = JSON.parse(p);
    if (Date.now() > exp) return false;

    return true;
  } catch {
    return false;
  }
}
