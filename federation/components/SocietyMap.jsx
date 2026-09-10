import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { societyLocations, districtOptions } from "../data/mockData";

export default function SocietyMap() {
  const [zone, setZone] = useState(districtOptions[0]);

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-stone-900">
            Society Locations
          </h2>
          <p className="mt-0.5 text-sm text-stone-500">
            Geographic distribution of registered cooperative societies
            across North Punjab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Active society
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Onboarding
            </span>
          </div>

          <div className="relative">
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
            >
              {districtOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
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

      {/* Map canvas */}
      <div className="relative mt-4 h-72 w-full overflow-hidden rounded-md border border-stone-100 bg-emerald-50/40">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M20,20 Q50,5 80,18 Q95,45 82,72 Q60,95 30,85 Q5,65 12,35 Z"
            fill="rgba(6,95,70,0.06)"
            stroke="rgba(6,95,70,0.15)"
            strokeWidth="0.4"
          />
        </svg>

        {societyLocations.map((loc) => (
          <div
            key={loc.id}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            <div className="group relative flex flex-col items-center">
              <MapPin
                size={22}
                strokeWidth={1.75}
                className={
                  loc.status === "active"
                    ? "fill-emerald-600 text-emerald-800 drop-shadow-sm"
                    : "fill-amber-400 text-amber-700 drop-shadow-sm"
                }
              />
              <span className="pointer-events-none absolute -top-7 whitespace-nowrap rounded bg-stone-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {loc.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
