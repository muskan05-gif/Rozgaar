import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { useAuth } from "../../src/context/AuthContext";
import { federationLogin } from "../../src/lib/authApi";

export default function SignInRoute() {
  const navigate = useNavigate();
  const { startSignIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async ({ role, societyId, password }) => {
    setError("");

    if (role === "federation") {
      setIsLoading(true);
      try {
        // societyId doubles as the Federation ID field on this form
        const data = await federationLogin(societyId, password);

        // Route tier stays "federation" (matches ProtectedRoute/routes).
        // We also keep the backend's raw role ("federation_admin") on
        // the session in case we need it later for permission checks.
        startSignIn(role, data.admin_id, data.access_token, data.role);
        navigate("/federation/societies");
      } catch (err) {
        setError(err.message || "Sign in failed. Check your credentials.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Society login isn't live on the backend yet, so this stays
    // local-only for now. Swap in societyLogin() from authApi.js
    // once /auth/society/login exists — same pattern as above.
    startSignIn(role, societyId, null);
    navigate("/society");
  };

  return (
    <SignIn onSignIn={handleSignIn} isLoading={isLoading} error={error} />
  );
}