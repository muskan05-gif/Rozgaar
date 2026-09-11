import React, { useState } from "react";
import { UserPlus, Landmark } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import { societyInfo } from "../data/mockData";
import { admins, notificationPrefs, payoutConfig } from "../data/societyExtras";

export default function Settings() {
  const [prefs, setPrefs] = useState(notificationPrefs);

  const toggle = (key) => {
    setPrefs((prev) =>
      prev.map((p) => (p.key === key ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Settings</h1>
        <p className="mt-1 max-w-xl text-sm text-stone-500">
          Society profile, admin access, and notification preferences for
          Kapurthala Cooperative Society.
        </p>
      </div>

      {/* Society profile */}
      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">Society Profile</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Society Name" value={societyInfo.name} />
          <Field label="Society ID" value={societyInfo.societyId} />
          <Field label="Region" value={societyInfo.location} />
          <Field label="District" value={societyInfo.district} />
        </div>
        <button
          type="button"
          className="mt-4 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Edit Profile Details
        </button>
      </div>

      {/* Admin users */}
      <div className="rounded-lg border border-stone-200 bg-white">
        <div className="flex items-center justify-between border-b border-stone-200 p-5">
          <div>
            <h2 className="text-base font-semibold text-stone-900">Admin Users</h2>
            <p className="mt-0.5 text-sm text-stone-500">
              People with administrative access to this society's portal.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md bg-emerald-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-800"
          >
            <UserPlus size={15} />
            Invite Admin
          </button>
        </div>
        <ul className="divide-y divide-stone-100">
          {admins.map((a) => (
            <li key={a.email} className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <Avatar name={a.name} size={34} />
                <div>
                  <p className="text-sm font-medium text-stone-900">{a.name}</p>
                  <p className="text-xs text-stone-400">{a.role} · {a.email}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  a.active
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {a.active ? "Active" : "Invited"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notification preferences */}
      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">Notification Preferences</h2>
        <ul className="mt-3 divide-y divide-stone-100">
          {prefs.map((p) => (
            <li key={p.key} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-stone-800">{p.label}</p>
                <p className="text-xs text-stone-400">{p.description}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(p.key)}
                aria-label={`Toggle ${p.label}`}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                  p.enabled ? "bg-emerald-700" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    p.enabled ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Payout configuration */}
      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold text-stone-900">
          <Landmark size={16} className="text-stone-400" />
          Payout Configuration
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Settlement Bank" value={payoutConfig.bank} />
          <Field label="Account" value={payoutConfig.accountMasked} />
          <Field label="Payout Mode" value={payoutConfig.mode} />
          <Field label="Schedule" value={payoutConfig.schedule} />
        </div>
      </div>
    </>
  );
}

function Field({ label, value }) {
  return (
    <div className="rounded-md bg-stone-50 p-3">
      <p className="text-xs text-stone-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-stone-900">{value}</p>
    </div>
  );
}
