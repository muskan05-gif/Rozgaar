import React, { useState } from "react";
import { UserPlus, Network, Star } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import {
  federationTabs,
  cooperativeProfile,
  teamRoles,
  notificationDispatchPrefs,
  federationHierarchy,
} from "../data/federationExtras";

export default function Settings() {
  const [tab, setTab] = useState(federationTabs[0]);
  const [prefs, setPrefs] = useState(notificationDispatchPrefs);

  const toggle = (key) => {
    setPrefs((prev) => prev.map((p) => (p.key === key ? { ...p, enabled: !p.enabled } : p)));
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">System &amp; Society Configuration</h1>
        <p className="mt-1 max-w-2xl text-sm text-stone-500">
          Federation profile, admin access, and cooperative hierarchy for
          Roopgarh Federation.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-stone-200">
        {federationTabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              tab === t
                ? "border-emerald-900 text-emerald-900"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Cooperative Profile" && (
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-base font-semibold text-stone-900">Cooperative Profile</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Federation Name" value={cooperativeProfile.name} />
            <Field label="Registration ID" value={cooperativeProfile.registrationId} />
            <Field label="Zone" value={cooperativeProfile.zone} />
            <Field label="Registrar" value={cooperativeProfile.registrar} />
            <Field label="Established" value={cooperativeProfile.established} />
            <Field label="Member Societies" value={String(cooperativeProfile.memberSocieties)} />
          </div>
          <button
            type="button"
            className="mt-4 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Edit Federation Profile
          </button>
        </div>
      )}

      {tab === "Team & Roles" && (
        <div className="rounded-lg border border-stone-200 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 p-5">
            <div>
              <h2 className="text-base font-semibold text-stone-900">Team &amp; Roles</h2>
              <p className="mt-0.5 text-sm text-stone-500">People with administrative access at the federation level.</p>
            </div>
            <button type="button" className="flex items-center gap-1.5 rounded-md bg-emerald-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-800">
              <UserPlus size={15} />
              Invite Member
            </button>
          </div>
          <ul className="divide-y divide-stone-100">
            {teamRoles.map((m) => (
              <li key={m.name} className="flex items-center justify-between gap-3 p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={m.name} size={34} />
                  <div>
                    <p className="text-sm font-medium text-stone-900">{m.name}</p>
                    <p className="text-xs text-stone-400">{m.role} · {m.access}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${m.active ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
                  {m.active ? "Active" : "Invited"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "Notification Dispatch" && (
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-base font-semibold text-stone-900">Notification Dispatch</h2>
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
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${p.enabled ? "bg-emerald-700" : "bg-stone-300"}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${p.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "Federation Hierarchy" && (
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-stone-900">
            <Network size={16} className="text-stone-400" />
            Society &amp; Federation Hierarchy Management
          </h2>
          <p className="mt-0.5 text-sm text-stone-500">
            Topological mapping of apex governing bodies, regional clusters, and local grassroots cooperatives.
          </p>

          <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2">
              <Star size={14} className="text-emerald-700" />
              <span className="text-sm font-semibold text-stone-900">{federationHierarchy.name}</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-stone-500">
                {federationHierarchy.code}
              </span>
            </div>

            {federationHierarchy.clusters.map((cluster) => (
              <div key={cluster.name} className="ml-4 mt-3 border-l-2 border-stone-200 pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-stone-800">{cluster.name}</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    {cluster.code}
                  </span>
                </div>
                {cluster.societies.map((soc) => (
                  <div
                    key={soc.name}
                    className={`ml-4 mt-2 flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
                      soc.current ? "border-emerald-300 bg-emerald-50" : "border-stone-200 bg-white"
                    }`}
                  >
                    <span className={soc.current ? "font-medium text-emerald-800" : "text-stone-700"}>
                      {soc.name}
                      {soc.current && (
                        <span className="ml-2 rounded-full bg-emerald-700 px-1.5 py-0.5 text-[9px] font-medium text-white">
                          CURRENT NODE
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-stone-400">{soc.workers} Active Workers</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            + Charter New Society Node
          </button>
        </div>
      )}
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
