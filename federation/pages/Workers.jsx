import React, { useMemo, useState } from "react";
import { Users, ShieldCheck, ShieldAlert, Star, Download, Search, ChevronDown } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import ActionMenu from "../../src/shared/ActionMenu";
import { exportToCsv } from "../../src/shared/exportCsv";
import { federationWorkerStats, federationWorkers, societiesDirectory } from "../data/directories";

const ICONS = { Users, ShieldCheck, ShieldAlert, Star };
const statusStyles = {
  Verified: "bg-brand-50 text-brand-700 border-brand-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
};

const societyOptions = ["All Societies", ...societiesDirectory.map((s) => s.name)];

export default function Workers() {
  const [query, setQuery] = useState("");
  const [society, setSociety] = useState("All Societies");
  const [status, setStatus] = useState("All Statuses");

  const filtered = useMemo(() => {
    return federationWorkers.filter((w) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.society.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q);
      const matchesSociety = society === "All Societies" || w.society === society;
      const matchesStatus = status === "All Statuses" || w.status === status;
      return matchesQuery && matchesSociety && matchesStatus;
    });
  }, [query, society, status]);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Workers</h1>
          <p className="mt-1 max-w-xl text-sm text-stone-500">
            Federation-wide worker directory: verification status and
            cross-society mobility for every registered member.
          </p>
        </div>
        <button type="button" onClick={() => exportToCsv("federation-workers-directory", federationWorkers)} className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
          <Download size={16} />
          Export Directory
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {federationWorkerStats.map((stat) => {
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
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <select value={society} onChange={(e) => setSociety(e.target.value)} className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15">
                {societyOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
            <div className="relative">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15">
                {["All Statuses", "Verified", "Pending"].map((s) => <option key={s} value={s}>Status: {s}</option>)}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
          </div>
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, ID, society, category..." className="w-72 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Worker</th>
                <th className="px-5 py-3 font-medium">Society</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Jobs</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={w.name} size={32} />
                      <div>
                        <p className="font-medium text-stone-900">{w.name}</p>
                        <p className="text-xs text-stone-400">{w.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{w.society}</td>
                  <td className="px-5 py-3.5 text-stone-600">{w.category}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-stone-700">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {w.rating.toFixed(1)}
                      <span className="text-xs text-stone-400">({w.reviews})</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[w.status]}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{w.jobs}</td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <ActionMenu
                      items={[
                        { label: "View Profile", onClick: () => alert(`Viewing ${w.name}`) },
                        { label: "Transfer Society", onClick: () => alert(`Transfer ${w.name} — coming soon`) },
                        { label: "Suspend Worker", onClick: () => alert(`${w.name} suspended`) },
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-stone-400">
                    No workers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3.5 text-sm text-stone-500">
          Showing {filtered.length} of {federationWorkers.length} federation-wide workers
        </div>
      </div>
    </>
  );
}
