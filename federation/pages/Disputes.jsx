import React from "react";
import { Gavel } from "lucide-react";
import PlaceholderPage from "../../src/shared/PlaceholderPage";

export default function Disputes() {
  return (
    <PlaceholderPage
      icon={Gavel}
      title="Disputes"
      description="The full escalated-dispute queue and arbitration workflow across all societies will live here."
    />
  );
}
