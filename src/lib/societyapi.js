import { apiRequest, authHeader } from "./api";

// Get pending KYC applications for the logged-in Society
export function getPendingSocietyKyc(token) {
  return apiRequest("/society/kyc/pending", {
    method: "GET",
    headers: authHeader(token),
  });
}

// Approve a worker's KYC
export function approveSocietyKyc(kycId, token) {
  return apiRequest(`/society/kyc/${kycId}/approve`, {
    method: "POST",
    headers: authHeader(token),
  });
}