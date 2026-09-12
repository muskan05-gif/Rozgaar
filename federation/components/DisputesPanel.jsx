import React from "react";
import Avatar from "../../src/shared/Avatar";
import { disputes } from "../data/mockData";

const priorityStyles = {
  High: "bg-rose-50 text-rose-700 border-rose-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-stone-100 text-stone-600 border-stone-200",
};

export default function DisputesPanel() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white shadow-sm p-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <h2 className="text-base font-semibold text-stone-900">
          Escalated Disputes
        </h2>
        <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
          {disputes.length} Awaiting Federation Arbitration
        </span>
      </div>
      <p className="mt-0.5 text-sm text-stone-500">
        Disputes escalated past cooperative-level wage mediation and policy
        enforcement.
      </p>

      <ul className="mt-4 divide-y divide-stone-100">
        {disputes.map((d) => (
          <li
            key={d.id}
            className="flex flex-wrap items-center justify-between gap-3 py-3.5"
          >
            <div className="flex items-start gap-3">
              <Avatar name={d.worker} size={32} />
              <div>
                <p className="text-sm font-medium text-stone-900">
                  Worker: {d.worker}{" "}
                  <span className="font-normal text-stone-400">
                    ({d.role} · {d.society})
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-stone-500">
                  Customer: {d.customer} · {d.reference}
                </p>
                <p className="mt-1 text-sm text-stone-600">{d.issue}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityStyles[d.priority]}`}
              >
                {d.priority} Priority
              </span>
              <button
                type="button"
                className="rounded-md bg-[#141B33] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#1c2647]"
              >
                Review
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
