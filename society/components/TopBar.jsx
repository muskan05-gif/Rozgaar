import React from "react";
import { Bell } from "lucide-react";
import { societyInfo } from "../data/mockData";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-white px-8 py-3">
      <div>
        <p className="text-sm font-semibold text-stone-900">
          {societyInfo.name}
        </p>
        <p className="text-xs text-stone-500">
          {societyInfo.location} · Society ID: {societyInfo.societyId}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-full p-2 text-stone-500 hover:bg-stone-100"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        </button>

        <div className="flex items-center gap-2.5 border-l border-stone-200 pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-xs font-semibold text-white">
            {societyInfo.admin.initials}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-stone-900">
              {societyInfo.admin.name}
            </p>
            <p className="text-xs text-stone-500">{societyInfo.admin.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
