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

// Society login isn't live on the backend yet — add it here the same
// way once /auth/society/login (or similar) exists:
//
// export function societyLogin(societyId, password) {
//   return apiRequest("/auth/society/login", {
//     method: "POST",
//     body: JSON.stringify({ society_id: societyId, password }),
//   });
// }