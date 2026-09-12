import React, { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Star,
  FileCheck2,
  Eye,
  Landmark,
  Download,
  Search,
} from "lucide-react";
import Avatar from "../../src/shared/Avatar";
import { getWorkerProfile } from "../data/workersAndBookings";

export default function WorkerProfile() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const worker = getWorkerProfile(workerId);
  const [historyQuery, setHistoryQuery] = useState("");

  const filteredHistory = useMemo(() => {
    if (!worker) return [];
    const q = historyQuery.toLowerCase();
    return worker.bookingHistory.filter(
      (b) =>
        !q ||
        b.customer.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
    );
  }, [worker, historyQuery]);

  if (!worker) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="text-sm text-stone-500">
          No worker found for ID "{workerId}".
        </p>
        <button
          type="button"
          onClick={() => navigate("/society/workers")}
          className="mt-3 text-sm font-medium text-brand-700 hover:underline"
        >
          Back to Workers List
        </button>
      </div>
    );
  }

  const earnings = worker.earnings;

  return (
    <>
      <Link
        to="/society/workers"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-700"
      >
        <ArrowLeft size={14} />
        Back to Workers List
      </Link>

      {/* Profile header */}
      <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Avatar name={worker.name} size={72} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-stone-900">{worker.name}</h1>
                <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                  <BadgeCheck size={12} />
                  Verified Gold Member
                </span>
              </div>
              <p className="mt-0.5 text-sm text-stone-500">
                {worker.id} · {worker.area}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {worker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs font-medium text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm text-stone-600">
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  {worker.rating.toFixed(1)} ({worker.reviews} reviews)
                </span>
                <span>{worker.jobs} Jobs Completed</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                <Download size={15} />
                Download Dossier
              </button>
              <button
                type="button"
                className="rounded-md bg-[#141B33] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1c2647]"
              >
                Edit Profile
              </button>
            </div>
            <label className="flex items-center gap-2 text-xs text-stone-500">
              Available for Dispatch
              <span
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  worker.availableForDispatch ? "bg-[#141B33]" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    worker.availableForDispatch ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* KYC documents */}
        <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
          <h2 className="text-base font-semibold text-stone-900">
            KYC &amp; Cooperative Documents
          </h2>
          <p className="mt-0.5 text-sm text-stone-500">
            Statutory identity documents registered under Punjab Coop Act.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {worker.documents.length === 0 ? (
              <p className="text-sm text-stone-400">No documents on file yet.</p>
            ) : (
              worker.documents.map((doc) => (
                <div key={doc.key} className="rounded-md border border-stone-200 p-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-stone-800">
                      <FileCheck2 size={14} className="text-emerald-600" />
                      {doc.label}
                    </span>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">
                      {doc.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-400">{doc.note}</p>
                  <button
                    type="button"
                    className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline"
                  >
                    <Eye size={12} />
                    View Document
                  </button>
                  <p className="mt-1 text-[10px] text-stone-400">Updated {doc.updated}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Earnings summary */}
        <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
          <h2 className="text-base font-semibold text-stone-900">Earnings Summary</h2>

          {earnings ? (
            <>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-stone-400">
                Total Cooperative Earning
              </p>
              <p className="text-2xl font-semibold text-stone-900">
                {earnings.totalCooperativeEarning}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-md bg-stone-50 p-3">
                  <p className="text-xs text-stone-400">This Month</p>
                  <p className="mt-0.5 text-sm font-semibold text-stone-900">{earnings.thisMonth}</p>
                  <p className="text-[10px] text-emerald-600">{earnings.thisMonthChange}</p>
                </div>
                <div className="rounded-md bg-stone-50 p-3">
                  <p className="text-xs text-stone-400">Net Payout</p>
                  <p className="mt-0.5 text-sm font-semibold text-stone-900">{earnings.netPayout}</p>
                </div>
                <div className="rounded-md bg-stone-50 p-3">
                  <p className="text-xs text-stone-400">Pending Payout</p>
                  <p className="mt-0.5 text-sm font-semibold text-stone-900">{earnings.pendingPayout}</p>
                </div>
              </div>

              {/* mini trend line */}
              <div className="mt-4 flex h-16 items-end gap-1.5">
                {earnings.monthlyTrend.map((v, i) => {
                  const max = Math.max(...earnings.monthlyTrend);
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-[#141B33]/70"
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Landmark size={13} />
                  {earnings.bank} · {earnings.payoutMode}
                </span>
                <span>Last Payment: {earnings.lastPayment}</span>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-stone-400">No earnings data on file yet.</p>
          )}
        </div>
      </div>

      {/* Booking history */}
      <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 p-5">
          <div>
            <h2 className="text-base font-semibold text-stone-900">Recent Booking History</h2>
            <p className="mt-0.5 text-sm text-stone-500">
              Dispatched work orders logged across Kapurthala municipal district.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                placeholder="Filter by customer, service"
                className="w-56 rounded-md border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
            >
              <Download size={13} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/60 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Date &amp; Booking ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Rating &amp; Review</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {worker.bookingHistory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-stone-400">
                    No booking history on file yet.
                  </td>
                </tr>
              ) : (
                worker.bookingHistory.map((b) => (
                  <tr key={b.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                    <td className="px-5 py-3.5">
                      <p className="text-stone-900">{b.date}</p>
                      <p className="text-xs text-stone-400">{b.id}</p>
                    </td>
                    <td className="px-5 py-3.5 text-stone-600">{b.customer}</td>
                    <td className="px-5 py-3.5 text-stone-600">{b.service}</td>
                    <td className="px-5 py-3.5 text-stone-600">{b.amount}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 text-stone-700">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        {b.rating.toFixed(1)}
                      </span>
                      <p className="max-w-[220px] truncate text-xs italic text-stone-400">
                        "{b.review}"
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex rounded-full bg-[#141B33] px-2.5 py-0.5 text-xs font-medium text-white">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {worker.bookingHistory.length > 0 && (
          <div className="px-5 py-3.5 text-sm text-stone-500">
            Showing {worker.bookingHistory.length} of {worker.jobs} total bookings
          </div>
        )}
      </div>
    </>
  );
}
