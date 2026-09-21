import React, { useCallback, useEffect, useState } from "react";
import {
  User,
  Calendar,
  Phone,
  Wrench,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Inbox,
} from "lucide-react";

import { useAuth } from "../../src/context/AuthContext";
import {
  getPendingSocietyKyc,
  approveSocietyKyc,
  rejectSocietyKyc,
} from "../../src/lib/societyApi";

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

const NOT_AVAILABLE = "Not available yet";

function formatDate(value) {
  if (!value) return NOT_AVAILABLE;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <Icon size={17} className="shrink-0 text-[#28598F]" />
        <div className="min-w-0">
          <p className="text-xs text-stone-400">{label}</p>
          <p className="mt-1 truncate text-sm font-semibold text-stone-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({ label, url }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDF3F9]">
        <FileText size={19} className="text-[#28598F]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-stone-800">{label}</p>
        <p className="mt-0.5 text-xs text-stone-400">
          {url ? "Uploaded" : "Not uploaded"}
        </p>
      </div>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center gap-1.5 rounded-lg border border-stone-200 px-3 text-xs font-medium text-[#28598F] transition hover:bg-stone-50"
        >
          <Eye size={15} />
          View
        </a>
      ) : (
        <span className="text-xs text-stone-400">No file</span>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------

export default function WorkerVerification() {
  const { session } = useAuth();

  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  const [declining, setDeclining] = useState(false);
  const [comment, setComment] = useState("");

  // -------------------------------------------------------
  // Load pending applications
  // -------------------------------------------------------

  const loadApplications = useCallback(async () => {
    if (!session?.token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setLoadError("");
      const data = await getPendingSocietyKyc(session.token);
      const list = Array.isArray(data) ? data : [];
      setApplications(list);
      setSelectedId((current) =>
        list.some((item) => item.kyc_id === current)
          ? current
          : list[0]?.kyc_id ?? null
      );
    } catch (error) {
      console.error("Failed to load pending KYC:", error);
      setLoadError(error.message || "Could not load applications.");
      setApplications([]);
      setSelectedId(null);
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const selected =
    applications.find((item) => item.kyc_id === selectedId) || null;

  const selectApplication = (kycId) => {
    setSelectedId(kycId);
    setDeclining(false);
    setComment("");
    setActionError("");
  };

  // -------------------------------------------------------
  // Approve
  // -------------------------------------------------------

  const handleApprove = async () => {
    if (!selected) return;

    try {
      setActionLoading(true);
      setActionError("");
      const result = await approveSocietyKyc(selected.kyc_id, session.token);
      setNotice(result?.message || "Karigar KYC approved successfully.");
      await loadApplications();
    } catch (error) {
      console.error("Failed to approve KYC:", error);
      setActionError(error.message || "Failed to approve application.");
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------------------------------------
  // Decline
  // -------------------------------------------------------

  const handleDecline = async () => {
    if (!selected) return;

    if (!comment.trim()) {
      setActionError("Enter a reason before declining.");
      return;
    }

    try {
      setActionLoading(true);
      setActionError("");
      const result = await rejectSocietyKyc(
        selected.kyc_id,
        comment.trim(),
        session.token
      );
      setNotice(result?.message || "Karigar KYC rejected.");
      setDeclining(false);
      setComment("");
      await loadApplications();
    } catch (error) {
      console.error("Failed to reject KYC:", error);
      setActionError(error.message || "Failed to decline application.");
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  return (
    <div className="min-h-full bg-[#F7F8FA]">
      <div className="mx-auto w-full max-w-5xl px-6 py-7">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#141B33]">
            Worker Verification
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Review new Karigar applications and their documents.
          </p>
        </div>

        {notice && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              className="text-xs font-medium underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-500">
            Loading applications...
          </p>
        )}

        {/* Load error */}
        {!loading && loadError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
            <p>{loadError}</p>
            <button
              type="button"
              onClick={loadApplications}
              className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !loadError && applications.length === 0 && (
          <div className="flex flex-col items-center rounded-xl border border-stone-200 bg-white px-6 py-14 text-center">
            <Inbox size={28} className="text-stone-400" />
            <p className="mt-3 text-sm font-semibold text-[#141B33]">
              No pending applications
            </p>
            <p className="mt-1 text-xs text-stone-400">
              New Karigar applications for your Society will appear here.
            </p>
          </div>
        )}

        {/* Applications + detail */}
        {!loading && !loadError && applications.length > 0 && (
          <div className="grid gap-5 md:grid-cols-[260px_1fr]">
            {/* Application list */}
            <aside className="space-y-2">
              <p className="px-1 text-xs font-medium text-stone-500">
                New applications ({applications.length})
              </p>

              {applications.map((item) => {
                const isActive = item.kyc_id === selectedId;
                return (
                  <button
                    key={item.kyc_id}
                    type="button"
                    onClick={() => selectApplication(item.kyc_id)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      isActive
                        ? "border-[#28598F] bg-[#EDF3F9]"
                        : "border-stone-200 bg-white hover:bg-stone-50"
                    }`}
                  >
                    <p className="truncate text-sm font-semibold text-[#141B33]">
                      {item.name || item.karigar_id}
                    </p>
                    <p className="mt-1 truncate text-xs text-stone-500">
                      {item.skills?.length
                        ? item.skills.join(", ")
                        : "No skills listed"}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      Submitted {formatDate(item.submitted_at)}
                    </p>
                  </button>
                );
              })}
            </aside>

            {/* Selected application */}
            {selected && (
              <div className="space-y-5">
                {/* Applicant */}
                <section className="rounded-xl border border-stone-200 bg-white p-5">
                  <h2 className="mb-3 text-sm font-semibold text-[#141B33]">
                    Applicant
                  </h2>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoCard
                      icon={User}
                      label="Name"
                      value={selected.name || NOT_AVAILABLE}
                    />
                    <InfoCard
                      icon={Phone}
                      label="Phone number"
                      value={selected.phone || NOT_AVAILABLE}
                    />
                    <InfoCard
                      icon={Calendar}
                      label="Date of birth"
                      value={formatDate(selected.date_of_birth)}
                    />
                    <InfoCard
                      icon={Wrench}
                      label="Skills"
                      value={
                        selected.skills?.length
                          ? selected.skills.join(", ")
                          : "None listed"
                      }
                    />
                  </div>
                </section>

                {/* Documents */}
                <section className="rounded-xl border border-stone-200 bg-white p-5">
                  <h2 className="mb-3 text-sm font-semibold text-[#141B33]">
                    Documents
                  </h2>

                  <div className="space-y-3">
                    <DocumentCard
                      label="Aadhaar front"
                      url={selected.id_front_url}
                    />
                    <DocumentCard
                      label="Aadhaar back"
                      url={selected.id_back_url}
                    />
                    <DocumentCard
                      label="Skill certificate"
                      url={selected.skill_certificate_url}
                    />
                  </div>
                </section>

                {/* Decision */}
                <section className="rounded-xl border border-stone-200 bg-white p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <ShieldCheck size={20} className="text-[#28598F]" />

                    <div className="min-w-[160px] flex-1">
                      <p className="text-sm font-semibold text-[#141B33]">
                        Decision
                      </p>
                      <p className="mt-0.5 text-xs text-stone-400">
                        Approving activates the Karigar. Declining keeps the
                        account inactive.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setDeclining((open) => !open);
                        setActionError("");
                      }}
                      disabled={actionLoading}
                      className="flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <XCircle size={15} />
                      Decline
                    </button>

                    <button
                      type="button"
                      onClick={handleApprove}
                      disabled={actionLoading}
                      className="flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 size={15} />
                      {actionLoading && !declining ? "Approving..." : "Approve"}
                    </button>
                  </div>

                  {declining && (
                    <div className="mt-4 border-t border-stone-100 pt-4">
                      <label
                        htmlFor="decline-reason"
                        className="text-xs font-medium text-stone-600"
                      >
                        Reason for declining
                      </label>
                      <textarea
                        id="decline-reason"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Skill certificate could not be verified."
                        className="mt-2 w-full rounded-lg border border-stone-200 p-3 text-sm text-stone-800 outline-none focus:border-[#28598F]"
                      />
                      <div className="mt-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setDeclining(false);
                            setComment("");
                            setActionError("");
                          }}
                          className="h-9 rounded-lg border border-stone-200 px-3 text-xs font-medium text-stone-600 hover:bg-stone-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleDecline}
                          disabled={actionLoading}
                          className="h-9 rounded-lg bg-red-600 px-3 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {actionLoading ? "Declining..." : "Confirm decline"}
                        </button>
                      </div>
                    </div>
                  )}

                  {actionError && (
                    <p className="mt-3 text-xs text-red-600">{actionError}</p>
                  )}
                </section>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}