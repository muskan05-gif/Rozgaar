import React, { useMemo, useState } from "react";
import { Search, ChevronDown, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { societies, districtOptions } from "../data/mockData";

const PAGE_SIZE = 6;

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function SocietyTable() {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("All Districts");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return societies.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      const matchesDistrict =
        district === "All Districts" || s.district === district;
      return matchesQuery && matchesDistrict;
    });
  }, [query, district]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="rounded-lg border border-stone-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 p-5">
        <div>
          <h2 className="text-base font-semibold text-stone-900">
            Society Performance
          </h2>
          <p className="mt-0.5 text-sm text-stone-500">
            Key operating metrics and reported status by cooperative unit.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search society..."
              className="w-48 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            />
          </div>

          <div className="relative">
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setPage(1);
              }}
              className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            >
              <option>All Districts</option>
              {districtOptions.slice(1).map((d) => (
                <option key={d} value={d.replace(" District", "")}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-400">
              <th className="px-5 py-3 font-medium">Society Name</th>
              <th className="px-5 py-3 font-medium">Workers</th>
              <th className="px-5 py-3 font-medium">Disbursed</th>
              <th className="px-5 py-3 font-medium">Rating</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((s) => (
              <tr
                key={s.id}
                className="border-b border-stone-100 last:border-0 hover:bg-stone-50"
              >
                <td className="px-5 py-3.5">
                  <p className="font-medium text-stone-900">{s.name}</p>
                  <p className="text-xs text-stone-400">
                    {s.district} · {s.id}
                  </p>
                </td>
                <td className="px-5 py-3.5 text-stone-600">
                  {s.workers} {s.workersStatus}
                </td>
                <td className="px-5 py-3.5 text-stone-600">{s.disbursed}</td>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-1 text-stone-700">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    {s.rating.toFixed(1)}
                    <span className="text-xs text-stone-400">
                      ({s.reviews})
                    </span>
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    type="button"
                    className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-stone-400">
                  No societies match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3.5 text-sm text-stone-500">
        <span>
          Showing {pageItems.length} of {filtered.length} societies
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
                p === page
                  ? "bg-emerald-900 text-white"
                  : "text-stone-600 hover:bg-stone-100"
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
  );
}
