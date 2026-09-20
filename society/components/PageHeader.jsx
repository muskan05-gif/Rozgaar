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
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-stone-900">
          Society Operations
        </p>
        <p className="mt-1 text-xs text-stone-500">
          {societyInfo.district} · Workforce and dispatch administration
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-600 shadow-sm">
          <CalendarDays size={14} className="text-stone-400" />
          {societyInfo.today}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#141B33] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1c2647]"
        >
          <Plus size={15} />
          New Dispatch
        </button>
      </div>

      <Modal open={open} onClose={close} title="New Dispatch">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">
              Dispatch created
            </p>
            <p className="mt-1 text-sm text-stone-500">
              A worker will be matched via the fair-distribution rotation pool shortly.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-4 rounded-lg bg-[#141B33] px-4 py-2 text-sm font-medium text-white"
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
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#141B33]"
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
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#141B33]"
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
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#141B33]"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={close}
                className="rounded-lg border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white"
              >
                Create Dispatch
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
