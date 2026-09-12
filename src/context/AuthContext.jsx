import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "rozgaar_auth_session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Confirmed logged-in user
  // { role, userId, password } | null
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

  // Login with Society/Federation ID + Password
  const startSignIn = (role, userId, password) => {
    const newSession = {
      role,
      userId,
      password,
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