import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "rozgaar_auth_session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // `session` = the confirmed, logged-in user: { role, phone } | null
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // `pending` = an in-progress sign-in that hasn't passed OTP yet.
  // Lives in memory only (not persisted) — a page refresh mid-OTP
  // should send the user back to the phone-entry step.
  const [pending, setPending] = useState(null); // { role, phone } | null

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  const startSignIn = (role, phone) => {
    setPending({ role, phone });
  };

  const completeSignIn = () => {
    if (!pending) return;
    setSession(pending);
    setPending(null);
  };

  const logout = () => {
    setSession(null);
    setPending(null);
  };

  const value = {
    session,
    isAuthenticated: Boolean(session),
    pending,
    startSignIn,
    completeSignIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
