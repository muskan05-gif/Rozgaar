import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import PlaceholderPage from "../../src/shared/PlaceholderPage";

export default function Settings() {
  return (
    <PlaceholderPage
      icon={SettingsIcon}
      title="Settings"
      description="Federation profile, admin roles, and notification preferences will live here."
    />
  );
}
