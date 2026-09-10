import React from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { useAuth } from "../../src/context/AuthContext";

export default function SignInRoute() {
  const navigate = useNavigate();
  const { startSignIn } = useAuth();

  const handleSendOtp = ({ role, phone }) => {
    // TODO: call your real "send OTP" API here before navigating
    startSignIn(role, `+91 ${phone}`);
    navigate("/verify-otp");
  };

  return <SignIn onSendOtp={handleSendOtp} />;
}
