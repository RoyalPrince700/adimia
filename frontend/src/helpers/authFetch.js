import { backendDomain } from '../common';
import { getStoredAuthToken } from './authStorage';

let interceptorInstalled = false;

function getRequestUrl(input) {
  if (typeof input === 'string') {
    return input;
  }

  if (typeof URL !== 'undefined' && input instanceof URL) {
    return input.toString();
  }

  if (typeof Request !== 'undefined' && input instanceof Request) {
    return input.url;
  }

  return '';
}

function buildHeaders(baseHeaders, overrideHeaders) {
  const headers = new Headers(baseHeaders || undefined);
  new Headers(overrideHeaders || undefined).forEach((value, key) => {
    headers.set(key, value);
  });
  return headers;
}

function isBackendRequest(url) {
  const normalizedBackend = backendDomain?.replace(/\/$/, '');
  return Boolean(normalizedBackend && url && url.startsWith(normalizedBackend));
}

export function installAuthFetchInterceptor() {
  if (interceptorInstalled || typeof window === 'undefined' || typeof window.fetch !== 'function') {
    return;
  }

  const originalFetch = window.fetch.bind(window);

  window.fetch = (input, init = {}) => {
    const token = getStoredAuthToken();
    const requestUrl = getRequestUrl(input);

    if (!token || !isBackendRequest(requestUrl)) {
      return originalFetch(input, init);
    }

    const requestHeaders =
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined;
    const headers = buildHeaders(requestHeaders, init.headers);

    if (!headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const requestCredentials =
      init.credentials ??
      (typeof Request !== 'undefined' && input instanceof Request ? input.credentials : undefined) ??
      'include';

    return originalFetch(input, {
      ...init,
      headers,
      credentials: requestCredentials,
    });
  };

  interceptorInstalled = true;
}
