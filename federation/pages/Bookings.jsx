import React from "react";
import { LayoutGrid, Table2, Download, PlusCircle, ShieldCheck, ScrollText, Phone } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import { bookingsBanner, federationBookingColumns, bookingsFooter } from "../data/federationExtras";

const urgencyStyles = {
  "High Urgency": "bg-rose-50 text-rose-700",
  "Scheduled (Eve)": "bg-sky-50 text-sky-700",
  "Next-Day Slot": "bg-stone-100 text-stone-600",
};

export default function Bookings() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-800">
        <ShieldCheck size={14} />
        <span className="font-medium">{bookingsBanner.title}</span>
        <span className="mx-1 h-1 w-1 rounded-full bg-emerald-300" />
        <span>{bookingsBanner.note}</span>
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-emerald-700">
          {bookingsBanner.compliance}
        </span>
        <button type="button" className="flex items-center gap-1 font-medium hover:underline">
          <ScrollText size={12} />
          {bookingsBanner.auditLog}
        </button>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Bookings Management</h1>
          <p className="mt-1 max-w-xl text-sm text-stone-500">
            Central registry dispatch terminal across all federated societies
            in Punjab North Zone.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 rounded-md border border-stone-300 bg-white p-1">
            <button type="button" className="flex items-center gap-1 rounded bg-emerald-900 px-2 py-1 text-xs font-medium text-white">
              <LayoutGrid size={13} />
              Kanban
            </button>
            <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-stone-500 hover:bg-stone-100">
              <Table2 size={13} />
              Table
            </button>
          </div>
          <button type="button" className="flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50">
            <Download size={15} />
            Export Roster
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-md bg-emerald-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-800">
            <PlusCircle size={16} />
            Manual Work Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 sm:grid-cols-2 lg:grid-cols-4">
        {federationBookingColumns.map((col) => (
          <div key={col.key} className="flex min-w-[240px] flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{col.label}</p>
              <span className="ml-auto rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
                {col.cards.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {col.cards.map((card) => (
                <div key={card.id} className={`rounded-lg border bg-white p-3 ${card.active ? "border-emerald-200" : "border-stone-200"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700">{card.id}</span>
                    {card.urgency && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${urgencyStyles[card.urgency]}`}>
                        {card.urgency}
                      </span>
                    )}
                    {card.badge && (
                      <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        card.active ? "bg-rose-50 text-rose-700" : "bg-sky-50 text-sky-700"
                      }`}>
                        {card.active && <Phone size={9} />}
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-medium text-stone-900">{card.service}</p>
                  <p className="text-xs text-stone-400">{card.location}</p>
                  <p className="mt-1 text-[11px] font-medium text-emerald-700">{card.society}</p>

                  {card.customer && (
                    <p className="mt-1.5 text-xs text-stone-500">Customer: {card.customer}</p>
                  )}

                  {card.worker && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Avatar name={card.worker} size={18} />
                      <span className="text-xs text-stone-600">{card.worker}</span>
                    </div>
                  )}

                  <div className="mt-2.5 flex items-center justify-between border-t border-stone-100 pt-2 text-xs text-stone-400">
                    <span>
                      {card.estWage || card.escrow || ""}
                    </span>
                    <span>{card.posted || card.slot || card.started || card.finished || ""}</span>
                  </div>
                  {card.milestone && (
                    <p className="mt-1 text-[10px] font-medium text-emerald-700">{card.milestone}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-5 py-3.5 text-xs text-stone-500">
        <span>
          Escrow Balance in Protection:{" "}
          <span className="font-semibold text-stone-900">{bookingsFooter.escrowProtected}</span>
        </span>
        <span>Fair-rotation dispatch cycle refreshed {bookingsFooter.rotationRefreshed}</span>
        <span className="font-medium text-rose-600">
          Emergency Dispatch Hotline: {bookingsFooter.emergencyHotline}
        </span>
      </div>
    </>
  );
}
