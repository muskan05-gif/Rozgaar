import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { useAuth } from "../../src/context/AuthContext";
import { federationLogin, societyLogin } from "../../src/lib/authApi";

export default function SignInRoute() {
  const navigate = useNavigate();
  const { startSignIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async ({ role, societyId, password }) => {
    setError("");
    setIsLoading(true);

    try {
      if (role === "federation") {
        // societyId doubles as the Federation ID field on this form
        const data = await federationLogin(societyId, password);

        // Route tier stays "federation" (matches ProtectedRoute/routes).
        // Backend's raw role ("federation_admin") kept separately.
        startSignIn(role, data.admin_id, data.access_token, data.role);
        navigate("/federation/societies");
      } else {
        const data = await societyLogin(societyId, password);

        // Backend's raw role here is already "society", matching the
        // app's routing tier, but we still pass it through explicitly
        // for consistency with the federation branch above.
        startSignIn(role, data.society_id, data.access_token, data.role);
        navigate("/society");
      }
    } catch (err) {
      setError(err.message || "Sign in failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignIn onSignIn={handleSignIn} isLoading={isLoading} error={error} />
  );
}