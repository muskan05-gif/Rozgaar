import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { societyLocations, districtOptions } from "../data/mockData";

export default function SocietyMap() {
  const [zone, setZone] = useState(districtOptions[0]);
  const hub = societyLocations[0];

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
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>
        </div>
      </div>

      {/* Map canvas */}
      <div className="relative mt-4 h-80 w-full overflow-hidden rounded-md border border-stone-100 bg-emerald-50/30">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {/* Organic region outline, closer to a real district boundary than a plain ellipse */}
          <path
            d="M14,32 C10,22 22,10 36,12 C46,6 62,8 70,16 C82,14 94,24 92,38 C98,48 92,62 80,66 C78,78 64,88 50,84 C38,92 22,86 18,74 C6,70 4,54 12,44 C6,40 8,34 14,32 Z"
            fill="rgba(6,95,70,0.05)"
            stroke="rgba(6,95,70,0.18)"
            strokeWidth="0.5"
          />
          {/* Connector lines from the hub to each outlying society */}
          {societyLocations.slice(1).map((loc) => (
            <line
              key={loc.id}
              x1={hub.x}
              y1={hub.y}
              x2={loc.x}
              y2={loc.y}
              stroke="rgba(6,95,70,0.18)"
              strokeWidth="0.3"
              strokeDasharray="1.2 1"
            />
          ))}
        </svg>

        {societyLocations.map((loc) => {
          const isHub = loc.id === hub.id;
          return (
            <div
              key={loc.id}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <div className="group relative flex flex-col items-center">
                <MapPin
                  size={isHub ? 28 : 20}
                  strokeWidth={1.75}
                  className={
                    loc.status === "active"
                      ? `fill-emerald-600 text-emerald-800 drop-shadow-sm ${isHub ? "" : ""}`
                      : "fill-amber-400 text-amber-700 drop-shadow-sm"
                  }
                />
                <span
                  className={`pointer-events-none absolute -top-7 whitespace-nowrap rounded px-2 py-1 text-[10px] font-medium text-white transition-opacity ${
                    isHub
                      ? "bg-emerald-900 opacity-100"
                      : "bg-stone-900 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {loc.name}
                  {isHub && " · Federation Hub"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
