import React from "react";
import { Building2, Users, Wallet, TrendingUp } from "lucide-react";
import { stats } from "../data/mockData";

const ICONS = { Building2, Users, Wallet, TrendingUp };

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICONS[stat.icon];
        return (
          <div
            key={stat.key}
            className="rounded-lg border border-stone-200 bg-white shadow-sm p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                {stat.label}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <Icon size={14} />
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-stone-900">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-stone-500">{stat.footnote}</p>
          </div>
        );
      })}
    </div>
  );
}
