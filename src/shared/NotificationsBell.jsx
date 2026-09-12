import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

// Dropdown notification panel, reused by both TopBars. `items` is optional —
// falls back to sensible generic notifications if not provided.
export default function NotificationsBell({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const notifications = items || [
    { id: 1, title: "New booking request", detail: "Gurpreet Kaur requested Plumbing Repair", time: "5 min ago" },
    { id: 2, title: "KYC document pending", detail: "Vikramjit Singh — Aadhaar verification needed", time: "1 hr ago" },
    { id: 3, title: "Payout released", detail: "\u20B96,450 disbursed to Satnam Singh", time: "3 hr ago" },
  ];

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-full p-2 text-stone-500 hover:bg-stone-100"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {notifications.length > 0 && (
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-lg border border-stone-200 bg-white shadow-lg">
          <div className="border-b border-stone-200 px-4 py-3">
            <p className="text-sm font-semibold text-stone-900">Notifications</p>
          </div>
          <ul className="max-h-80 divide-y divide-stone-100 overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id} className="px-4 py-3 hover:bg-stone-50">
                <p className="text-sm font-medium text-stone-800">{n.title}</p>
                <p className="mt-0.5 text-xs text-stone-500">{n.detail}</p>
                <p className="mt-1 text-[11px] text-stone-400">{n.time}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
