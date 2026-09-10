import React from "react";
import { Gavel } from "lucide-react";
import PlaceholderPage from "../../src/shared/PlaceholderPage";

export default function Disputes() {
  return (
    <PlaceholderPage
      icon={Gavel}
      title="Disputes"
      description="Customer and worker disputes raised within this society, before federation escalation, will live here."
    />
  );
}
