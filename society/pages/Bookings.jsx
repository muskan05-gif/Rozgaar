import React from "react";
import { CalendarCheck } from "lucide-react";
import PlaceholderPage from "../../src/shared/PlaceholderPage";

export default function Bookings() {
  return (
    <PlaceholderPage
      icon={CalendarCheck}
      title="Bookings"
      description="The complete booking history and dispatch queue for this society will live here."
    />
  );
}
