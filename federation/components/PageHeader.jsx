import React from "react";
import { Download, FilePlus2 } from "lucide-react";

export default function PageHeader() {
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
          className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
        >
          <Download size={16} />
          Export Reports
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-emerald-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          <FilePlus2 size={16} />
          New Policy Directive
        </button>
      </div>
    </div>
  );
}
