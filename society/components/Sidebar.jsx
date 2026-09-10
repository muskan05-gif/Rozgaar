import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Gavel,
  Wallet,
  FileBarChart,
  Settings,
  Leaf,
  CircleCheck,
} from "lucide-react";
import { navItems } from "../data/mockData";

const ICONS = {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Gavel,
  Wallet,
  FileBarChart,
  Settings,
};

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-stone-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-900">
          <Leaf size={18} className="text-emerald-100" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-stone-900">Rozgaar</p>
          <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
            Society Portal
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {navItems.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <NavLink
              key={item.key}
              to={`/society/${item.path}`}
              end={item.path === ""}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-900 text-white font-medium"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={17}
                    strokeWidth={2}
                    className={isActive ? "text-emerald-100" : "text-stone-400 group-hover:text-stone-600"}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Portal status card */}
      <div className="m-3 flex items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 p-3.5">
        <CircleCheck size={16} className="shrink-0 text-emerald-600" />
        <div className="leading-tight">
          <p className="text-xs font-semibold text-stone-700">Coop Portal</p>
          <p className="text-[11px] text-stone-400">v2.4 Production</p>
        </div>
      </div>
    </aside>
  );
}
