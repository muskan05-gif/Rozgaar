import React from "react";
import { Wallet } from "lucide-react";
import PlaceholderPage from "../../src/shared/PlaceholderPage";

export default function Payouts() {
  return (
    <PlaceholderPage
      icon={Wallet}
      title="Payouts"
      description="Worker wage disbursements, pending payouts, and payment history for this society will live here."
    />
  );
}
