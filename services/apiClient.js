/**
 * Thin API client. When NEXT_PUBLIC_API_URL is set the services call the
 * REST API (backed by MySQL); otherwise they resolve from local mock data.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const isApiEnabled = () => Boolean(API_URL);

export async function apiRequest(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed with ${res.status}`);
  }
  return res.json();
}

/** Resolve from the API when enabled, otherwise from a mock factory. */
export async function fromSource(path, mockFactory) {
  if (isApiEnabled()) return apiRequest(path);
  return mockFactory();
}
