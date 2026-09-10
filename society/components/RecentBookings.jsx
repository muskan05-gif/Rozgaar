import React, { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { recentBookings } from "../data/mockData";

const statusStyles = {
  Confirmed: "bg-emerald-900 text-white",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
};

export default function RecentBookings() {
  const { confirmed, pending } = useMemo(() => {
    return recentBookings.reduce(
      (acc, b) => {
        if (b.status === "Confirmed") acc.confirmed += 1;
        else acc.pending += 1;
        return acc;
      },
      { confirmed: 0, pending: 0 }
    );
  }, []);

  return (
    <div className="flex flex-col rounded-lg border border-stone-200 bg-white lg:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 p-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-semibold text-stone-900">
            Recent Bookings
          </h2>
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
            Live feed
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          View all bookings
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-400">
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Service</th>
              <th className="px-5 py-3 font-medium">Assigned Worker</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr
                key={b.id}
                className="border-b border-stone-100 last:border-0 hover:bg-stone-50"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-[11px] font-semibold text-stone-600">
                      {b.initials}
                    </div>
                    <span className="font-medium text-stone-900">
                      {b.customer}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-stone-600">{b.service}</td>
                <td className="px-5 py-3.5 text-stone-600">{b.worker}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right text-stone-500">
                  {b.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3.5 text-xs text-stone-500">
        <span>Showing {recentBookings.length} most recent requests</span>
        <span>
          {confirmed} Confirmed · {pending} Awaiting Dispatch
        </span>
      </div>
    </div>
  );
}
