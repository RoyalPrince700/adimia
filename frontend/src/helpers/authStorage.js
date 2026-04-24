const AUTH_TOKEN_KEY = 'auth_token';

export function getStoredAuthToken() {
  if (typeof window === 'undefined') {
    return '';
  }

  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredAuthToken(token) {
  if (!token || typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('[Auth] Failed to store auth token:', error?.message || error);
  }
}

export function clearStoredAuthToken() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('[Auth] Failed to clear auth token:', error?.message || error);
  }
}
