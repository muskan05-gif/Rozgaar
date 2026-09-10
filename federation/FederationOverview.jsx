import React from "react";
import PageHeader from "./components/PageHeader";
import StatsOverview from "./components/StatsOverview";
import SocietyMap from "./components/SocietyMap";
import SocietyTable from "./components/SocietyTable";
import DisputesPanel from "./components/DisputesPanel";

// Rendered at the "/federation" index route, inside <FederationLayout />.
export default function FederationOverview() {
  return (
    <>
      <PageHeader />
      <StatsOverview />
      <SocietyMap />
      <SocietyTable />
      <DisputesPanel />
    </>
  );
}
