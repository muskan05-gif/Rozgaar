import React from "react";
import { CalendarDays, Plus } from "lucide-react";
import { societyInfo } from "../data/mockData";

export default function PageHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-semibold text-stone-900">
            Overview &amp; Operations
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
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
          className="flex items-center gap-2 rounded-md bg-emerald-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          <Plus size={16} />
          New Dispatch
        </button>
      </div>
    </div>
  );
}
