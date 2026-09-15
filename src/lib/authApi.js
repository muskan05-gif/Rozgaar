import { apiRequest } from "./api";

// POST /auth/federation/login
// Request:  { admin_id, password }
// Response: { access_token, token_type, admin_id, role }
export function federationLogin(adminId, password) {
  return apiRequest("/auth/federation/login", {
    method: "POST",
    body: JSON.stringify({ admin_id: adminId, password }),
  });
}

export function societyLogin(societyId, password) {
  return apiRequest("/auth/society/login", {
    method: "POST",
    body: JSON.stringify({ society_id: societyId, password }),
  });
}