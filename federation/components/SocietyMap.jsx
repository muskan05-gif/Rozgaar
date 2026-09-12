import React, { useMemo, useState } from "react";
import { ChevronDown, Compass } from "lucide-react";
import { societyLocations, districtOptions } from "../data/mockData";

export default function SocietyMap() {
  const [zone, setZone] = useState(districtOptions[0]);

  const visibleLocations = useMemo(() => {
    if (zone === "Punjab North Zone") return societyLocations;
    return societyLocations.filter((loc) => loc.district === zone);
  }, [zone]);

  const hub = visibleLocations[0] || societyLocations[0];

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
              <span className="h-2 w-2 rounded-full bg-brand-900" />
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
              className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
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
      <div className="relative mt-4 h-96 w-full overflow-hidden rounded-md border border-stone-200 bg-gradient-to-br from-brand-50/70 via-stone-50 to-brand-50/30">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(20,27,51,0.07)" strokeWidth="0.15" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          <path
            d="M8,30 C4,18 18,6 34,10 C46,2 64,4 74,14 C88,10 98,22 94,36 C100,46 94,62 80,64 C80,78 62,90 46,84 C34,94 16,86 12,72 C0,68 -2,50 8,42 C2,38 4,32 8,30 Z"
            fill="rgba(20,27,51,0.04)"
            stroke="rgba(20,27,51,0.2)"
            strokeWidth="0.45"
          />
          <path
            d="M30,20 C46,14 62,18 70,28 C78,26 84,38 78,46 C80,58 68,68 56,64 C48,72 34,70 30,60 C18,58 16,44 26,38 C20,32 24,24 30,20 Z"
            fill="rgba(20,27,51,0.05)"
            stroke="rgba(20,27,51,0.1)"
            strokeWidth="0.3"
          />

          {hub && visibleLocations.slice(1).map((loc) => (
            <line
              key={loc.id}
              x1={hub.x}
              y1={hub.y}
              x2={loc.x}
              y2={loc.y}
              stroke="rgba(20,27,51,0.25)"
              strokeWidth="0.35"
              strokeDasharray="1.4 1.2"
            />
          ))}
        </svg>

        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-500 shadow-sm">
          <Compass size={16} />
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-white/90 px-2 py-1 text-[10px] text-stone-500 shadow-sm">
          <span className="h-[2px] w-6 bg-stone-400" />
          25 km
        </div>

        {visibleLocations.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-stone-400">
            No societies registered in this district yet.
          </div>
        )}

        {visibleLocations.map((loc) => {
          const isHub = hub && loc.id === hub.id;
          return (
            <div
              key={loc.id}
              className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <div className="flex flex-col items-center">
                <span
                  className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium shadow-sm ${
                    isHub
                      ? "bg-brand-900 text-white"
                      : "border border-stone-200 bg-white text-stone-600"
                  }`}
                >
                  {loc.name}
                </span>
                <span
                  className={`mt-0.5 block rounded-full border-2 border-white shadow ${
                    loc.status === "active" ? "bg-brand-900" : "bg-amber-500"
                  }`}
                  style={{ width: isHub ? 14 : 9, height: isHub ? 14 : 9 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
