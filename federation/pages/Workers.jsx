import React from "react";
import { Users } from "lucide-react";
import PlaceholderPage from "../../src/shared/PlaceholderPage";

export default function Workers() {
  return (
    <PlaceholderPage
      icon={Users}
      title="Workers"
      description="Federation-wide worker directory, verification status, and cross-society mobility will live here."
    />
  );
}
