import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Table2,
  LayoutGrid,
  Plus,
  Info,
  ArrowRight,
  Scale,
  CheckCircle2,
} from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import Modal from "../../src/shared/Modal";
import { bookingColumns, bookingsMeta } from "../data/workersAndBookings";

const badgeStyles = {
  requested: "bg-rose-50 text-rose-700",
  assigned: "bg-sky-50 text-sky-700",
  inProgress: "bg-amber-50 text-amber-700",
  completed: "bg-brand-50 text-brand-700",
  disputed: "bg-rose-100 text-rose-800",
};

const ALL_TAGS = Array.from(
  new Set(bookingColumns.flatMap((c) => c.cards.flatMap((card) => card.tags)))
);

export default function Bookings() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("kanban");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [newSubmitted, setNewSubmitted] = useState(false);
  const [rotationOpen, setRotationOpen] = useState(false);
  const [form, setForm] = useState({ customer: "", service: "", location: "" });

  const matches = (card) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      card.id.toLowerCase().includes(q) ||
      card.customer?.toLowerCase().includes(q) ||
      card.service?.toLowerCase().includes(q) ||
      card.location?.toLowerCase().includes(q);
    const matchesTag = !activeTag || card.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  };

  const filteredColumns = useMemo(() => {
    return bookingColumns.map((col) => ({
      ...col,
      cards: col.cards.filter(matches),
    }));
  }, [query, activeTag]);

  const allFilteredCards = filteredColumns.flatMap((c) => c.cards.map((card) => ({ ...card, stage: c.label })));

  const closeNew = () => {
    setNewOpen(false);
    setNewSubmitted(false);
    setForm({ customer: "", service: "", location: "" });
  };

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search order, customer, service..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            />
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium ${
              filtersOpen ? "border-[#141B33] bg-brand-50 text-brand-800" : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <div className="flex items-center gap-1 rounded-md border border-stone-300 bg-white p-1">
            <button
              type="button"
              onClick={() => setView("table")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                view === "table" ? "bg-[#141B33] text-white" : "text-stone-500 hover:bg-stone-100"
              }`}
            >
              <Table2 size={13} />
              Table
            </button>
            <button
              type="button"
              onClick={() => setView("kanban")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                view === "kanban" ? "bg-[#141B33] text-white" : "text-stone-500 hover:bg-stone-100"
              }`}
            >
              <LayoutGrid size={13} />
              Kanban
            </button>
          </div>
          <button
            type="button"
            onClick={() => setNewOpen(true)}
            className="flex items-center gap-1.5 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]"
          >
            <Plus size={15} />
            New Booking
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-stone-200 bg-white p-3">
          <span className="text-xs font-medium text-stone-500">Filter by service:</span>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              !activeTag ? "bg-[#141B33] text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                activeTag === tag ? "bg-[#141B33] text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-4 py-2.5 text-xs text-brand-800">
        <Info size={14} />
        <span>{bookingsMeta.matchingNote}</span>
        <span className="mx-1 h-1 w-1 rounded-full bg-brand-300" />
        <span>{bookingsMeta.rotationPool}</span>
        <button
          type="button"
          onClick={() => setRotationOpen(true)}
          className="ml-auto flex items-center gap-1 font-medium hover:underline"
        >
          Rotation Log
          <ArrowRight size={12} />
        </button>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 sm:grid-cols-2 lg:grid-cols-5">
          {filteredColumns.map((col) => (
            <div key={col.key} className="flex min-w-[240px] flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <span className={`h-2 w-2 rounded-full ${col.key === "disputed" ? "bg-rose-500" : "bg-stone-300"}`} />
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{col.label}</p>
                <span className="ml-auto rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
                  {col.cards.length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {col.cards.map((card) => (
                  <div key={card.id} className={`rounded-lg border bg-white p-3 ${card.isUrgent ? "border-rose-200" : "border-stone-200"}`}>
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
                        <span key={tag} className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">
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
                      <span className={card.isUrgent ? "font-medium text-rose-600" : "text-stone-400"}>{card.footer}</span>
                    </div>
                  </div>
                ))}
                {col.cards.length === 0 && (
                  <p className="rounded-lg border border-dashed border-stone-200 p-4 text-center text-xs text-stone-400">
                    No matching bookings
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-stone-200 bg-white overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Worker</th>
                <th className="px-5 py-3 font-medium">Stage</th>
                <th className="px-5 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {allFilteredCards.map((card) => (
                <tr key={card.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5 font-medium text-stone-900">{card.id}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.customer}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.tags.join(", ")}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.worker || "\u2014"}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.stage}</td>
                  <td className="px-5 py-3.5 text-right font-medium text-stone-900">{card.amount}</td>
                </tr>
              ))}
              {allFilteredCards.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-stone-400">No bookings match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-5 py-3.5 text-sm">
        <div className="flex flex-wrap items-center gap-4 text-stone-500">
          <span>Today's Total GMV: <span className="font-semibold text-stone-900">{bookingsMeta.todayGmv}</span></span>
          <span>Society Welfare Reserve (3%): <span className="font-semibold text-stone-900">{bookingsMeta.welfareReserve}</span></span>
          <span>Escrow Balance Pledged: <span className="font-semibold text-stone-900">{bookingsMeta.escrowBalance}</span></span>
        </div>
        <span className="flex items-center gap-1.5 font-medium text-brand-700">
          <Scale size={14} />
          Fair Distribution Compliance: {bookingsMeta.fairDistributionCompliance}
        </span>
      </div>

      <Modal open={newOpen} onClose={closeNew} title="New Booking">
        {newSubmitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Booking created</p>
            <p className="mt-1 text-sm text-stone-500">It now appears in the Requested column awaiting dispatch match.</p>
            <button type="button" onClick={closeNew} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Done</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setNewSubmitted(true); }} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Customer Name</label>
              <input required value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Service</label>
              <input required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Location</label>
              <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button type="button" onClick={closeNew} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">Cancel</button>
              <button type="submit" className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Create Booking</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={rotationOpen} onClose={() => setRotationOpen(false)} title="Fair-Distribution Rotation Log">
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between border-b border-stone-100 pb-2">
            <span className="text-stone-600">Vikramjit Singh matched to #8BK-9480</span>
            <span className="text-xs text-stone-400">2 min ago</span>
          </li>
          <li className="flex justify-between border-b border-stone-100 pb-2">
            <span className="text-stone-600">Kuldeep Kaur rotated to top of queue</span>
            <span className="text-xs text-stone-400">18 min ago</span>
          </li>
          <li className="flex justify-between">
            <span className="text-stone-600">Rajesh Kumar completed 36hr cap, paused</span>
            <span className="text-xs text-stone-400">1 hr ago</span>
          </li>
        </ul>
      </Modal>
    </>
  );
}
