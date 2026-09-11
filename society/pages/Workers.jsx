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
import {
  workerStats,
  workerCategories,
  workers,
  workerGuildNotice,
} from "../data/workersAndBookings";

const ICONS = { Users, ShieldCheck, ShieldAlert, Star };
const PAGE_SIZE = 10;

const statusStyles = {
  Verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function Workers() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Services");
  const [status, setStatus] = useState("All Statuses");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      const matchesQuery = w.name.toLowerCase().includes(query.toLowerCase());
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
            className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Download size={16} />
            Export Directory
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-emerald-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-emerald-800"
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
            <div key={stat.key} className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {stat.label}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                  <Icon size={14} />
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-stone-900">{stat.value}</p>
              <p className="mt-1 text-xs text-stone-500">{stat.unit}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-stone-200 bg-white">
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
              className="w-64 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            />
          </div>
        </div>

        <p className="px-5 pt-4 text-xs font-medium uppercase tracking-wide text-stone-400">
          {filtered.length} Total Workers
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-400">
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
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="More actions"
                      className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100"
                    >
                      <MoreVertical size={16} />
                    </button>
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
                  p === page ? "bg-emerald-900 text-white" : "text-stone-600 hover:bg-stone-100"
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

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-5">
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
    </>
  );
}

function FilterSelect({ value, onChange, options, prefix }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
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
