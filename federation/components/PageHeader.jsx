import React, { useState } from "react";
import { Download, FilePlus2, CheckCircle2 } from "lucide-react";
import Modal from "../../src/shared/Modal";
import { exportToCsv } from "../../src/shared/exportCsv";
import { societies } from "../data/mockData";

export default function PageHeader() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ title: "", scope: "All Societies", details: "" });

  const close = () => {
    setOpen(false);
    setSubmitted(false);
    setForm({ title: "", scope: "All Societies", details: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">
          Federation Overview
        </h1>
        <p className="mt-1 max-w-xl text-sm text-stone-500">
          Supervisory oversight, regional performance, and cooperative
          governance across member societies.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => exportToCsv("federation-societies-report", societies)}
          className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
        >
          <Download size={16} />
          Export Reports
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1c2647]"
        >
          <FilePlus2 size={16} />
          New Policy Directive
        </button>
      </div>

      <Modal open={open} onClose={close} title="New Policy Directive">
        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Directive issued</p>
            <p className="mt-1 text-sm text-stone-500">
              All affected societies will be notified and required to acknowledge within 5 business days.
            </p>
            <button type="button" onClick={close} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Directive Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Revised Minimum Wage Floor Q1 2025"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Scope</label>
              <select
                value={form.scope}
                onChange={(e) => setForm({ ...form, scope: e.target.value })}
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              >
                <option>All Societies</option>
                {societies.map((s) => (
                  <option key={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Details</label>
              <textarea
                required
                rows={3}
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                placeholder="Describe the directive and its effective date..."
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button type="button" onClick={close} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
                Cancel
              </button>
              <button type="submit" className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
                Issue Directive
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
