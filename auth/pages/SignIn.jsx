import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoleToggle from "../components/RoleToggle";
import { footerInfo } from "../data/authContent";

export default function SignIn({ onSignIn, isLoading = false, error = "" }) {
  const navigate = useNavigate();

  const [role, setRole] = useState("society");
  const [societyId, setSocietyId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!societyId.trim() || !password.trim()) return;

    onSignIn?.({
      role,
      societyId,
      password,
    });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">

        {/* Left Illustration */}
        <div className="relative hidden min-h-screen w-[46%] overflow-hidden rounded-r-[22px] bg-[#F7F7F3] lg:block">
          <img
            src="/images/rozgaar-workers.png"
            alt="Rozgaar skilled workers"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>

        {/* Right Login Panel */}
        <div className="flex min-h-screen flex-1 flex-col bg-white">

          {/* Rozgaar Logo */}
          <div className="flex h-[110px] items-center justify-end overflow-hidden px-8 sm:px-12 lg:px-16">
            <img
              src="/logo.png"
              alt="Rozgaar"
              className="h-[180px] w-[180px] object-contain"
            />
          </div>

          {/* Login Form */}
          <div className="flex flex-1 items-center justify-center px-6 pb-10 sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[395px]"
            >

              {/* Heading */}
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
                  SIGN IN
                </h1>

                <p className="mt-1 text-sm text-stone-400">
                  Please sign in to your account
                </p>
              </div>

              {/* Society / Federation */}
              <div className="mt-8">
                <RoleToggle
                  value={role}
                  onChange={setRole}
                />
              </div>

              {/* Society / Federation ID */}
              <div className="mt-8">
                <label
                  htmlFor="societyId"
                  className="mb-1.5 block text-sm font-medium text-stone-500"
                >
                  {role === "society"
                    ? "Society ID"
                    : "Federation ID"}
                </label>

                <div className="flex h-12 items-center gap-2 rounded-full border border-stone-300 bg-white px-4 transition focus-within:border-[#28598F] focus-within:ring-2 focus-within:ring-[#28598F]/10">

                  <User
                    size={17}
                    className="shrink-0 text-stone-400"
                  />

                  <input
                    id="societyId"
                    type="text"
                    placeholder={
                      role === "society"
                        ? "Enter Society ID"
                        : "Enter Federation ID"
                    }
                    value={societyId}
                    onChange={(e) =>
                      setSocietyId(e.target.value)
                    }
                    className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-stone-500"
                >
                  Password
                </label>

                <div className="flex h-12 items-center gap-2 rounded-full border border-stone-300 bg-white px-4 transition focus-within:border-[#28598F] focus-within:ring-2 focus-within:ring-[#28598F]/10">

                  <Lock
                    size={17}
                    className="shrink-0 text-stone-400"
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none"
                  />
                </div>

                {/* Forgot Password */}
                <div className="mt-1.5 flex justify-end">
                  <button
                    type="button"
                    className="text-[11px] text-stone-400 transition hover:text-[#28598F]"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Backend Error */}
              {error && (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-[#0752A4] px-5 text-sm font-semibold text-white transition hover:bg-[#06488F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "SIGN IN"}
              </button>

              {/* Sign Up */}
              <div className="mt-5 text-center text-sm text-stone-400">
                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={handleSignUp}
                  className="font-medium text-[#28598F] hover:underline"
                >
                  Sign Up
                </button>
              </div>

              {/* Security */}
              <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <Lock size={12} />
                Protected by Multi-Factor Cooperative Access Control
              </p>
            </form>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-8 py-5 text-[11px] text-stone-400 sm:px-12 lg:px-16">

            <span>
              {footerInfo.copyright}
            </span>

            <span>
              {footerInfo.supportPrompt}{" "}

              <a
                href="#support"
                className="font-medium text-stone-500 hover:text-[#28598F]"
              >
                {footerInfo.supportLabel}
              </a>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}