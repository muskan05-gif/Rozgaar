import React from "react";
import { Check, X, List } from "lucide-react";
import { workerVerifications } from "../data/mockData";
import Avatar from "../../src/shared/Avatar";

export default function WorkerVerifications() {
  return (
    <div className="flex min-w-0 flex-col rounded-[22px] border border-stone-200 bg-white p-4 shadow-sm sm:p-5 xl:col-span-1">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-900">
          Worker Verification
        </h2>
      </div>

      <div className="mt-5 space-y-5">
        {workerVerifications.map((w) => (
          <div key={w.id} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <Avatar name={w.name} size={30} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-stone-900">
                {w.name}
              </p>
              <p className="text-xs text-slate-500">
                {w.skill}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label={`Approve ${w.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              >
                <Check size={16} />
              </button>

              <button
                type="button"
                aria-label={`Reject ${w.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-red-50 hover:text-red-600"
              >
                <X size={15} />
              </button>

              <button
                type="button"
                aria-label={`View ${w.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-slate-50"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
