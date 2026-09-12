import React, { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Timer, Gavel, Search, ChevronDown, ScrollText } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import Modal from "../../src/shared/Modal";
import { federationDisputeStats, federationDisputes, disputeGovernanceNotice } from "../data/directories";

const ICONS = { AlertCircle, CheckCircle2, Timer, Gavel };
const statusStyles = {
  Open: "bg-rose-50 text-rose-700 border-rose-200",
  "Under Mediation": "bg-amber-50 text-amber-700 border-amber-200",
  Escalated: "bg-violet-50 text-violet-700 border-violet-200",
  Resolved: "bg-brand-50 text-brand-700 border-brand-200",
};

export default function Disputes() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [reviewDispute, setReviewDispute] = useState(null);

  const filtered = useMemo(() => {
    return federationDisputes.filter((d) => {
      const matchesQuery =
        d.raisedBy.toLowerCase().includes(query.toLowerCase()) ||
        d.against.toLowerCase().includes(query.toLowerCase()) ||
        d.society.toLowerCase().includes(query.toLowerCase()) ||
        d.id.toLowerCase().includes(query.toLowerCase()) ||
        d.type.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All Statuses" || d.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Disputes</h1>
        <p className="mt-1 max-w-xl text-sm text-stone-500">
          The full escalated-dispute queue and arbitration workflow across
          every society in Roopgarh Federation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {federationDisputeStats.map((stat) => {
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
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15">
              {["All Statuses", "Open", "Under Mediation", "Escalated", "Resolved"].map((s) => (
                <option key={s} value={s}>Status: {s}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dispute ID, society, name, type..." className="w-72 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Dispute</th>
                <th className="px-5 py-3 font-medium">Society</th>
                <th className="px-5 py-3 font-medium">Raised By / Against</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-stone-900">{d.id}</p>
                    <p className="text-xs text-stone-400">{d.raisedOn}</p>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{d.society}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Avatar name={d.raisedBy} size={22} />
                      <span className="text-stone-700">{d.raisedBy}</span>
                      <span className="text-stone-300">vs</span>
                      <Avatar name={d.against} size={22} />
                      <span className="text-stone-700">{d.against}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{d.type}</td>
                  <td className="px-5 py-3.5 text-stone-600">{d.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button type="button" onClick={() => setReviewDispute(d)} className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-sm text-stone-400">
                    No disputes match your search.
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
            <p className="text-sm font-semibold text-stone-900">{disputeGovernanceNotice.title}</p>
            <p className="mt-0.5 max-w-2xl text-sm text-stone-500">{disputeGovernanceNotice.description}</p>
          </div>
        </div>
        <button type="button" className="flex shrink-0 items-center gap-1.5 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
          View Arbitration Guidelines
        </button>
      </div>

      <Modal open={!!reviewDispute} onClose={() => setReviewDispute(null)} title={reviewDispute?.id}>
        {reviewDispute && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-stone-500">Society</span><span className="font-medium text-stone-900">{reviewDispute.society}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Raised By</span><span className="font-medium text-stone-900">{reviewDispute.raisedBy}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Against</span><span className="font-medium text-stone-900">{reviewDispute.against}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Type</span><span className="font-medium text-stone-900">{reviewDispute.type}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Amount</span><span className="font-medium text-stone-900">{reviewDispute.amount}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Status</span><span className="font-medium text-stone-900">{reviewDispute.status}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Raised On</span><span className="font-medium text-stone-900">{reviewDispute.raisedOn}</span></div>
          </div>
        )}
      </Modal>
    </>
  );
}
