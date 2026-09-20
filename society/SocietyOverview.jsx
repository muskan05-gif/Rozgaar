import React from "react";
import StatsOverview from "./components/StatsOverview";
import RecentBookings from "./components/RecentBookings";
import WorkerVerifications from "./components/WorkerVerifications";

export default function SocietyOverview() {
  return (
    <div className="space-y-5">
      <StatsOverview />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <RecentBookings />
        <WorkerVerifications />
      </div>
    </div>
  );
}
