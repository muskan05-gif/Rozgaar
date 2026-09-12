import React, { useMemo, useState } from "react";
import { LayoutGrid, Table2, Download, PlusCircle, ShieldCheck, ScrollText, Phone, Search, CheckCircle2 } from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import Modal from "../../src/shared/Modal";
import { exportToCsv } from "../../src/shared/exportCsv";
import { bookingsBanner, federationBookingColumns, bookingsFooter } from "../data/federationExtras";

const urgencyStyles = {
  "High Urgency": "bg-rose-50 text-rose-700",
  "Scheduled (Eve)": "bg-sky-50 text-sky-700",
  "Next-Day Slot": "bg-stone-100 text-stone-600",
};

export default function Bookings() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("kanban");
  const [auditOpen, setAuditOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [form, setForm] = useState({ society: "", customer: "", service: "" });

  const matches = (card) => {
    const q = query.toLowerCase();
    return (
      !q ||
      card.id.toLowerCase().includes(q) ||
      card.customer?.toLowerCase().includes(q) ||
      card.service?.toLowerCase().includes(q) ||
      card.society?.toLowerCase().includes(q)
    );
  };

  const filteredColumns = useMemo(() => {
    return federationBookingColumns.map((col) => ({ ...col, cards: col.cards.filter(matches) }));
  }, [query]);

  const allFilteredCards = filteredColumns.flatMap((c) => c.cards.map((card) => ({ ...card, stage: c.label })));

  const closeOrder = () => {
    setOrderOpen(false);
    setOrderSubmitted(false);
    setForm({ society: "", customer: "", service: "" });
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-4 py-2.5 text-xs text-brand-800">
        <ShieldCheck size={14} />
        <span className="font-medium">{bookingsBanner.title}</span>
        <span className="mx-1 h-1 w-1 rounded-full bg-brand-300" />
        <span>{bookingsBanner.note}</span>
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-brand-700">
          {bookingsBanner.compliance}
        </span>
        <button type="button" onClick={() => setAuditOpen(true)} className="flex items-center gap-1 font-medium hover:underline">
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
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search booking, customer, society..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            />
          </div>
          <div className="flex items-center gap-1 rounded-md border border-stone-300 bg-white p-1">
            <button
              type="button"
              onClick={() => setView("kanban")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${view === "kanban" ? "bg-[#141B33] text-white" : "text-stone-500 hover:bg-stone-100"}`}
            >
              <LayoutGrid size={13} />
              Kanban
            </button>
            <button
              type="button"
              onClick={() => setView("table")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${view === "table" ? "bg-[#141B33] text-white" : "text-stone-500 hover:bg-stone-100"}`}
            >
              <Table2 size={13} />
              Table
            </button>
          </div>
          <button
            type="button"
            onClick={() => exportToCsv("federation-bookings-roster", allFilteredCards.map(({ stage, id, society, customer, service, worker, amount }) => ({ id, society, customer, service, worker: worker || "", amount: amount || "", stage })))}
            className="flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Download size={15} />
            Export Roster
          </button>
          <button type="button" onClick={() => setOrderOpen(true)} className="flex items-center gap-1.5 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
            <PlusCircle size={16} />
            Manual Work Order
          </button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 sm:grid-cols-2 lg:grid-cols-4">
          {filteredColumns.map((col) => (
            <div key={col.key} className="flex min-w-[240px] flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{col.label}</p>
                <span className="ml-auto rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
                  {col.cards.length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {col.cards.map((card) => (
                  <div key={card.id} className={`rounded-lg border bg-white p-3 ${card.active ? "border-brand-200" : "border-stone-200"}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-700">{card.id}</span>
                      {card.urgency && (
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${urgencyStyles[card.urgency]}`}>
                          {card.urgency}
                        </span>
                      )}
                      {card.badge && (
                        <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${card.active ? "bg-rose-50 text-rose-700" : "bg-sky-50 text-sky-700"}`}>
                          {card.active && <Phone size={9} />}
                          {card.badge}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm font-medium text-stone-900">{card.service}</p>
                    <p className="text-xs text-stone-400">{card.location}</p>
                    <p className="mt-1 text-[11px] font-medium text-brand-700">{card.society}</p>

                    {card.customer && <p className="mt-1.5 text-xs text-stone-500">Customer: {card.customer}</p>}

                    {card.worker && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <Avatar name={card.worker} size={18} />
                        <span className="text-xs text-stone-600">{card.worker}</span>
                      </div>
                    )}

                    <div className="mt-2.5 flex items-center justify-between border-t border-stone-100 pt-2 text-xs text-stone-400">
                      <span>{card.estWage || card.escrow || ""}</span>
                      <span>{card.posted || card.slot || card.started || card.finished || ""}</span>
                    </div>
                    {card.milestone && <p className="mt-1 text-[10px] font-medium text-brand-700">{card.milestone}</p>}
                  </div>
                ))}
                {col.cards.length === 0 && (
                  <p className="rounded-lg border border-dashed border-stone-200 p-4 text-center text-xs text-stone-400">No matching bookings</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Booking ID</th>
                <th className="px-5 py-3 font-medium">Society</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Worker</th>
                <th className="px-5 py-3 font-medium text-right">Stage</th>
              </tr>
            </thead>
            <tbody>
              {allFilteredCards.map((card) => (
                <tr key={card.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3.5 font-medium text-stone-900">{card.id}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.society}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.customer}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.service}</td>
                  <td className="px-5 py-3.5 text-stone-600">{card.worker || "\u2014"}</td>
                  <td className="px-5 py-3.5 text-right text-stone-600">{card.stage}</td>
                </tr>
              ))}
              {allFilteredCards.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-sm text-stone-400">No bookings match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-5 py-3.5 text-xs text-stone-500">
        <span>Escrow Balance in Protection: <span className="font-semibold text-stone-900">{bookingsFooter.escrowProtected}</span></span>
        <span>Fair-rotation dispatch cycle refreshed {bookingsFooter.rotationRefreshed}</span>
        <span className="font-medium text-rose-600">Emergency Dispatch Hotline: {bookingsFooter.emergencyHotline}</span>
      </div>

      <Modal open={auditOpen} onClose={() => setAuditOpen(false)} title="Dispatch Audit Log">
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between border-b border-stone-100 pb-2"><span className="text-stone-600">#123-9902 matched to Mohd. Imran (Rohini Sector 7)</span><span className="text-xs text-stone-400">4 min ago</span></li>
          <li className="flex justify-between border-b border-stone-100 pb-2"><span className="text-stone-600">#123-9877 escalated to SOS check</span><span className="text-xs text-stone-400">1 hr ago</span></li>
          <li className="flex justify-between"><span className="text-stone-600">#123-9801 audited & closed</span><span className="text-xs text-stone-400">3 hr ago</span></li>
        </ul>
      </Modal>

      <Modal open={orderOpen} onClose={closeOrder} title="Manual Work Order">
        {orderSubmitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Work order created</p>
            <p className="mt-1 text-sm text-stone-500">It has been added to the Requested queue for {form.society || "the selected society"}.</p>
            <button type="button" onClick={closeOrder} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Done</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setOrderSubmitted(true); }} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Society</label>
              <input required value={form.society} onChange={(e) => setForm({ ...form, society: e.target.value })} placeholder="e.g. Rohini Sector 7" className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Customer</label>
              <input required value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Service Needed</label>
              <input required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15" />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button type="button" onClick={closeOrder} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">Cancel</button>
              <button type="submit" className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">Create Work Order</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
