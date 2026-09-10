import React from "react";
import PageHeader from "./components/PageHeader";
import StatsOverview from "./components/StatsOverview";
import RecentBookings from "./components/RecentBookings";
import WorkerVerifications from "./components/WorkerVerifications";
import WeeklyTrends from "./components/WeeklyTrends";

// Rendered at the "/society" index route, inside <SocietyLayout />.
export default function SocietyOverview() {
  return (
    <>
      <PageHeader />
      <StatsOverview />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentBookings />
        <WorkerVerifications />
      </div>

      <WeeklyTrends />
    </>
  );
}
