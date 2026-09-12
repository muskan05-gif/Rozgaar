import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Timer,
  ArrowUpRight,
  Search,
  ChevronDown,
  ScrollText,
} from "lucide-react";
import Modal from "../../src/shared/Modal";
import { disputeStats, disputes } from "../data/societyExtras";

const ICONS = { AlertCircle, CheckCircle2, Timer, ArrowUpRight };

const statusStyles = {
  Open: "bg-rose-50 text-rose-700 border-rose-200",
  "Under Mediation": "bg-amber-50 text-amber-700 border-amber-200",
  Escalated: "bg-violet-50 text-violet-700 border-violet-200",
  Resolved: "bg-brand-50 text-brand-700 border-brand-200",
};

export default function Disputes() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [logOpen, setLogOpen] = useState(false);
  const [logSubmitted, setLogSubmitted] = useState(false);
  const [reviewDispute, setReviewDispute] = useState(null);
  const [form, setForm] = useState({ against: "", type: "", amount: "" });

  const closeLog = () => {
    setLogOpen(false);
    setLogSubmitted(false);
    setForm({ against: "", type: "", amount: "" });
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return disputes.filter((d) => {
      const matchesQuery =
        !q ||
        d.raisedBy.toLowerCase().includes(q) ||
        d.against.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q);
      const matchesStatus = status === "All Statuses" || d.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Disputes</h1>
          <p className="mt-1 max-w-xl text-sm text-stone-500">
            Customer and worker disputes raised within Kapurthala Cooperative
            Society, before federation escalation.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLogOpen(true)}
          className="flex items-center gap-2 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]"
        >
          Log New Dispute
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {disputeStats.map((stat) => {
          const Icon = ICONS[stat.icon];
          return (
            <div key={stat.key} className="rounded-lg border border-stone-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {stat.label}
                </span>
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            >
              {["All Statuses", "Open", "Under Mediation", "Escalated", "Resolved"].map((s) => (
                <option key={s} value={s}>Status: {s}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>

          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dispute ID, name, or issue type..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Dispute ID</th>
                <th className="px-5 py-3 font-medium">Raised By</th>
                <th className="px-5 py-3 font-medium">Against</th>
                <th className="px-5 py-3 font-medium">Issue Type</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5 font-medium text-stone-900">{d.id}</td>
                  <td className="px-5 py-3.5 text-stone-600">{d.raisedBy}</td>
                  <td className="px-5 py-3.5 text-stone-600">{d.against}</td>
                  <td className="px-5 py-3.5 text-stone-600">{d.type}</td>
                  <td className="px-5 py-3.5 text-stone-600">{d.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setReviewDispute(d)}
                      className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
                    >
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
            <p className="text-sm font-semibold text-stone-900">Dispute Resolution Charter v2.1</p>
            <p className="mt-0.5 max-w-2xl text-sm text-stone-500">
              All disputes must be acknowledged within 24 hours and mediated
              within 3 business days before federation escalation.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          View Mediation Guidelines
        </button>
      </div>

      <Modal open={logOpen} onClose={closeLog} title="Log New Dispute">
        {logSubmitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Dispute logged</p>
            <p className="mt-1 text-sm text-stone-500">It's now in the Open queue awaiting mediation.</p>
            <button type="button" onClick={closeLog} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Done</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setLogSubmitted(true); }} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Against (Worker Name)</label>
              <input required value={form.against} onChange={(e) => setForm({ ...form, against: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Issue Type</label>
              <input required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="e.g. Pricing Claim" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Amount in Dispute</label>
              <input required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="₹0" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button type="button" onClick={closeLog} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">Cancel</button>
              <button type="submit" className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Log Dispute</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={!!reviewDispute} onClose={() => setReviewDispute(null)} title={reviewDispute?.id}>
        {reviewDispute && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-stone-500">Raised By</span><span className="font-medium text-stone-900">{reviewDispute.raisedBy}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Against</span><span className="font-medium text-stone-900">{reviewDispute.against}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Issue Type</span><span className="font-medium text-stone-900">{reviewDispute.type}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Amount</span><span className="font-medium text-stone-900">{reviewDispute.amount}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Status</span><span className="font-medium text-stone-900">{reviewDispute.status}</span></div>
            <div className="flex justify-between"><span className="text-stone-500">Raised On</span><span className="font-medium text-stone-900">{reviewDispute.raisedOn}</span></div>
          </div>
        )}
      </Modal>
    </>
  );
}
