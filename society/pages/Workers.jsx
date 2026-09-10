import React from "react";
import { Users } from "lucide-react";
import PlaceholderPage from "../../src/shared/PlaceholderPage";

export default function Workers() {
  return (
    <PlaceholderPage
      icon={Users}
      title="Workers"
      description="Full worker roster for this society — skills, availability, and job history will live here."
    />
  );
}
