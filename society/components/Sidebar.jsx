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
  BadgeCheck,
  TrendingUp,
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
    key: "demand-forecasting",
    label: "Demand Forecasting",
    icon: TrendingUp,
    path: "/society/demand-forecast",
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
];

export default function Sidebar() {
  return (
    <aside
      className="
        fixed
        left-5
        top-[110px]
        z-40
        flex
        w-[58px]
        flex-col
        items-center
        rounded-[30px]
        border
        border-white/70
        bg-white/75
        py-3
        shadow-[0_8px_30px_rgba(30,60,100,0.08)]
        backdrop-blur-md
      "
    >
      {/* Navigation */}
      <nav className="flex flex-col items-center gap-2">
        {societyNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.end}
              title={item.label}
              className={({ isActive }) =>
                `
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-[#141B33] text-white shadow-md"
                    : "text-[#8fa3c2] hover:bg-white hover:text-[#526887]"
                }
                `
              }
            >
              <Icon
                size={19}
                strokeWidth={2}
              />
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="mt-3 border-t border-slate-200/70 pt-3">
        <NavLink
          to="/society/settings"
          title="Settings"
          className={({ isActive }) =>
            `
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            transition-all
            duration-200
            ${
              isActive
                ? "bg-[#141B33] text-white shadow-md"
                : "text-[#8fa3c2] hover:bg-white hover:text-[#526887]"
            }
            `
          }
        >
          <Settings
            size={19}
            strokeWidth={2}
          />
        </NavLink>
      </div>
    </aside>
  );
}