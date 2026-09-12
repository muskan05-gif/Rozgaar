import React, { useMemo, useState } from "react";
import { Wallet, Clock, Timer, ShieldCheck, Download, PlayCircle, Search, CheckCircle2 } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import Modal from "../../src/shared/Modal";
import { exportToCsv } from "../../src/shared/exportCsv";
import { payoutStats, payoutRecords as initialRecords, payoutConfig } from "../data/societyExtras";

const ICONS = { Wallet, Clock, Timer, ShieldCheck };

const statusStyles = {
  Paid: "bg-brand-50 text-brand-700 border-brand-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function Payouts() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState(initialRecords);
  const [batchOpen, setBatchOpen] = useState(false);
  const [batchDone, setBatchDone] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return records.filter(
      (r) =>
        !q ||
        r.worker.toLowerCase().includes(q) ||
        r.account.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [query, records]);

  const handleAction = (worker) => {
    setRecords((prev) =>
      prev.map((r) => (r.worker === worker ? { ...r, status: "Paid", lastPayout: "Today" } : r))
    );
  };

  const runBatch = () => {
    setRecords((prev) => prev.map((r) => (r.status !== "Paid" ? { ...r, status: "Paid", lastPayout: "Today" } : r)));
    setBatchDone(true);
  };

  const closeBatch = () => {
    setBatchOpen(false);
    setBatchDone(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Payouts</h1>
          <p className="mt-1 max-w-xl text-sm text-stone-500">
            Worker wage disbursements, pending settlements, and payment
            history for Kapurthala Cooperative Society.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => exportToCsv("payout-ledger", records)}
            className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Download size={16} />
            Export Ledger
          </button>
          <button
            type="button"
            onClick={() => setBatchOpen(true)}
            className="flex items-center gap-2 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]"
          >
            <PlayCircle size={16} />
            Run Payout Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {payoutStats.map((stat) => {
          const Icon = ICONS[stat.icon];
          return (
            <div key={stat.key} className="rounded-lg border border-stone-200 bg-white p-4">
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

      <div className="rounded-lg border border-stone-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 p-5">
          <div>
            <h2 className="text-base font-semibold text-stone-900">Payout Queue</h2>
            <p className="mt-0.5 text-sm text-stone-500">
              Wages owed to workers based on completed and escrow-cleared bookings.
            </p>
          </div>
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search worker, account, or status..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Worker</th>
                <th className="px-5 py-3 font-medium">Bank Account</th>
                <th className="px-5 py-3 font-medium">Amount Due</th>
                <th className="px-5 py-3 font-medium">Last Payout</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.worker} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.worker} size={28} />
                      <span className="font-medium text-stone-900">{r.worker}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{r.account}</td>
                  <td className="px-5 py-3.5 text-stone-600">{r.due}</td>
                  <td className="px-5 py-3.5 text-stone-600">{r.lastPayout}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleAction(r.worker)}
                      className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
                    >
                      {r.status === "Pending" ? "Release" : r.status === "Failed" ? "Retry" : "View Receipt"}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-stone-400">No payouts match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-base font-semibold text-stone-900">Payout Configuration</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ConfigItem label="Settlement Bank" value={payoutConfig.bank} />
          <ConfigItem label="Account" value={payoutConfig.accountMasked} />
          <ConfigItem label="Payout Mode" value={payoutConfig.mode} />
          <ConfigItem label="Schedule" value={payoutConfig.schedule} />
        </div>
      </div>

      <Modal open={batchOpen} onClose={closeBatch} title="Run Payout Batch">
        {batchDone ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Batch processed</p>
            <p className="mt-1 text-sm text-stone-500">All pending and failed payouts have been marked Paid.</p>
            <button type="button" onClick={closeBatch} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Done</button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-stone-600">
              This will process all pending and failed payouts in the queue and mark them as paid via automatic NEFT settlement.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button type="button" onClick={closeBatch} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">Cancel</button>
              <button type="button" onClick={runBatch} className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Confirm & Run Batch</button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function ConfigItem({ label, value }) {
  return (
    <div className="rounded-md bg-stone-50 p-3">
      <p className="text-xs text-stone-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-stone-900">{value}</p>
    </div>
  );
}
