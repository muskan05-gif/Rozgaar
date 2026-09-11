import React from "react";
import {
  FileText,
  CalendarClock,
  ShieldCheck,
  Gauge,
  CalendarCheck,
  Wallet,
  Gavel,
  HeartHandshake,
  FileBarChart,
  Download,
} from "lucide-react";
import { reportStats, availableReports } from "../data/societyExtras";

const STAT_ICONS = { FileText, CalendarClock, ShieldCheck, Gauge };
const REPORT_ICONS = { CalendarCheck, ShieldCheck, Wallet, Gavel, HeartHandshake, FileBarChart };

export default function Reports() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Reports</h1>
        <p className="mt-1 max-w-xl text-sm text-stone-500">
          Downloadable operational and compliance reports for Kapurthala
          Cooperative Society.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat) => {
          const Icon = STAT_ICONS[stat.icon];
          return (
            <div key={stat.key} className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {stat.label}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                  <Icon size={14} />
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-stone-900">{stat.value}</p>
              <p className="mt-1 text-xs text-stone-500">{stat.footnote}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availableReports.map((r) => {
          const Icon = REPORT_ICONS[r.icon];
          return (
            <div key={r.key} className="flex flex-col rounded-lg border border-stone-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                <Icon size={17} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-stone-900">{r.title}</h3>
              <p className="mt-1 flex-1 text-sm text-stone-500">{r.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                <span className="text-xs text-stone-400">Last generated {r.lastGenerated}</span>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:underline"
                >
                  <Download size={13} />
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
