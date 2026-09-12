import React from "react";
import { Download } from "lucide-react";
import {
  analyticsSummary,
  bookingVolumeTrend,
  serviceDemand,
  workerGrowthTrend,
  workerGrowthMonths,
  wageParityBySociety,
  socialEquity,
} from "../data/federationExtras";

const LINE_HEIGHT = 120;
const BAR_HEIGHT = 120;

function Sparkline({ data, color = "#141B33" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = LINE_HEIGHT - ((v - min) / range) * LINE_HEIGHT;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 100 ${LINE_HEIGHT}`} preserveAspectRatio="none" className="h-28 w-full">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function Analytics() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">
            Cooperative Performance &amp; Social Impact Analytics
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-stone-500">
            Monitors fair-wage distribution, worker welfare provisioning, and
            dividend-state performance across all federated societies.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsSummary.map((s) => (
          <div key={s.key} className="rounded-lg border border-stone-200 bg-white shadow-sm p-4">
            <span className="text-xs font-medium uppercase tracking-wide text-stone-400">{s.label}</span>
            <p className="mt-2 text-2xl font-semibold text-stone-900">{s.value}</p>
            <p className="mt-1 text-xs text-brand-700">{s.footnote}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
          <h2 className="text-sm font-semibold text-stone-900">Booking Volume &amp; Fulfillment Velocity</h2>
          <p className="mt-0.5 text-xs text-stone-500">Daily completed bookings against capacity threshold (52-week cycle)</p>
          <Sparkline data={bookingVolumeTrend} />
        </div>

        <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
          <h2 className="text-sm font-semibold text-stone-900">Service Category Demand &amp; Capacity</h2>
          <p className="mt-0.5 text-xs text-stone-500">Fulfillment capacity vs. statutory cooperative dispatch volume per trade</p>
          <div className="mt-4 flex items-end justify-between gap-3" style={{ height: BAR_HEIGHT }}>
            {serviceDemand.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-[10px] text-stone-400">{d.value}%</span>
                <div
                  className="w-6 rounded-t-sm bg-[#141B33]"
                  style={{ height: `${(d.value / 100) * (BAR_HEIGHT - 20)}px` }}
                />
                <span className="text-[10px] text-stone-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
          <h2 className="text-sm font-semibold text-stone-900">Worker Growth &amp; Retention</h2>
          <p className="mt-0.5 text-xs text-stone-500">Cooperative-wide membership vs. verified active workforce (6-month)</p>
          <Sparkline data={workerGrowthTrend} color="#141B33" />
          <div className="mt-1 flex justify-between text-[10px] text-stone-400">
            {workerGrowthMonths.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
          <h2 className="text-sm font-semibold text-stone-900">Fair-Wage Parity &amp; Gini Benchmark</h2>
          <p className="mt-0.5 text-xs text-stone-500">
            Actual regional avg. hourly rate against statutory floor (₹218/hr)
          </p>
          <div className="mt-4 space-y-3">
            {wageParityBySociety.map((s) => {
              const pct = Math.min(100, (s.actual / (s.floor * 1.6)) * 100);
              return (
                <div key={s.society}>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{s.society}</span>
                    <span className="font-medium text-stone-700">₹{s.actual}/hr</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-stone-100">
                    <div className="h-2 rounded-full bg-[#141B33]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
        <h2 className="text-sm font-semibold text-stone-900">Social Equity &amp; Welfare Distribution</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {socialEquity.map((s) => (
            <div key={s.key} className="rounded-md bg-stone-50 p-4">
              <p className="text-xs text-stone-400">{s.label}</p>
              <p className="mt-1 text-xl font-semibold text-stone-900">{s.value}</p>
              <p className="mt-0.5 text-xs text-brand-700">{s.footnote}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
