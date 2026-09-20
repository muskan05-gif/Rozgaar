import React from "react";
import { Users, CalendarCheck, ShieldAlert, Star } from "lucide-react";
import { stats } from "../data/mockData";

const ICONS = { Users, CalendarCheck, ShieldAlert, Star };

export default function StatsOverview() {
  return (
    <section className="rounded-[22px] border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 text-xl font-bold text-stone-900">
        Statistics
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = ICONS[stat.icon];
          const activeCard = index === 0;

          return (
            <div
              key={stat.key}
              className={`min-h-[155px] rounded-[20px] p-4 ${
                activeCard
                  ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                  : "bg-[#f0f0f2] text-stone-900"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`text-[12px] font-bold uppercase tracking-wide ${
                    activeCard ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </span>

                <span
                  className={`hidden h-8 w-8 items-center justify-center rounded-lg ${
                    activeCard
                      ? "bg-white/10 text-white"
                      : "bg-white text-slate-500"
                  }`}
                >
                  <Icon size={15} />
                </span>
              </div>

              {stat.isRating ? (
                <div className="mt-7 flex items-center gap-2">
                  <p
                    className={`text-[42px] font-bold leading-none ${
                      activeCard ? "text-white" : "text-stone-950"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < Math.round(Number(stat.value))
                            ? "fill-amber-400 text-amber-400"
                            : activeCard
                              ? "text-white/30"
                              : "text-stone-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p
                  className={`mt-7 text-[42px] font-bold leading-none ${
                    activeCard ? "text-white" : "text-stone-950"
                  }`}
                >
                  {stat.value}
                </p>
              )}

              <p
                className={`mt-2 text-xs ${
                  activeCard ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {stat.footnote}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
