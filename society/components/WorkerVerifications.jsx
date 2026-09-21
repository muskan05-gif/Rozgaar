import React, { useCallback, useEffect, useState } from "react";
import {
  User,
  Calendar,
  Mail,
  Phone,
  FileText,
  Award,
  Eye,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Inbox,
} from "lucide-react";

import { useAuth } from "../../src/context/AuthContext";
import {
  getPendingSocietyKyc,
  approveSocietyKyc,
} from "../../src/lib/societyApi";

// =========================================================
// SMALL HELPERS
// =========================================================

const NOT_PROVIDED = "Not provided yet";

const openDocument = (url) => {
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  let classes = "bg-amber-50 text-amber-700";
  if (status === "Approved") classes = "bg-emerald-50 text-emerald-700";
  if (status === "Rejected") classes = "bg-red-50 text-red-600";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${classes}`}
    >
      {status}
    </span>
  );
}

function ViewDetailsButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium text-[#28598F] transition hover:bg-[#F2F6FA]"
    >
      <Eye size={14} />
      {isOpen ? "Hide Details" : "View Details"}
      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <Icon size={17} className="shrink-0 text-[#28598F]" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wide text-stone-400">
            {label}
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-stone-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

const APPROVE_BTN =
  "hidden h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white transition hover:bg-emerald-700 sm:flex";
const REJECT_BTN =
  "hidden h-9 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-100 sm:flex";

export default function WorkerVerification() {
  const { session } = useAuth();

  // =========================================================
  // LOAD PENDING KYC FROM BACKEND
  // =========================================================
  const [pending, setPending] = useState([]);
  const [loadingKyc, setLoadingKyc] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [approvalLoading, setApprovalLoading] = useState(false);

  // The page reviews one application at a time (the first pending one)
  const kycData = pending.length > 0 ? pending[0] : null;

  const loadPendingKyc = useCallback(async () => {
    if (!session?.token) {
      setPending([]);
      setLoadError("No login token found. Please log out and log in again.");
      setLoadingKyc(false);
      return;
    }

    try {
      setLoadingKyc(true);
      setLoadError("");
      const data = await getPendingSocietyKyc(session.token);
      console.log("Pending Society KYC:", data);
      setPending(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load pending KYC:", error);
      setPending([]);
      setLoadError(error?.message || "Could not load pending applications.");
    } finally {
      setLoadingKyc(false);
    }
  }, [session?.token]);

  useEffect(() => {
    loadPendingKyc();
  }, [loadPendingKyc]);

  // =========================================================
  // WORKER INFORMATION (from the backend)
  // =========================================================
  // name / phone / date_of_birth / email only appear once the
  // pending endpoint also returns them. Until then we show
  // "Not provided yet" instead of fake data.
  // =========================================================

  const worker = {
    name: kycData?.name || NOT_PROVIDED,
    dob: kycData?.date_of_birth || kycData?.dob || NOT_PROVIDED,
    email: kycData?.email || NOT_PROVIDED,
    phone: kycData?.phone || NOT_PROVIDED,
  };

  const skills = Array.isArray(kycData?.skills) ? kycData.skills.join(", ") : "";

  const identityDocs = [
    { label: "Aadhaar Front", url: kycData?.id_front_url },
    { label: "Aadhaar Back", url: kycData?.id_back_url },
  ].filter((doc) => doc.url);

  // =========================================================
  // REVIEW STATUSES (reset for every new application)
  // =========================================================

  const [credentialsStatus, setCredentialsStatus] = useState("Pending Review");
  const [identity, setIdentity] = useState({
    name: "Aadhaar Card",
    status: "Pending Review",
  });
  const [certificates, setCertificates] = useState([]);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    setCredentialsStatus("Pending Review");
    setIdentity({ name: "Aadhaar Card", status: "Pending Review" });
    setOpenSection(null);
    setCertificates(
      kycData?.skill_certificate_url
        ? [
            {
              id: 1,
              name: "Skill Certificate",
              issuer: skills || "Skill details not provided",
              url: kycData.skill_certificate_url,
              status: "Pending Review",
            },
          ]
        : []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kycData?.kyc_id]);

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? null : section));
  };

  // =========================================================
  // APPROVE / REJECT (screen only, until final approval)
  // =========================================================

  const approveCredentials = () => setCredentialsStatus("Approved");
  const rejectCredentials = () => setCredentialsStatus("Rejected");

  const approveIdentity = () =>
    setIdentity((current) => ({ ...current, status: "Approved" }));
  const rejectIdentity = () =>
    setIdentity((current) => ({ ...current, status: "Rejected" }));

  const setCertificateStatus = (id, status) =>
    setCertificates((current) =>
      current.map((c) => (c.id === id ? { ...c, status } : c))
    );

  // =========================================================
  // FINAL APPROVAL (calls the backend)
  // =========================================================

  const handleFinalApproval = async () => {
    const allCertificatesApproved = certificates.every(
      (certificate) => certificate.status === "Approved"
    );

    if (credentialsStatus !== "Approved") {
      alert("Please approve the worker credentials first.");
      return;
    }

    if (identity.status !== "Approved") {
      alert("Please approve the identity proof first.");
      return;
    }

    if (!allCertificatesApproved) {
      alert("Please review and approve all certificates first.");
      return;
    }

    if (!kycData?.kyc_id) {
      alert("No pending KYC application found.");
      return;
    }

    try {
      setApprovalLoading(true);
      const result = await approveSocietyKyc(kycData.kyc_id, session.token);
      console.log("KYC approval response:", result);
      alert(result?.message || "Worker KYC approved successfully.");
      // remove the approved one; the next pending application (if any) shows up
      setPending((current) => current.slice(1));
    } catch (error) {
      console.error("Failed to approve KYC:", error);
      alert(error.message || "Failed to approve worker KYC.");
    } finally {
      setApprovalLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F7F8FA]">
      <div className="mx-auto w-full max-w-5xl px-6 py-7">
        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[#141B33]">
              Worker Verification
            </h1>

            <p className="mt-1 text-sm text-stone-500">
              Review the information and documents submitted by the worker.
            </p>

            {kycData && (
              <p className="mt-2 text-xs text-stone-400">
                Application 1 of {pending.length} pending
                {kycData.submitted_at
                  ? ` · Submitted ${formatDate(kycData.submitted_at)}`
                  : ""}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={loadPendingKyc}
            disabled={loadingKyc}
            className="flex h-9 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-xs font-medium text-stone-700 transition hover:bg-stone-50 disabled:opacity-60"
          >
            <RefreshCw
              size={14}
              className={loadingKyc ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* ===================================================
            LOADING / ERROR / EMPTY STATES
        =================================================== */}

        {loadingKyc && !kycData && (
          <div className="rounded-xl border border-stone-200 bg-white px-5 py-10 text-center text-sm text-stone-500">
            Loading applications...
          </div>
        )}

        {loadError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Could not load applications</p>
              <p className="mt-0.5">{loadError}</p>
              <p className="mt-1 text-xs text-red-600/80">
                If this says "not authenticated", "invalid token" or 401/403,
                log out and log in again as a Society.
              </p>
            </div>
          </div>
        )}

        {!loadingKyc && !loadError && !kycData && (
          <div className="rounded-xl border border-dashed border-stone-300 bg-white px-5 py-10 text-center">
            <Inbox size={24} className="mx-auto text-stone-400" />
            <p className="mt-2 text-sm font-semibold text-[#141B33]">
              No pending applications
            </p>
            <p className="mt-1 text-xs text-stone-500">
              You are logged in as Society ID{" "}
              <span className="font-semibold text-stone-700">
                {session?.userId || "unknown"}
              </span>
              . A worker&apos;s application shows here only if it was saved with
              this same society_id and status &quot;pending&quot;.
            </p>
          </div>
        )}

        {/* ===================================================
            VERIFICATION SECTIONS (only when there is an application)
        =================================================== */}

        {kycData && (
          <>
            <div className="space-y-3">
              {/* ---------- 1. CREDENTIALS ---------- */}
              <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <div className="flex min-h-[72px] items-center gap-4 px-5 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF3F9] text-sm font-semibold text-[#28598F]">
                    1
                  </div>

                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-50 sm:flex">
                    <User size={18} className="text-stone-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[#141B33]">
                        Credentials
                      </h2>
                      <StatusBadge status={credentialsStatus} />
                    </div>

                    <p className="mt-1 truncate text-xs text-stone-400">
                      {kycData.name
                        ? `${worker.name} · ${worker.email}`
                        : `Karigar ${kycData.karigar_id}${
                            skills ? ` · ${skills}` : ""
                          }`}
                    </p>
                  </div>

                  <ViewDetailsButton
                    isOpen={openSection === "credentials"}
                    onClick={() => toggleSection("credentials")}
                  />

                  <button
                    type="button"
                    onClick={approveCredentials}
                    className={APPROVE_BTN}
                  >
                    <CheckCircle2 size={15} />
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={rejectCredentials}
                    className={REJECT_BTN}
                  >
                    <XCircle size={15} />
                    Reject
                  </button>
                </div>

                {openSection === "credentials" && (
                  <div className="border-t border-stone-100 bg-[#FAFBFC] px-5 py-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoCard icon={User} label="Full Name" value={worker.name} />
                      <InfoCard
                        icon={Calendar}
                        label="Date of Birth"
                        value={worker.dob}
                      />
                      <InfoCard
                        icon={Mail}
                        label="Email Address"
                        value={worker.email}
                      />
                      <InfoCard
                        icon={Phone}
                        label="Phone Number"
                        value={worker.phone}
                      />
                      <InfoCard
                        icon={Award}
                        label="Skills"
                        value={skills || NOT_PROVIDED}
                      />
                      <InfoCard
                        icon={User}
                        label="Karigar ID"
                        value={kycData.karigar_id || NOT_PROVIDED}
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* ---------- 2. IDENTITY PROOF ---------- */}
              <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <div className="flex min-h-[72px] items-center gap-4 px-5 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF3F9] text-sm font-semibold text-[#28598F]">
                    2
                  </div>

                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-50 sm:flex">
                    <FileText size={18} className="text-stone-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[#141B33]">
                        Identity Proof
                      </h2>
                      <StatusBadge status={identity.status} />
                    </div>

                    <p className="mt-1 truncate text-xs text-stone-400">
                      {identity.name} · {identityDocs.length} file
                      {identityDocs.length === 1 ? "" : "s"} uploaded
                    </p>
                  </div>

                  <ViewDetailsButton
                    isOpen={openSection === "identity"}
                    onClick={() => toggleSection("identity")}
                  />

                  <button
                    type="button"
                    onClick={approveIdentity}
                    className={APPROVE_BTN}
                  >
                    <CheckCircle2 size={15} />
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={rejectIdentity}
                    className={REJECT_BTN}
                  >
                    <XCircle size={15} />
                    Reject
                  </button>
                </div>

                {openSection === "identity" && (
                  <div className="space-y-3 border-t border-stone-100 bg-[#FAFBFC] px-5 py-5">
                    {identityDocs.length === 0 && (
                      <p className="text-xs text-stone-500">
                        No identity document was uploaded.
                      </p>
                    )}

                    {identityDocs.map((doc) => (
                      <div
                        key={doc.label}
                        className="rounded-lg border border-stone-200 bg-white p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EDF3F9]">
                            <FileText size={21} className="text-[#28598F]" />
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-semibold text-stone-800">
                              {doc.label}
                            </p>
                            <p className="mt-1 text-xs text-stone-400">
                              Identity Proof
                            </p>
                          </div>

                          <StatusBadge status={identity.status} />
                        </div>

                        <button
                          type="button"
                          onClick={() => openDocument(doc.url)}
                          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white text-xs font-semibold text-[#28598F] transition hover:bg-stone-50"
                        >
                          <Eye size={16} />
                          View {doc.label}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* ---------- 3. CERTIFICATES ---------- */}
              <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <div className="flex min-h-[72px] items-center gap-4 px-5 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF3F9] text-sm font-semibold text-[#28598F]">
                    3
                  </div>

                  <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-50 sm:flex">
                    <Award size={18} className="text-stone-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-[#141B33]">
                        Certificates
                      </h2>
                      <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-500">
                        {certificates.length} Submitted
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-stone-400">
                      Skill certificates submitted by the worker
                    </p>
                  </div>

                  <ViewDetailsButton
                    isOpen={openSection === "certificates"}
                    onClick={() => toggleSection("certificates")}
                  />
                </div>

                {openSection === "certificates" && (
                  <div className="space-y-3 border-t border-stone-100 bg-[#FAFBFC] px-5 py-5">
                    {certificates.length === 0 && (
                      <p className="text-xs text-stone-500">
                        No skill certificate was uploaded.
                      </p>
                    )}

                    {certificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="rounded-lg border border-stone-200 bg-white p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDF3F9]">
                            <Award size={19} className="text-[#28598F]" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-stone-800">
                              {certificate.name}
                            </p>
                            <p className="mt-0.5 text-xs text-stone-400">
                              Skills: {certificate.issuer}
                            </p>
                          </div>

                          <StatusBadge status={certificate.status} />
                        </div>

                        <button
                          type="button"
                          onClick={() => openDocument(certificate.url)}
                          className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-stone-200 text-xs font-medium text-[#28598F] hover:bg-stone-50"
                        >
                          <Eye size={15} />
                          View Certificate
                        </button>

                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setCertificateStatus(certificate.id, "Approved")
                            }
                            className="flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700"
                          >
                            <CheckCircle2 size={15} />
                            Approve
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setCertificateStatus(certificate.id, "Rejected")
                            }
                            className="flex h-9 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-600 hover:bg-red-100"
                          >
                            <XCircle size={15} />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* ===================================================
                FINAL APPROVAL
            =================================================== */}

            <div className="mt-5 rounded-xl border border-stone-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#28598F]" />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#141B33]">
                    Complete Verification
                  </p>
                  <p className="mt-0.5 text-xs text-stone-400">
                    Approve all sections before verifying the worker.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleFinalApproval}
                  disabled={approvalLoading || loadingKyc || !kycData?.kyc_id}
                  className="flex h-10 items-center gap-2 rounded-lg bg-[#141B33] px-4 text-xs font-semibold text-white transition hover:bg-[#1D2745] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShieldCheck size={15} />
                  {approvalLoading ? "Approving..." : "Approve & Verify"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}