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
  BadgeCheck,
} from "lucide-react";

const societyNavItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/society",
    end: true,
  },
  {
    key: "workers",
    label: "Workers",
    icon: Users,
    path: "/society/workers",
  },
  {
    key: "worker-verification",
    label: "Worker Verification",
    icon: BadgeCheck,
    path: "/society/worker-verification",
  },
  {
    key: "bookings",
    label: "Bookings",
    icon: CalendarCheck,
    path: "/society/bookings",
  },
  {
    key: "disputes",
    label: "Disputes",
    icon: Gavel,
    path: "/society/disputes",
  },
  {
    key: "payouts",
    label: "Payouts",
    icon: Wallet,
    path: "/society/payouts",
  },
  {
    key: "reports",
    label: "Reports",
    icon: FileBarChart,
    path: "/society/reports",
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    path: "/society/settings",
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
            Rozgaar
          </p>

          <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
            Society Portal
          </p>
        </div>
      </div>

      {/* Society Information */}
      <div className="mx-3 mb-3 rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
          Society
        </p>

        <p className="mt-1 text-xs font-semibold text-stone-700">
          Kapurthala Cooperative Society
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {societyNavItems.map((item) => {
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
            Society Portal
          </p>

          <p className="text-[11px] text-stone-400">
            v2.4 Production
          </p>
        </div>
      </div>
    </aside>
  );
}