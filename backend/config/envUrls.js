/**
 * Public URLs for OAuth redirects, CORS, and emails.
 * Set FRONTEND_URL in production to your storefront (e.g. https://www.admiaworld.com).
 * If FRONTEND_URL is unset in production, https://www.admiaworld.com is used so email links and redirects are never empty.
 * Set BACKEND_URL, and optionally CORS_ALLOWED_ORIGINS, in deployment.
 */

const DEFAULT_PRODUCTION_FRONTEND = 'https://www.admiaworld.com';

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
 * Storefront base URL: OAuth redirects, Flutterwave return URL, email buttons/links.
 * Uses FRONTEND_URL when set (https optional); in production, defaults to the live store if unset.
 */
function getFrontendBaseUrl() {
  const raw = process.env.FRONTEND_URL;
  if (raw && String(raw).trim()) {
    // Only one origin here — CORS uses CORS_ALLOWED_ORIGINS, not this var.
    let single = String(raw).trim();
    if (single.includes(',')) {
      console.warn(
        '[env] FRONTEND_URL must be a single URL. Using first value before comma. Put extra origins in CORS_ALLOWED_ORIGINS only.'
      );
      single = single.split(',')[0].trim();
    }
    const normalized = normalizeWithScheme(single);
    if (normalized) {
      return stripTrailingSlash(normalized);
    }
  }
  if (process.env.NODE_ENV === 'production') {
    return stripTrailingSlash(DEFAULT_PRODUCTION_FRONTEND);
  }
  const local = process.env.LOCAL_FRONTEND_URL || 'http://localhost:5173';
  const localNorm = normalizeWithScheme(local) || local;
  return stripTrailingSlash(localNorm);
}

function isLocalhostStorefrontUrl(url) {
  if (!url || typeof url !== 'string') return true;
  try {
    const { hostname } = new URL(url);
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '[::1]' ||
      hostname === '::1'
    );
  } catch {
    return true;
  }
}

/**
 * Base URL for links inside transactional emails (welcome, order status, admin "View" product links).
 * Set EMAIL_FRONTEND_URL to override (e.g. for staging). Otherwise uses FRONTEND_URL; if that
 * still resolves to localhost, falls back to the live store so in-app link buttons are not
 * left pointing at dev servers.
 */
function getStorefrontBaseUrlForEmail() {
  const emailRaw = process.env.EMAIL_FRONTEND_URL;
  if (emailRaw && String(emailRaw).trim()) {
    const normalized = normalizeWithScheme(String(emailRaw).trim());
    if (normalized) {
      return stripTrailingSlash(normalized);
    }
  }
  const base = getFrontendBaseUrl();
  if (isLocalhostStorefrontUrl(base)) {
    return stripTrailingSlash(DEFAULT_PRODUCTION_FRONTEND);
  }
  return base || stripTrailingSlash(DEFAULT_PRODUCTION_FRONTEND);
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
  getStorefrontBaseUrlForEmail,
  getAllowedCorsOrigins,
  stripTrailingSlash,
  DEFAULT_PRODUCTION_FRONTEND,
};
