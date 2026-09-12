import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarCheck,
  ScrollText,
  BarChart3,
  Gavel,
  Wallet,
  Settings,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { navItems, federationInfo } from "../data/mockData";

const ICONS = {
  LayoutDashboard,
  Building2,
  Users,
  CalendarCheck,
  ScrollText,
  BarChart3,
  Gavel,
  Wallet,
  Settings,
};

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-full w-60 shrink-0 flex-col self-start overflow-y-auto border-r border-stone-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#141B33]">
          <Leaf className="h-4.5 w-4.5 text-white/80" size={18} />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-stone-900">
            {federationInfo.name}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
            Federation
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
              to={item.path ? `/federation/${item.path}` : "/federation"}
              end={item.path === ""}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[#141B33] text-white font-medium"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={17}
                    strokeWidth={2}
                    className={isActive ? "text-white/80" : "text-stone-400 group-hover:text-stone-600"}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Apex authority card */}
      <div className="m-3 rounded-lg border border-[#141B33]/15 bg-[#141B33]/5 p-3.5">
        <div className="flex items-center gap-2">
          <ShieldCheck size={15} className="text-[#141B33]" />
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#141B33]">
            Apex Authority
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-snug text-[#141B33]">
          {federationInfo.name} holds apex oversight for all member societies
          in {federationInfo.zone}.
        </p>
      </div>
    </aside>
  );
}
