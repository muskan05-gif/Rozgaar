import React from "react";
import { weeklyTrend, weeklyTrendMeta } from "../data/mockData";

const CHART_HEIGHT = 176;

export default function WeeklyTrends() {
  const maxValue = Math.max(...weeklyTrend.map((d) => d.value));
  const chartTop = Math.ceil(maxValue / 10) * 10 + 10;
  const thresholdPx =
    (weeklyTrendMeta.targetThreshold / chartTop) * CHART_HEIGHT;

  return (
    <div className="rounded-[22px] border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-stone-900">
        Weekly Booking Trends
      </h2>

      <div className="relative mt-5" style={{ height: CHART_HEIGHT }}>
        <div
          className="absolute left-0 right-0 border-t border-dashed border-stone-300"
          style={{ bottom: thresholdPx }}
        />

        <div className="flex h-full items-end justify-between gap-3">
          {weeklyTrend.map((d) => {
            const barPx = Math.max(
              4,
              (d.value / chartTop) * CHART_HEIGHT
            );

            return (
              <div
                key={d.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
              >
                {d.isPeak && (
                  <span className="text-[10px] font-medium text-[#141B33]">
                    {d.value} · Peak
                  </span>
                )}
                <div
                  className={`w-8 rounded-t-md ${
                    d.isPeak ? "bg-[#141B33]" : "bg-[#141B33]/75"
                  }`}
                  style={{ height: barPx }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
