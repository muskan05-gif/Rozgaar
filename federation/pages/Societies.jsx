import React, { useMemo, useState } from "react";
import {
  Building2,
  Users,
  Star,
  ShieldCheck,
  Download,
  PlusCircle,
  Search,
  ChevronDown,
  MoreVertical,
  ScrollText,
} from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import Modal from "../../src/shared/Modal";
import ActionMenu from "../../src/shared/ActionMenu";
import { exportToCsv } from "../../src/shared/exportCsv";
import { CheckCircle2 } from "lucide-react";
import {
  federationSocietyStats,
  districtFilterOptions,
  societiesDirectory,
  societyGovernanceNotice,
} from "../data/directories";

const ICONS = { Building2, Users, Star, ShieldCheck };

const statusStyles = {
  Active: "bg-brand-50 text-brand-700 border-brand-200",
  Onboarding: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function Societies() {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("All Districts");
  const [charterOpen, setCharterOpen] = useState(false);
  const [charterSubmitted, setCharterSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", district: "", coordinator: "" });

  const closeCharter = () => {
    setCharterOpen(false);
    setCharterSubmitted(false);
    setForm({ name: "", district: "", coordinator: "" });
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return societiesDirectory.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.coordinator.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      const matchesDistrict = district === "All Districts" || s.district === district;
      return matchesQuery && matchesDistrict;
    });
  }, [query, district]);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Societies</h1>
          <p className="mt-1 max-w-xl text-sm text-stone-500">
            Full registry, onboarding status, and governance detail for every
            member society under Roopgarh Federation.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={() => exportToCsv("societies-registry", societiesDirectory)} className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
            <Download size={16} />
            Export Registry
          </button>
          <button type="button" onClick={() => setCharterOpen(true)} className="flex items-center gap-2 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
            <PlusCircle size={16} />
            Charter Society
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {federationSocietyStats.map((stat) => {
          const Icon = ICONS[stat.icon];
          return (
            <div key={stat.key} className="rounded-lg border border-stone-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-stone-400">{stat.label}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                  <Icon size={14} />
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-stone-900">{stat.value}</p>
              <p className="mt-1 text-xs text-stone-500">{stat.footnote}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 p-5">
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            >
              {districtFilterOptions.map((d) => (
                <option key={d} value={d}>District: {d}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>

          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search society, coordinator, or ID..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Society</th>
                <th className="px-5 py-3 font-medium">Coordinator</th>
                <th className="px-5 py-3 font-medium">Workers</th>
                <th className="px-5 py-3 font-medium">Disbursed</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-stone-900">{s.name}</p>
                    <p className="text-xs text-stone-400">{s.id} · {s.district} · Since {s.registered}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.coordinator} size={26} />
                      <span className="text-stone-600">{s.coordinator}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{s.workers}</td>
                  <td className="px-5 py-3.5 text-stone-600">{s.disbursed}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-stone-700">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {s.rating.toFixed(1)}
                      <span className="text-xs text-stone-400">({s.reviews})</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <ActionMenu
                      items={[
                        { label: "View Society", onClick: () => alert(`Viewing ${s.name}`) },
                        { label: "Edit Details", onClick: () => alert(`Edit ${s.name} — coming soon`) },
                        { label: "Suspend Charter", onClick: () => alert(`${s.name} charter suspended`) },
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-stone-400">
                    No societies match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white shadow-sm p-5">
        <div className="flex items-start gap-3">
          <ScrollText size={18} className="mt-0.5 shrink-0 text-stone-400" />
          <div>
            <p className="text-sm font-semibold text-stone-900">{societyGovernanceNotice.title}</p>
            <p className="mt-0.5 max-w-2xl text-sm text-stone-500">{societyGovernanceNotice.description}</p>
          </div>
        </div>
        <button type="button" className="flex shrink-0 items-center gap-1.5 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
          View Charter Requirements
        </button>
      </div>

      <Modal open={charterOpen} onClose={closeCharter} title="Charter New Society">
        {charterSubmitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Charter application submitted</p>
            <p className="mt-1 text-sm text-stone-500">
              {form.name} will appear as "Onboarding" once the registration audit is complete.
            </p>
            <button type="button" onClick={closeCharter} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setCharterSubmitted(true); }} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Society Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">District</label>
              <input required value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Proposed Coordinator</label>
              <input required value={form.coordinator} onChange={(e) => setForm({ ...form, coordinator: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button type="button" onClick={closeCharter} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">Cancel</button>
              <button type="submit" className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Submit Charter</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
