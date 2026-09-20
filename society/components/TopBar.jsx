import React from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { societyInfo } from "../data/mockData";
import Avatar from "../../src/shared/Avatar";
import NotificationsBell from "../../src/shared/NotificationsBell";

export default function TopBar() {
  return (
    <header className="flex min-h-[92px] items-center justify-between gap-4 px-6 py-5 lg:px-8">
      
      {/* Society Information */}
      <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-stone-200 bg-white px-4 py-2 shadow-sm">
        <MapPin
          size={19}
          className="shrink-0 text-blue-700"
        />

        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-bold text-stone-900">
            {societyInfo.name}
          </p>

          <p className="truncate text-xs text-stone-500">
            {societyInfo.location} · Society ID:{" "}
            {societyInfo.societyId}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex shrink-0 items-center gap-4">
        
        {/* Notifications */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm">
          <NotificationsBell />
        </div>

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-stone-200 bg-white px-2.5 py-2 shadow-sm transition-colors hover:bg-stone-50"
        >
          <Avatar
            name={societyInfo.admin.name}
            size={34}
          />

          <div className="hidden text-left leading-tight sm:block">
            <p className="text-sm font-bold text-stone-900">
              {societyInfo.admin.name}
            </p>

            <p className="text-xs text-stone-500">
              {societyInfo.admin.role}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="mr-1 text-stone-700"
          />
        </button>
      </div>
    </header>
  );
}