import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import SignInRoute from "../auth/routes/SignInRoute";


import FederationLayout from "../federation/FederationLayout";
import FederationOverview from "../federation/FederationOverview";
import FederationSocieties from "../federation/pages/Societies";
import FederationWorkers from "../federation/pages/Workers";
import FederationPolicyWages from "../federation/pages/PolicyWages";
import FederationAnalytics from "../federation/pages/Analytics";
import FederationDisputes from "../federation/pages/Disputes";
import FederationSettings from "../federation/pages/Settings";

import SocietyLayout from "../society/SocietyLayout";
import SocietyOverview from "../society/SocietyOverview";
import SocietyWorkers from "../society/pages/Workers";
import SocietyBookings from "../society/pages/Bookings";
import SocietyDisputes from "../society/pages/Disputes";
import SocietyPayouts from "../society/pages/Payouts";
import SocietyReports from "../society/pages/Reports";
import SocietySettings from "../society/pages/Settings";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<SignInRoute />} />
      

          <Route
            path="/federation"
            element={
              <ProtectedRoute role="federation">
                <FederationLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<FederationOverview />} />
            <Route path="societies" element={<FederationSocieties />} />
            <Route path="workers" element={<FederationWorkers />} />
            <Route path="policy-wages" element={<FederationPolicyWages />} />
            <Route path="analytics" element={<FederationAnalytics />} />
            <Route path="disputes" element={<FederationDisputes />} />
            <Route path="settings" element={<FederationSettings />} />
          </Route>

          <Route
            path="/society"
            element={
              <ProtectedRoute role="society">
                <SocietyLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SocietyOverview />} />
            <Route path="workers" element={<SocietyWorkers />} />
            <Route path="bookings" element={<SocietyBookings />} />
            <Route path="disputes" element={<SocietyDisputes />} />
            <Route path="payouts" element={<SocietyPayouts />} />
            <Route path="reports" element={<SocietyReports />} />
            <Route path="settings" element={<SocietySettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
