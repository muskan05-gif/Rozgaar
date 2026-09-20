import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import SignInRoute from "../auth/routes/SignInRoute";

// =========================
// Federation
// =========================

import FederationLayout from "../federation/FederationLayout";
import FederationOverview from "../federation/FederationOverview";
import FederationSocieties from "../federation/pages/Societies";
import FederationSocietyView from "../federation/pages/SocietyView";
import FederationBookings from "../federation/pages/Bookings";
import FederationPolicyWages from "../federation/pages/PolicyWages";
import FederationAnalytics from "../federation/pages/Analytics";
import FederationDisputes from "../federation/pages/Disputes";
import FederationPayouts from "../federation/pages/Payouts";
import FederationSettings from "../federation/pages/Settings";

// =========================
// Society
// =========================

import SocietyLayout from "../society/SocietyLayout";
import SocietyOverview from "../society/SocietyOverview";
import SocietyWorkers from "../society/pages/Workers";
import SocietyWorkerProfile from "../society/pages/WorkerProfile";
import SocietyBookings from "../society/pages/Bookings";
import SocietyDisputes from "../society/pages/Disputes";
import SocietyPayouts from "../society/pages/Payouts";
import SocietyReports from "../society/pages/Reports";
import SocietySettings from "../society/pages/Settings";
import WorkerVerification from "../society/pages/WorkerVerification";
import SocietyDemandForecast from "../society/pages/SocietyDemandForecast";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* =========================
              LOGIN
          ========================= */}

          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route
            path="/login"
            element={<SignInRoute />}
          />

          {/* =========================
              FEDERATION PORTAL
          ========================= */}

          <Route
            path="/federation"
            element={
              <ProtectedRoute role="federation">
                <FederationLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route
              index
              element={<FederationOverview />}
            />

            {/* Societies */}
            <Route
              path="societies"
              element={<FederationSocieties />}
            />

            {/* Society View */}
            <Route
              path="society-view"
              element={<FederationSocietyView />}
            />

            {/* Bookings */}
            <Route
              path="bookings"
              element={<FederationBookings />}
            />

            {/* Policy & Wages */}
            <Route
              path="policy-wages"
              element={<FederationPolicyWages />}
            />

            {/* Analytics */}
            <Route
              path="analytics"
              element={<FederationAnalytics />}
            />

            {/* Disputes */}
            <Route
              path="disputes"
              element={<FederationDisputes />}
            />

            {/* Payouts */}
            <Route
              path="payouts"
              element={<FederationPayouts />}
            />

            {/* Settings */}
            <Route
              path="settings"
              element={<FederationSettings />}
            />
          </Route>

          {/* =========================
              SOCIETY PORTAL
          ========================= */}

          <Route
            path="/society"
            element={
              <ProtectedRoute role="society">
                <SocietyLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route
              index
              element={<SocietyOverview />}
            />

            {/* Workers */}
            <Route
              path="workers"
              element={<SocietyWorkers />}
            />

            {/* Worker Profile */}
            <Route
              path="workers/:workerId"
              element={<SocietyWorkerProfile />}
            />

            {/* Worker Verification */}
            <Route
              path="worker-verification"
              element={<WorkerVerification />}
            />

            {/* Bookings */}
            <Route
              path="bookings"
              element={<SocietyBookings />}
            />

            {/* Disputes */}
            <Route
              path="disputes"
              element={<SocietyDisputes />}
            />

            {/* Payouts */}
            <Route
              path="payouts"
              element={<SocietyPayouts />}
            />

            {/* Reports */}
            <Route
              path="reports"
              element={<SocietyReports />}
            />

            {/* Settings */}
            <Route
              path="settings"
              element={<SocietySettings />}
            />
{/* Demand Forecast */}
 <Route
  path="demand-forecast"
  element={<SocietyDemandForecast />}
/>
          </Route>

          {/* =========================
              UNKNOWN ROUTES
          ========================= */}

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}