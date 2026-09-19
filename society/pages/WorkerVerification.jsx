import React, { useEffect, useState } from "react";
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
} from "lucide-react";

import { useAuth } from "../../src/context/AuthContext";
import { getPendingSocietyKyc } from "../../src/lib/societyapi";

export default function WorkerVerification() {
  const { session } = useAuth();

  // =========================================================
  // LOAD PENDING KYC FROM BACKEND
  // =========================================================
  useEffect(() => {
    const loadPendingKyc = async () => {
      try {
        const data = await getPendingSocietyKyc(session?.token);

        console.log("Pending Society KYC:", data);
      } catch (error) {
        console.error("Failed to load pending KYC:", error);
      }
    };

    if (session?.token) {
      loadPendingKyc();
    }
  }, [session?.token]);

  // =========================================================
  // WORKER INFORMATION
  // =========================================================
  // In the real application, this information should come
  // from your backend/database.
  // =========================================================

  const worker = {
    name: "Vikramjit Singh",
    dob: "15 March 1998",
    email: "vikramjit.singh@gmail.com",
    phone: "+91 98765 43210",
  };

  // =========================================================
  // IDENTITY PROOF
  // =========================================================

  const [identity, setIdentity] = useState({
    name: "Aadhaar Card",
    fileName: "vikramjit_aadhaar.pdf",
    status: "Pending Review",
  });

  // =========================================================
  // CERTIFICATES
  // =========================================================

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: "Electrical Technician Certificate",
      issuer: "Industrial Training Institute",
      fileName: "electrical_certificate.pdf",
      status: "Pending Review",
    },
    {
      id: 2,
      name: "Advanced Electrical Safety Certificate",
      issuer: "Skill Development Council",
      fileName: "electrical_safety_certificate.pdf",
      status: "Pending Review",
    },
  ]);

  // =========================================================
  // APPROVAL STATUS
  // =========================================================

  const [credentialsStatus, setCredentialsStatus] =
    useState("Pending Review");

  // =========================================================
  // OPEN/CLOSE DETAILS
  // =========================================================
  // Only the section clicked by the administrator opens.
  //
  // Possible values:
  // "credentials"
  // "identity"
  // "certificates"
  // null = all closed
  // =========================================================

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  // =========================================================
  // STATUS BADGE
  // =========================================================

  const StatusBadge = ({ status }) => {
    let classes =
      "bg-amber-50 text-amber-700";

    if (status === "Approved") {
      classes = "bg-emerald-50 text-emerald-700";
    }

    if (status === "Rejected") {
      classes = "bg-red-50 text-red-600";
    }

    return (
      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${classes}`}
      >
        {status}
      </span>
    );
  };

  // =========================================================
  // APPROVE / REJECT CREDENTIALS
  // =========================================================

  const approveCredentials = () => {
    setCredentialsStatus("Approved");
  };

  const rejectCredentials = () => {
    setCredentialsStatus("Rejected");
  };

  // =========================================================
  // APPROVE / REJECT IDENTITY
  // =========================================================

  const approveIdentity = () => {
    setIdentity((current) => ({
      ...current,
      status: "Approved",
    }));
  };

  const rejectIdentity = () => {
    setIdentity((current) => ({
      ...current,
      status: "Rejected",
    }));
  };

  // =========================================================
  // APPROVE / REJECT CERTIFICATE
  // =========================================================

  const approveCertificate = (id) => {
    setCertificates((current) =>
      current.map((certificate) =>
        certificate.id === id
          ? {
              ...certificate,
              status: "Approved",
            }
          : certificate
      )
    );
  };

  const rejectCertificate = (id) => {
    setCertificates((current) =>
      current.map((certificate) =>
        certificate.id === id
          ? {
              ...certificate,
              status: "Rejected",
            }
          : certificate
      )
    );
  };

  // =========================================================
  // FINAL APPROVAL
  // =========================================================
  // Worker can only be verified when all sections are approved.
  // =========================================================

  const handleFinalApproval = () => {
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

    // Replace this with your backend API call later.
    console.log("Worker verified:", worker);

    alert("Worker has been successfully verified.");
  };

  // =========================================================
  // VIEW DETAILS BUTTON
  // =========================================================

  const ViewDetailsButton = ({ section }) => {
    const isOpen = openSection === section;

    return (
      <button
        type="button"
        onClick={() => toggleSection(section)}
        className="
          flex
          items-center
          gap-1.5
          rounded-md
          px-3
          py-2
          text-xs
          font-medium
          text-[#28598F]
          transition
          hover:bg-[#F2F6FA]
        "
      >
        <Eye size={14} />

        {isOpen ? "Hide Details" : "View Details"}

        {isOpen ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-full bg-[#F7F8FA]">

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-5xl px-6 py-7">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="mb-6">

          <h1 className="text-2xl font-semibold text-[#141B33]">
            Worker Verification
          </h1>

          <p className="mt-1 text-sm text-stone-500">
            Review the information and documents submitted by
            the worker.
          </p>

        </div>

        {/* ===================================================
            VERIFICATION SECTIONS
        =================================================== */}

        <div className="space-y-3">

          {/* =================================================
              1. CREDENTIALS
          ================================================= */}

          <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">

            {/* -----------------------------------------------
                COMPACT ROW
            ------------------------------------------------ */}

            <div className="flex min-h-[72px] items-center gap-4 px-5 py-3.5">

              {/* Section number */}
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#EDF3F9]
                  text-sm
                  font-semibold
                  text-[#28598F]
                "
              >
                1
              </div>

              {/* Section icon */}
              <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-50 sm:flex">
                <User
                  size={18}
                  className="text-stone-500"
                />
              </div>

              {/* Section information */}
              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-sm font-semibold text-[#141B33]">
                    Credentials
                  </h2>

                  <StatusBadge status={credentialsStatus} />

                </div>

                <p className="mt-1 truncate text-xs text-stone-400">
                  {worker.name} · {worker.email}
                </p>

              </div>

              {/* View details */}
              <ViewDetailsButton section="credentials" />

              {/* Approve */}
              <button
                type="button"
                onClick={approveCredentials}
                className="
                  hidden
                  h-9
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-emerald-600
                  px-3
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-emerald-700
                  sm:flex
                "
              >
                <CheckCircle2 size={15} />
                Approve
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={rejectCredentials}
                className="
                  hidden
                  h-9
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  text-xs
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-100
                  sm:flex
                "
              >
                <XCircle size={15} />
                Reject
              </button>

            </div>

            {/* -----------------------------------------------
                CREDENTIAL DETAILS
            ------------------------------------------------ */}

            {openSection === "credentials" && (
              <div className="border-t border-stone-100 bg-[#FAFBFC] px-5 py-5">

                <div className="grid gap-3 sm:grid-cols-2">

                  {/* Full name */}
                  <div className="rounded-lg border border-stone-200 bg-white p-4">

                    <div className="flex items-center gap-3">

                      <User
                        size={17}
                        className="text-[#28598F]"
                      />

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-stone-400">
                          Full Name
                        </p>

                        <p className="mt-1 text-sm font-semibold text-stone-800">
                          {worker.name}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Date of birth */}
                  <div className="rounded-lg border border-stone-200 bg-white p-4">

                    <div className="flex items-center gap-3">

                      <Calendar
                        size={17}
                        className="text-[#28598F]"
                      />

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-stone-400">
                          Date of Birth
                        </p>

                        <p className="mt-1 text-sm font-semibold text-stone-800">
                          {worker.dob}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Email */}
                  <div className="rounded-lg border border-stone-200 bg-white p-4">

                    <div className="flex items-center gap-3">

                      <Mail
                        size={17}
                        className="text-[#28598F]"
                      />

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-stone-400">
                          Email Address
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-stone-800">
                          {worker.email}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Phone */}
                  <div className="rounded-lg border border-stone-200 bg-white p-4">

                    <div className="flex items-center gap-3">

                      <Phone
                        size={17}
                        className="text-[#28598F]"
                      />

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-stone-400">
                          Phone Number
                        </p>

                        <p className="mt-1 text-sm font-semibold text-stone-800">
                          {worker.phone}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}

          </section>

          {/* =================================================
              2. IDENTITY PROOF
          ================================================= */}

          <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">

            {/* -----------------------------------------------
                COMPACT ROW
            ------------------------------------------------ */}

            <div className="flex min-h-[72px] items-center gap-4 px-5 py-3.5">

              {/* Number */}
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#EDF3F9]
                  text-sm
                  font-semibold
                  text-[#28598F]
                "
              >
                2
              </div>

              {/* Icon */}
              <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-50 sm:flex">

                <FileText
                  size={18}
                  className="text-stone-500"
                />

              </div>

              {/* Summary */}
              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-sm font-semibold text-[#141B33]">
                    Identity Proof
                  </h2>

                  <StatusBadge status={identity.status} />

                </div>

                <p className="mt-1 truncate text-xs text-stone-400">
                  {identity.name} · {identity.fileName}
                </p>

              </div>

              {/* Details */}
              <ViewDetailsButton section="identity" />

              {/* Approve */}
              <button
                type="button"
                onClick={approveIdentity}
                className="
                  hidden
                  h-9
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-emerald-600
                  px-3
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-emerald-700
                  sm:flex
                "
              >
                <CheckCircle2 size={15} />
                Approve
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={rejectIdentity}
                className="
                  hidden
                  h-9
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  text-xs
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-100
                  sm:flex
                "
              >
                <XCircle size={15} />
                Reject
              </button>

            </div>

            {/* -----------------------------------------------
                IDENTITY DETAILS
            ------------------------------------------------ */}

            {openSection === "identity" && (
              <div className="border-t border-stone-100 bg-[#FAFBFC] px-5 py-5">

                <div className="rounded-lg border border-stone-200 bg-white p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EDF3F9]">

                      <FileText
                        size={21}
                        className="text-[#28598F]"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-stone-800">
                        {identity.name}
                      </p>

                      <p className="mt-1 text-xs text-stone-400">
                        Identity Proof
                      </p>

                      <p className="mt-1 text-xs text-stone-500">
                        {identity.fileName}
                      </p>

                    </div>

                    <StatusBadge status={identity.status} />

                  </div>

                  {/* View uploaded document */}
                  <button
                    type="button"
                    onClick={() =>
                      console.log(
                        "Open identity document:",
                        identity.fileName
                      )
                    }
                    className="
                      mt-4
                      flex
                      h-10
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-stone-200
                      bg-white
                      text-xs
                      font-semibold
                      text-[#28598F]
                      transition
                      hover:bg-stone-50
                    "
                  >
                    <Eye size={16} />
                    View Identity Proof
                  </button>

                </div>

              </div>
            )}

          </section>

          {/* =================================================
              3. CERTIFICATES
          ================================================= */}

          <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">

            {/* -----------------------------------------------
                COMPACT ROW
            ------------------------------------------------ */}

            <div className="flex min-h-[72px] items-center gap-4 px-5 py-3.5">

              {/* Number */}
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#EDF3F9]
                  text-sm
                  font-semibold
                  text-[#28598F]
                "
              >
                3
              </div>

              {/* Icon */}
              <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-50 sm:flex">

                <Award
                  size={18}
                  className="text-stone-500"
                />

              </div>

              {/* Summary */}
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

              {/* Details */}
              <ViewDetailsButton section="certificates" />

            </div>

            {/* -----------------------------------------------
                CERTIFICATE DETAILS
            ------------------------------------------------ */}

            {openSection === "certificates" && (
              <div className="space-y-3 border-t border-stone-100 bg-[#FAFBFC] px-5 py-5">

                {certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="
                      rounded-lg
                      border
                      border-stone-200
                      bg-white
                      p-4
                    "
                  >

                    {/* Certificate information */}
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDF3F9]">

                        <Award
                          size={19}
                          className="text-[#28598F]"
                        />

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-semibold text-stone-800">
                          {certificate.name}
                        </p>

                        <p className="mt-0.5 text-xs text-stone-400">
                          Issued by {certificate.issuer}
                        </p>

                        <p className="mt-1 text-xs text-stone-500">
                          {certificate.fileName}
                        </p>

                      </div>

                      <StatusBadge
                        status={certificate.status}
                      />

                    </div>

                    {/* View certificate */}
                    <button
                      type="button"
                      onClick={() =>
                        console.log(
                          "Open certificate:",
                          certificate.fileName
                        )
                      }
                      className="
                        mt-3
                        flex
                        h-9
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-stone-200
                        text-xs
                        font-medium
                        text-[#28598F]
                        hover:bg-stone-50
                      "
                    >
                      <Eye size={15} />
                      View Certificate
                    </button>

                    {/* Certificate actions */}
                    <div className="mt-3 flex justify-end gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          approveCertificate(certificate.id)
                        }
                        className="
                          flex
                          h-9
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-emerald-600
                          px-3
                          text-xs
                          font-semibold
                          text-white
                          hover:bg-emerald-700
                        "
                      >
                        <CheckCircle2 size={15} />
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          rejectCertificate(certificate.id)
                        }
                        className="
                          flex
                          h-9
                          items-center
                          gap-1.5
                          rounded-lg
                          border
                          border-red-200
                          bg-red-50
                          px-3
                          text-xs
                          font-semibold
                          text-red-600
                          hover:bg-red-100
                        "
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

            <ShieldCheck
              size={20}
              className="text-[#28598F]"
            />

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
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-lg
                bg-[#141B33]
                px-4
                text-xs
                font-semibold
                text-white
                transition
                hover:bg-[#1D2745]
              "
            >
              <ShieldCheck size={15} />
              Approve & Verify
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}