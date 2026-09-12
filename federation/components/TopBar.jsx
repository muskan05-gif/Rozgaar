import React from "react";
import { ChevronRight } from "lucide-react";
import { federationInfo } from "../data/mockData";
import Avatar from "../../src/shared/Avatar";
import NotificationsBell from "../../src/shared/NotificationsBell";

const federationNotifications = [
  { id: 1, title: "New society onboarding request", detail: "Ferozepur Multi-Service submitted charter application", time: "20 min ago" },
  { id: 2, title: "Dispute escalated to apex", detail: "FED-DSP-4452 \u2014 Damaged Materials claim", time: "2 hr ago" },
  { id: 3, title: "Payout batch processed", detail: "\u20B98,42,500 settled across 6 societies", time: "5 hr ago" },
];

export default function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-white px-8 py-3">
      <div className="flex items-center gap-1.5 text-sm text-stone-500">
        <span>{federationInfo.name}</span>
        <ChevronRight size={14} className="text-stone-300" />
        <span className="font-medium text-stone-900">Federation Overview</span>
      </div>

      <div className="flex items-center gap-4">
        <NotificationsBell items={federationNotifications} />

        <div className="flex items-center gap-2.5 border-l border-stone-200 pl-4">
          <Avatar name={federationInfo.director.name} size={32} />
          <div className="leading-tight">
            <p className="text-sm font-medium text-stone-900">
              {federationInfo.director.name}
            </p>
            <p className="text-xs text-stone-500">
              {federationInfo.director.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
