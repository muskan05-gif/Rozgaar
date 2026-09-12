import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "rozgaar_auth_session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Confirmed logged-in user
  // { role, userId, token, backendRole } | null
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  // Call this after the backend confirms login. `token` is the JWT
  // access_token — we store that, never the raw password. `role` is
  // the app's routing tier ("society" | "federation"); `backendRole`
  // is the exact string the API returned (e.g. "federation_admin"),
  // kept around for later if we ever need it for permission checks.
  const startSignIn = (role, userId, token, backendRole = role) => {
    const newSession = {
      role,
      userId,
      token,
      backendRole,
    };

    setSession(newSession);

    return newSession;
  };

  const logout = () => {
    setSession(null);
  };

  const value = {
    session,
    isAuthenticated: Boolean(session),

    startSignIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return ctx;
}