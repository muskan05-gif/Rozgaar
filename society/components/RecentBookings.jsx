import React, { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { recentBookings } from "../data/mockData";
import Avatar from "../../src/shared/Avatar";

const statusStyles = {
  Confirmed: "text-emerald-700",
  Pending: "text-red-600",
  "In Progress": "text-amber-600",
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
    <div className="flex min-w-0 flex-col rounded-[22px] border border-stone-200 bg-white p-4 shadow-sm sm:p-5 xl:col-span-3">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-stone-900">
            Recent Bookings
          </h2>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
            Live Feed
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-56 items-center gap-2 rounded-lg border border-stone-300 bg-white px-2.5">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-xs text-stone-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-stone-300 px-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Filter
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="bg-[#e5e6e9] text-sm text-slate-500">
              <th className="px-4 py-3 font-medium">Booking ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Assigned Worker</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Time</th>
            </tr>
          </thead>

          <tbody>
            {recentBookings.map((b) => (
              <tr
                key={b.id}
                className="border-b border-stone-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-4 py-3.5 text-sm font-medium text-stone-900">
                  {b.bookingId || b.id || "ZGV R4D"}
                </td>

                <td className="px-4 py-3.5 text-sm text-stone-900">
                  <div className="flex items-center gap-2">
                    <Avatar name={b.customer} size={26} />
                    <span>{b.customer}</span>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-sm text-stone-900">
                  {b.service}
                </td>

                <td className="px-4 py-3.5 text-sm text-stone-900">
                  {b.worker}
                </td>

                <td className="px-4 py-3.5 text-sm">
                  <span
                    className={`inline-flex items-center gap-1.5 font-medium ${
                      statusStyles[b.status] || "text-slate-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        b.status === "Pending"
                          ? "bg-red-500"
                          : b.status === "In Progress"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                    />
                    {b.status}
                  </span>
                </td>

                <td className="px-4 py-3.5 text-right text-sm text-stone-900">
                  {b.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>Showing {recentBookings.length} most recent requests</span>
        <span>
          {confirmed} Confirmed · {pending} Awaiting Dispatch
        </span>
      </div>
    </div>
  );
}
