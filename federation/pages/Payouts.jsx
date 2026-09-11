import React from "react";
import { PlayCircle, Search, FileCheck2, Landmark, ScaleIcon, KeyRound } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import { payoutSummary, settlementRoster, payoutFooterNotes } from "../data/federationExtras";

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Hold: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function Payouts() {
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
          className="flex items-center gap-2 rounded-md bg-emerald-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-800"
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
              placeholder="Search by worker name, id, trade..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
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
              {settlementRoster.map((r) => (
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
    </>
  );
}
