import { apiRequest, authHeader } from "./api";

// ---------------------------------------------------------
// KYC applications
// ---------------------------------------------------------

// Pending KYC applications for the logged-in Society
export function getPendingSocietyKyc(token) {
  return apiRequest("/society/kyc/pending", {
    method: "GET",
    headers: authHeader(token),
  });
}

// Approve an application
export function approveSocietyKyc(kycId, token) {
  return apiRequest(`/society/kyc/${kycId}/approve`, {
    method: "POST",
    headers: authHeader(token),
  });
}

// Decline an application (backend endpoint still to be built)
export function rejectSocietyKyc(kycId, reviewComment, token) {
  return apiRequest(`/society/kyc/${kycId}/reject`, {
    method: "POST",
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review_comment: reviewComment }),
  });
}

// ---------------------------------------------------------
// Karigars (backend endpoints still to be built)
// ---------------------------------------------------------

// All Karigars belonging to the logged-in Society
export function getSocietyKarigars(token) {
  return apiRequest("/society/karigars", {
    method: "GET",
    headers: authHeader(token),
  });
}

// One Karigar belonging to the logged-in Society
export function getSocietyKarigar(karigarId, token) {
  return apiRequest(`/society/karigars/${karigarId}`, {
    method: "GET",
    headers: authHeader(token),
  });
}