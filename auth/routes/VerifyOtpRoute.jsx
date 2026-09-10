import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerifyOtp from "../pages/VerifyOtp";
import { useAuth } from "../../src/context/AuthContext";

export default function VerifyOtpRoute() {
  const navigate = useNavigate();
  const { pending, completeSignIn } = useAuth();

  // No sign-in in progress (e.g. direct link or refresh) — go back to start.
  useEffect(() => {
    if (!pending) navigate("/login", { replace: true });
  }, [pending, navigate]);

  if (!pending) return null;

  const handleVerify = (code) => {
    // TODO: call your real "verify OTP" API with `code` here.
    // Only call completeSignIn() once the API confirms the code is correct.
    completeSignIn();
    navigate(`/${pending.role}`, { replace: true });
  };

  return (
    <VerifyOtp
      phone={pending.phone}
      onBack={() => navigate("/login")}
      onVerify={handleVerify}
      onResend={() => {
        /* TODO: call your real "resend OTP" API here */
      }}
    />
  );
}
