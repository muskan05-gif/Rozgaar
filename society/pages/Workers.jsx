import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Star,
  Download,
  UserPlus,
  Search,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import Modal from "../../src/shared/Modal";
import ActionMenu from "../../src/shared/ActionMenu";
import { exportToCsv } from "../../src/shared/exportCsv";
import { CheckCircle2 } from "lucide-react";
import {
  workerStats,
  workerCategories,
  workers,
  workerGuildNotice,
} from "../data/workersAndBookings";

const ICONS = { Users, ShieldCheck, ShieldAlert, Star };
const PAGE_SIZE = 10;

const statusStyles = {
  Verified: "bg-brand-50 text-brand-700 border-brand-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function Workers() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Services");
  const [status, setStatus] = useState("All Statuses");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [addSubmitted, setAddSubmitted] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: "", category: "", area: "" });

  const closeAdd = () => {
    setAddOpen(false);
    setAddSubmitted(false);
    setNewWorker({ name: "", category: "", area: "" });
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return workers.filter((w) => {
      const matchesQuery =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.area.toLowerCase().includes(q);
      const matchesCategory = category === "All Services" || w.category === category;
      const matchesStatus = status === "All Statuses" || w.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [query, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearFilters = () => {
    setQuery("");
    setCategory("All Services");
    setStatus("All Statuses");
    setPage(1);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Workers</h1>
          <p className="mt-1 max-w-xl text-sm text-stone-500">
            Manage cooperative guild members, trade verification, and
            deployment status across Kapurthala district.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => exportToCsv("workers-directory", workers)}
            className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Download size={16} />
            Export Directory
          </button>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]"
          >
            <UserPlus size={16} />
            Add Worker
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workerStats.map((stat) => {
          const Icon = ICONS[stat.icon];
          return (
            <div key={stat.key} className="rounded-lg border border-stone-200 bg-white shadow-sm p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {stat.label}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                  <Icon size={14} />
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-stone-900">{stat.value}</p>
              <p className="mt-1 text-xs text-stone-500">{stat.unit}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 p-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <FilterSelect
              value={category}
              onChange={(v) => { setCategory(v); setPage(1); }}
              options={workerCategories}
              prefix="Category:"
            />
            <FilterSelect
              value={status}
              onChange={(v) => { setStatus(v); setPage(1); }}
              options={["All Statuses", "Verified", "Pending"]}
              prefix="Status:"
            />
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-stone-500 hover:text-stone-700"
            >
              Clear filters
            </button>
          </div>

          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search workers by name, skill..."
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
            />
          </div>
        </div>

        <p className="px-5 pt-4 text-xs font-medium uppercase tracking-wide text-stone-400">
          {filtered.length} Total Workers
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Worker</th>
                <th className="px-5 py-3 font-medium">Service Category</th>
                <th className="px-5 py-3 font-medium">Coop Rating</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Job History</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((w) => (
                <tr
                  key={w.id}
                  onClick={() => navigate(`/society/workers/${w.id}`)}
                  className="cursor-pointer border-b border-stone-100 last:border-0 hover:bg-stone-50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={w.name} size={34} />
                      <div>
                        <p className="font-medium text-stone-900">{w.name}</p>
                        <p className="text-xs text-stone-400">
                          ID: {w.id} · {w.area}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{w.category}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-stone-700">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {w.rating.toFixed(1)}
                      <span className="text-xs text-stone-400">({w.reviews})</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[w.status]}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">
                    {w.jobs} Jobs
                    <span className="block text-xs text-stone-400">Joined {w.joined}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <ActionMenu
                      items={[
                        { label: "View Profile", onClick: () => navigate(`/society/workers/${w.id}`) },
                        { label: "Edit Details", onClick: () => alert(`Edit ${w.name} — coming soon`) },
                        { label: "Deactivate Worker", onClick: () => alert(`${w.name} deactivated`) },
                      ]}
                    />
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-stone-400">
                    No workers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 text-sm text-stone-500">
          <span>
            Showing {pageItems.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} workers
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`h-7 w-7 rounded-md text-xs font-medium ${
                  p === page ? "bg-[#141B33] text-white" : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white shadow-sm p-5">
        <div>
          <p className="text-sm font-semibold text-stone-900">{workerGuildNotice.title}</p>
          <p className="mt-0.5 max-w-2xl text-sm text-stone-500">{workerGuildNotice.description}</p>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Review Governance Protocol
          <ArrowRight size={14} />
        </button>
      </div>

      <Modal open={addOpen} onClose={closeAdd} title="Add Worker">
        {addSubmitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={36} className="text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-stone-900">Worker added</p>
            <p className="mt-1 text-sm text-stone-500">
              {newWorker.name} has been added to the pending-verification queue.
            </p>
            <button type="button" onClick={closeAdd} className="mt-4 rounded-md bg-[#141B33] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setAddSubmitted(true); }} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Full Name</label>
              <input
                required
                value={newWorker.name}
                onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Service Category</label>
              <input
                required
                value={newWorker.category}
                onChange={(e) => setNewWorker({ ...newWorker, category: e.target.value })}
                placeholder="e.g. Electrician"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone-400">Area</label>
              <input
                required
                value={newWorker.area}
                onChange={(e) => setNewWorker({ ...newWorker, area: e.target.value })}
                placeholder="e.g. Kapurthala Central"
                className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button type="button" onClick={closeAdd} className="rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
                Cancel
              </button>
              <button type="submit" className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]">
                Add Worker
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}

function FilterSelect({ value, onChange, options, prefix }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {prefix} {opt}
          </option>
        ))}
      </select>
      <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
    </div>
  );
}