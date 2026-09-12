import React, { useState } from "react";
import { CalendarDays, Plus, CheckCircle2 } from "lucide-react";
import { societyInfo } from "../data/mockData";
import Modal from "../../src/shared/Modal";

export default function PageHeader() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ customer: "", service: "", worker: "" });

  const close = () => {
    setOpen(false);
    setSubmitted(false);
    setForm({ customer: "", service: "", worker: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-semibold text-stone-900">
            Overview &amp; Operations
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Cooperative System Active
          </span>
        </div>
        <p className="mt-1 max-w-xl text-sm text-stone-500">
          Real-time workforce monitoring and dispatch administration for{" "}
          {societyInfo.district}.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-600">
          <CalendarDays size={16} className="text-stone-400" />
          {societyInfo.today}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1c2647]"
        >
          <Plus size={16} />
          New Dispatch
        </button>
      </div>

      <Modal open={open} onClose={close} title="New Dispatch">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Dispatch created</p>
            <p className="mt-1 text-sm text-stone-500">
              A worker will be matched via the fair-distribution rotation pool shortly.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">
                Customer Name
              </label>
              <input
                required
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
                placeholder="e.g. Rajwinder Kaur"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">
                Service Needed
              </label>
              <input
                required
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                placeholder="e.g. Electrical Wiring"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">
                Preferred Worker (optional)
              </label>
              <input
                value={form.worker}
                onChange={(e) => setForm({ ...form, worker: e.target.value })}
                placeholder="Leave blank for auto-match"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button type="button" onClick={close} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
                Cancel
              </button>
              <button type="submit" className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
                Create Dispatch
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
