import React from "react";
import {
  Search,
  SlidersHorizontal,
  Table2,
  LayoutGrid,
  Plus,
  Info,
  ArrowRight,
  Scale,
} from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import { bookingColumns, bookingsMeta } from "../data/workersAndBookings";

const badgeStyles = {
  requested: "bg-rose-50 text-rose-700",
  assigned: "bg-sky-50 text-sky-700",
  inProgress: "bg-amber-50 text-amber-700",
  completed: "bg-emerald-50 text-emerald-700",
  disputed: "bg-rose-100 text-rose-800",
};

export default function Bookings() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold text-stone-900">Bookings</h1>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
              Live Stream
            </span>
          </div>
          <p className="mt-1 max-w-xl text-sm text-stone-500">
            Real-time dispatch &amp; fulfillment tracking across Kapurthala district.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              placeholder="Search order, customer, phone..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <div className="flex items-center gap-1 rounded-md border border-stone-300 bg-white p-1">
            <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-stone-500 hover:bg-stone-100">
              <Table2 size={13} />
              Table
            </button>
            <button type="button" className="flex items-center gap-1 rounded bg-emerald-900 px-2 py-1 text-xs font-medium text-white">
              <LayoutGrid size={13} />
              Kanban
            </button>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md bg-emerald-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            <Plus size={15} />
            New Booking
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-800">
        <Info size={14} />
        <span>{bookingsMeta.matchingNote}</span>
        <span className="mx-1 h-1 w-1 rounded-full bg-emerald-300" />
        <span>{bookingsMeta.rotationPool}</span>
        <button type="button" className="ml-auto flex items-center gap-1 font-medium hover:underline">
          Rotation Log
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 sm:grid-cols-2 lg:grid-cols-5">
        {bookingColumns.map((col) => (
          <div key={col.key} className="flex min-w-[240px] flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  col.key === "disputed" ? "bg-rose-500" : "bg-stone-300"
                }`}
              />
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {col.label}
              </p>
              <span className="ml-auto rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
                {col.cards.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  className={`rounded-lg border bg-white p-3 ${
                    card.isUrgent ? "border-rose-200" : "border-stone-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700">{card.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeStyles[col.key]}`}>
                      {card.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-medium text-stone-900">{card.customer}</p>
                  <p className="text-xs text-stone-400">{card.location}</p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {card.worker && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <Avatar name={card.worker} size={18} />
                      <span className="text-xs text-stone-600">{card.worker}</span>
                    </div>
                  )}

                  <div className="mt-2.5 flex items-center justify-between border-t border-stone-100 pt-2 text-xs">
                    <span className="font-semibold text-stone-900">{card.amount}</span>
                    <span
                      className={
                        card.isUrgent
                          ? "font-medium text-rose-600"
                          : "text-stone-400"
                      }
                    >
                      {card.footer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-5 py-3.5 text-sm">
        <div className="flex flex-wrap items-center gap-4 text-stone-500">
          <span>
            Today's Total GMV:{" "}
            <span className="font-semibold text-stone-900">{bookingsMeta.todayGmv}</span>
          </span>
          <span>
            Society Welfare Reserve (3%):{" "}
            <span className="font-semibold text-stone-900">{bookingsMeta.welfareReserve}</span>
          </span>
          <span>
            Escrow Balance Pledged:{" "}
            <span className="font-semibold text-stone-900">{bookingsMeta.escrowBalance}</span>
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-medium text-emerald-700">
          <Scale size={14} />
          Fair Distribution Compliance: {bookingsMeta.fairDistributionCompliance}
        </span>
      </div>
    </>
  );
}
