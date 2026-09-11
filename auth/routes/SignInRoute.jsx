import React from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { useAuth } from "../../src/context/AuthContext";

export default function SignInRoute() {
  const navigate = useNavigate();
  const { startSignIn } = useAuth();

  const handleSignIn = ({ role, societyId, password }) => {
    // Save authenticated session
    startSignIn(role, societyId, password);

    // Navigate according to selected role
    if (role === "society") {
      navigate("/society");
    }if (role === "federation") {
  navigate("/federation/societies");
}
  };

  return <SignIn onSignIn={handleSignIn} />;
}