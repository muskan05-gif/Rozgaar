import React from "react";
import { weeklyTrend, weeklyTrendMeta } from "../data/mockData";

const CHART_HEIGHT = 176; // px — fixed, so bar heights are computed directly instead of relying on nested % heights

export default function WeeklyTrends() {
  const maxValue = Math.max(...weeklyTrend.map((d) => d.value));
  const chartTop = Math.ceil(maxValue / 10) * 10 + 10;
  const thresholdPx = (weeklyTrendMeta.targetThreshold / chartTop) * CHART_HEIGHT;

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold text-stone-900">
              Weekly Booking Trends
            </h2>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
              Current Cycle
            </span>
          </div>
          <p className="mt-0.5 text-sm text-stone-500">
            Daily job allocations across Kapurthala district (Mon – Sun).
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-900" />
              Completed Bookings
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-stone-200" />
              Target Threshold
            </span>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
              Volume
            </p>
            <p className="text-sm font-semibold text-stone-900">
              {weeklyTrendMeta.volumeTotal} total
            </p>
          </div>
        </div>
      </div>

      {/* Chart — fixed pixel height, bars sized in px, no nested % heights */}
      <div className="relative mt-6" style={{ height: CHART_HEIGHT }}>
        <div
          className="absolute left-0 right-0 border-t border-dashed border-stone-300"
          style={{ bottom: thresholdPx }}
        />

        <div className="flex items-end justify-between gap-3" style={{ height: CHART_HEIGHT }}>
          {weeklyTrend.map((d) => {
            const barPx = Math.max(4, (d.value / chartTop) * CHART_HEIGHT);
            return (
              <div key={d.day} className="flex flex-1 flex-col items-center justify-end gap-1.5">
                {d.isPeak && (
                  <span className="text-[10px] font-medium text-emerald-700">
                    {d.value} · Peak
                  </span>
                )}
                <div
                  className={`w-8 rounded-t-sm ${d.isPeak ? "bg-emerald-900" : "bg-emerald-900/80"}`}
                  style={{ height: barPx }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-1 flex justify-between gap-3 border-t border-stone-100 pt-2">
        {weeklyTrend.map((d) => (
          <div key={d.day} className="flex-1 text-center">
            <p className="text-xs font-medium text-stone-600">{d.day}</p>
            <p className="text-[10px] text-stone-400">{d.date}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-4 text-xs text-stone-500">
        <span>{weeklyTrendMeta.insight}</span>
        <span className="font-medium text-stone-700">
          Cooperative Fulfillment Rate: {weeklyTrendMeta.fulfillmentRate}
        </span>
      </div>
    </div>
  );
}
