// Small fetch wrapper shared by every API call in the app.
// Everything goes through this so error handling and the base URL
// only live in one place.

const API_BASE_URL = "https://rozgaar-backend.fastapicloud.dev";

export async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // Swagger error responses (and most successful ones) are JSON,
  // but guard against an empty body just in case.
  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body — fine for some responses
  }

  if (!res.ok) {
    const message =
      data?.detail || data?.message || `Request failed (${res.status})`;
    throw new Error(typeof message === "string" ? message : "Request failed");
  }

  return data;
}

// Helper for calls that need the logged-in admin's token, e.g.:
// apiRequest("/admin/societies", { method: "POST", headers: authHeader(token), body: ... })
export function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}