import React, { useMemo, useState } from "react";
import { PlayCircle, Search, Landmark, ScaleIcon, KeyRound, CheckCircle2 } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import Modal from "../../src/shared/Modal";
import { payoutSummary, settlementRoster as initialRoster, payoutFooterNotes } from "../data/federationExtras";

const statusStyles = {
  Paid: "bg-brand-50 text-brand-700 border-brand-200",
  Hold: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function Payouts() {
  const [query, setQuery] = useState("");
  const [roster, setRoster] = useState(initialRoster);
  const [processOpen, setProcessOpen] = useState(false);
  const [processDone, setProcessDone] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return roster.filter(
      (r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.society.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q)
    );
  }, [query, roster]);

  const closeProcess = () => {
    setProcessOpen(false);
    setProcessDone(false);
  };

  const runProcess = () => {
    setRoster((prev) => prev.map((r) => (r.status === "Hold" ? r : { ...r, status: "Paid" })));
    setProcessDone(true);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Cooperative Wage Settlement &amp; Escrow Disbursals
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-stone-500">
            Bi-weekly Direct Settlement (EDT) clearing cycle for Roopgarh
            Federation's multi-society cooperative registry.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setProcessOpen(true)}
          className="flex items-center gap-2 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]"
        >
          <PlayCircle size={16} />
          Process Payouts (₹8,42,500)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {payoutSummary.map((s) => (
          <div key={s.key} className="rounded-lg border border-stone-200 bg-white p-4">
            <span className="text-xs font-medium uppercase tracking-wide text-stone-400">{s.label}</span>
            <p className="mt-2 text-2xl font-semibold text-stone-900">{s.value}</p>
            <p className="mt-1 text-xs text-stone-500">{s.footnote}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-stone-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 p-5">
          <div>
            <h2 className="text-base font-semibold text-stone-900">Bi-Weekly Worker Settlement Roster</h2>
            <p className="mt-0.5 text-sm text-stone-500">
              Cooperative wage disbursements, held minimum-wage benchmarks, and payout status.
            </p>
          </div>
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by worker name, society, trade..."
              className="w-72 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Worker</th>
                <th className="px-5 py-3 font-medium">Society</th>
                <th className="px-5 py-3 font-medium">Activity</th>
                <th className="px-5 py-3 font-medium">Pay Rate</th>
                <th className="px-5 py-3 font-medium">Net Payout</th>
                <th className="px-5 py-3 font-medium">Disbursal</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.name} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.name} size={30} />
                      <div>
                        <p className="font-medium text-stone-900">{r.name}</p>
                        <p className="text-xs text-stone-400">{r.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{r.society}</td>
                  <td className="px-5 py-3.5 text-stone-600">{r.activity}</td>
                  <td className="px-5 py-3.5 text-stone-600">{r.payRate}</td>
                  <td className="px-5 py-3.5 font-medium text-stone-900">{r.netPayout}</td>
                  <td className="px-5 py-3.5 text-stone-600">{r.disbursal}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-stone-400">No workers match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 text-xs text-stone-400">
          <span>Cooperative Ledger Block: {payoutFooterNotes.ledgerBlock}</span>
          <span>Refreshed {payoutFooterNotes.refreshedAgo}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-5">
          <ScaleIcon size={18} className="mt-0.5 shrink-0 text-stone-400" />
          <div>
            <p className="text-sm font-semibold text-stone-900">Statutory Wage Floor vs. Cooperative Rate</p>
            <p className="mt-0.5 text-sm text-stone-500">{payoutFooterNotes.wageFloorNote}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-5">
          <KeyRound size={18} className="mt-0.5 shrink-0 text-stone-400" />
          <div>
            <p className="text-sm font-semibold text-stone-900">Register Dual-Key Signing</p>
            <p className="mt-0.5 text-sm text-stone-500">{payoutFooterNotes.dualKeySigning}</p>
          </div>
        </div>
      </div>

      <Modal open={processOpen} onClose={closeProcess} title="Process Payouts">
        {processDone ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Batch processed</p>
            <p className="mt-1 text-sm text-stone-500">All non-held settlements have been marked Paid across all societies.</p>
            <button type="button" onClick={closeProcess} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Done</button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-stone-600">
              This will settle ₹8,42,500 across all federated societies via NEFT, excluding accounts on hold pending KYC.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button type="button" onClick={closeProcess} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">Cancel</button>
              <button type="button" onClick={runProcess} className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Confirm & Process</button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
