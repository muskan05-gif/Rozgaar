import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap a layout route with this to require sign-in, optionally locked
// to one admin role: <ProtectedRoute role="federation"><FederationLayout /></ProtectedRoute>
export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, session } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && session.role !== role) {
    // Signed in, but as the wrong admin tier — send them to their own area.
    return <Navigate to={`/${session.role}`} replace />;
  }

  return children;
}
