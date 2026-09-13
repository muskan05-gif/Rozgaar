import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Eye,
  Users,
  CalendarCheck,
  Scale,
  Gavel,
  Wallet,
  FileBarChart,
  Settings,
  Leaf,
  CircleCheck,
} from "lucide-react";

const federationNavItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/federation",
    end: true,
  },
  {
    key: "societies",
    label: "Societies",
    icon: Building2,
    path: "/federation/societies",
  },
  {
    key: "society-view",
    label: "Society View",
    icon: Eye,
    path: "/federation/society-view",
  },
 
  {
    key: "bookings",
    label: "Bookings",
    icon: CalendarCheck,
    path: "/federation/bookings",
  },
  {
    key: "policy-wages",
    label: "Policy & Wages",
    icon: Scale,
    path: "/federation/policy-wages",
  },
  {
    key: "disputes",
    label: "Disputes",
    icon: Gavel,
    path: "/federation/disputes",
  },
  {
    key: "payouts",
    label: "Payouts",
    icon: Wallet,
    path: "/federation/payouts",
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: FileBarChart,
    path: "/federation/analytics",
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    path: "/federation/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-full w-60 shrink-0 flex-col self-start overflow-y-auto border-r border-stone-200 bg-white">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#141B33]">
          <Leaf size={18} className="text-white/80" />
        </div>

        <div className="leading-tight">
          <p className="text-sm font-semibold text-stone-900">
            Roopgarh Federation
          </p>

          <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
            Federation
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {federationNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[#141B33] font-medium text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={17}
                    strokeWidth={2}
                    className={
                      isActive
                        ? "text-white/80"
                        : "text-stone-400 group-hover:text-stone-600"
                    }
                  />

                  {item.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Portal Status */}
      <div className="m-3 flex items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 p-3.5">
        <CircleCheck
          size={16}
          className="shrink-0 text-emerald-600"
        />

        <div className="leading-tight">
          <p className="text-xs font-semibold text-stone-700">
            Federation Portal
          </p>

          <p className="text-[11px] text-stone-400">
            v2.4 Production
          </p>
        </div>
      </div>
    </aside>
  );
}