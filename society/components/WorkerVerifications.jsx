import React from "react";
import { Check, X, ChevronRight } from "lucide-react";
import { workerVerifications } from "../data/mockData";
import Avatar from "../../src/shared/Avatar";

export default function WorkerVerifications() {
  return (
    <div className="flex flex-col rounded-lg border border-stone-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-200 p-5">
        <h2 className="text-base font-semibold text-stone-900">
          Worker Verifications
        </h2>
        <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
          {workerVerifications.length} Pending
        </span>
      </div>

      <ul className="flex-1 divide-y divide-stone-100">
        {workerVerifications.map((w) => (
          <li key={w.id} className="flex items-start gap-3 p-4">
            <Avatar name={w.name} size={32} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-stone-900">{w.name}</p>
              <p className="text-xs text-stone-400">{w.skill}</p>
              <p className="mt-0.5 truncate text-xs text-stone-500">
                {w.note}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label={`Approve ${w.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100"
              >
                <Check size={14} />
              </button>
              <button
                type="button"
                aria-label={`Reject ${w.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-stone-200 text-stone-400 hover:bg-stone-100"
              >
                <X size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="flex items-center justify-center gap-1 border-t border-stone-200 py-3 text-sm font-medium text-brand-700 hover:bg-stone-50"
      >
        Open Full KYC Queue ({workerVerifications.length})
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
