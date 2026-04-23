/**
 * Public URLs for OAuth redirects, CORS, emails (no hardcoded production domains).
 * Set BACKEND_URL, FRONTEND_URL, and optionally CORS_ALLOWED_ORIGINS in deployment.
 */

function normalizeWithScheme(value) {
  if (!value || typeof value !== 'string') return null;
  const t = value.trim();
  if (!t) return null;
  if (t.startsWith('http://') || t.startsWith('https://')) return t;
  return `https://${t}`;
}

function stripTrailingSlash(u) {
  return u ? u.replace(/\/$/, '') : u;
}

/**
 * Public base URL of this API (used for Google OAuth callback, etc.)
 */
function resolveBackendPublicBaseUrl() {
  const explicit =
    process.env.BACKEND_URL || process.env.PUBLIC_API_URL || process.env.RENDER_EXTERNAL_URL;
  if (explicit) {
    return stripTrailingSlash(normalizeWithScheme(explicit));
  }
  if (process.env.VERCEL_URL) {
    return stripTrailingSlash(normalizeWithScheme(process.env.VERCEL_URL));
  }
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    throw new Error(
      'Set BACKEND_URL to your public API base URL (e.g. https://api.example.com) — required for Google OAuth in production.'
    );
  }
  const port = process.env.PORT || 8080;
  return `http://localhost:${port}`;
}

function getGoogleOAuthCallbackUrl() {
  const base = resolveBackendPublicBaseUrl();
  return `${base}/api/auth/google/callback`;
}

/**
 * Where users land after Google OAuth and for email links.
 */
function getFrontendBaseUrl() {
  if (process.env.FRONTEND_URL) {
    return stripTrailingSlash(process.env.FRONTEND_URL.trim());
  }
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  const local = process.env.LOCAL_FRONTEND_URL || 'http://localhost:5173';
  return stripTrailingSlash(local);
}

/**
 * CORS and Socket.IO: FRONTEND_URL, BACKEND_URL, CORS_ALLOWED_ORIGINS (comma-separated),
 * plus local dev hosts when NODE_ENV is not production.
 */
function getAllowedCorsOrigins() {
  const out = new Set();
  const add = (u) => {
    const n = stripTrailingSlash(typeof u === 'string' ? u.trim() : '');
    if (n) out.add(n);
  };
  (process.env.CORS_ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .forEach(add);
  add(process.env.FRONTEND_URL);
  add(process.env.BACKEND_URL);
  if (process.env.NODE_ENV !== 'production') {
    add('http://localhost:5173');
    add('http://localhost:3000');
    add('http://localhost:8080');
    add('http://127.0.0.1:5173');
    add('http://127.0.0.1:3000');
    add('http://127.0.0.1:8080');
  }
  return Array.from(out);
}

module.exports = {
  resolveBackendPublicBaseUrl,
  getGoogleOAuthCallbackUrl,
  getFrontendBaseUrl,
  getAllowedCorsOrigins,
  stripTrailingSlash,
};
