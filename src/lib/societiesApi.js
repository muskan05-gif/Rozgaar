import { apiRequest, authHeader } from "./api";

// POST /admin/societies — requires Federation JWT
// Body: { name, district, state, society_head, contact_phone, password }
// Returns the created society object (society_id, name, district, state,
// society_head, contact_phone, is_active, created_at).
export function createSociety(payload, token) {
  return apiRequest("/admin/societies", {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify(payload),
  });
}

// GET /admin/societies — requires Federation JWT
// Returns an array of all societies. Wire this in when we build the
// full Societies list/view page.
export function getSocieties(token) {
  return apiRequest("/admin/societies", {
    method: "GET",
    headers: authHeader(token),
  });
}