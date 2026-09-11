import React, { useState } from "react";
import { Scale, ShieldCheck, Download } from "lucide-react";
import { wageBenchmarks, policyToggles, registryStatus } from "../data/federationExtras";

export default function PolicyWages() {
  const [toggles, setToggles] = useState(policyToggles);

  const toggle = (key) => {
    setToggles((prev) => prev.map((t) => (t.key === key ? { ...t, enabled: !t.enabled } : t)));
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Policy &amp; Wages</h1>
        <p className="mt-1 max-w-2xl text-sm text-stone-500">
          Statutory wage benchmarks and dispatch governance rules enforced
          across every federated society.
        </p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold text-stone-900">
          <Scale size={16} className="text-stone-400" />
          Statutory Fair-Wage &amp; Commission Benchmarks
        </h2>
        <p className="mt-0.5 text-sm text-stone-500">
          Enforces base wage ceilings and cooperative retainer minimums that
          societies chartered under this federation cannot fall below.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <BenchmarkCard label="Min Base Rate" value={wageBenchmarks.minBaseRate.value} unit={wageBenchmarks.minBaseRate.unit} note={wageBenchmarks.minBaseRate.note} />
          <BenchmarkCard label="Welfare Surcharge" value={wageBenchmarks.welfareSurcharge.value} unit={wageBenchmarks.welfareSurcharge.unit} note={wageBenchmarks.welfareSurcharge.note} />
          <BenchmarkCard label="Admin Retention" value={wageBenchmarks.adminRetention.value} unit={wageBenchmarks.adminRetention.unit} note={wageBenchmarks.adminRetention.note} />
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">Dispatch Governance Rules</h2>
        <ul className="mt-3 divide-y divide-stone-100">
          {toggles.map((t) => (
            <li key={t.key} className="flex items-start justify-between gap-4 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-stone-800">{t.label}</p>
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500">
                    {t.tag}
                  </span>
                </div>
                <p className="mt-1 max-w-xl text-xs text-stone-500">{t.description}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(t.key)}
                aria-label={`Toggle ${t.label}`}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                  t.enabled ? "bg-emerald-700" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    t.enabled ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-stone-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-600" />
          <div>
            <p className="text-sm font-semibold text-stone-900">Society Registry Status</p>
            <p className="mt-0.5 text-sm text-stone-500">
              {registryStatus.certificate} · {registryStatus.renewed}
            </p>
            <p className="mt-0.5 text-xs text-stone-400">
              KYC Verified Members: {registryStatus.kycVerified}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          <Download size={15} />
          Download Annual Society Audit Packet
        </button>
      </div>
    </>
  );
}

function BenchmarkCard({ label, value, unit, note }) {
  return (
    <div className="rounded-md bg-stone-50 p-4">
      <p className="text-xs text-stone-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-stone-900">
        {value} <span className="text-xs font-normal text-stone-400">{unit}</span>
      </p>
      <p className="mt-1 text-xs text-emerald-700">{note}</p>
    </div>
  );
}
