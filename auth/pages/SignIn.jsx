import React, { useState } from "react";
import { Lock, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PromoPanel from "../components/PromoPanel";
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
    <div className="flex min-h-screen">
      {/* Left Promo Panel */}
      <div className="hidden w-[420px] shrink-0 lg:block">
        <PromoPanel />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Top Badge */}
        <div className="flex justify-end px-8 py-6">
          <span className="rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-500">
            Secure Portal v2.4
          </span>
        </div>

        {/* Login Form */}
        <div className="flex flex-1 items-center justify-center px-6">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h1 className="text-2xl font-bold leading-snug text-[#141B33]">
              Sign in to manage your cooperative
            </h1>

            <p className="mt-2 text-sm text-stone-500">
              Select your administrative tier and enter your credentials.
            </p>

            {/* Admin Role */}
            <div className="mt-8">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-400">
                Select Admin Role
              </p>

              <RoleToggle value={role} onChange={setRole} />
            </div>

            {/* Society / Federation ID */}
            <div className="mt-6">
              <label
                htmlFor="societyId"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-stone-400"
              >
                {role === "society" ? "Society ID" : "Federation ID"}
              </label>

              <div className="flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2.5 focus-within:border-[#141B33] focus-within:ring-2 focus-within:ring-[#141B33]/15">
                <User size={15} className="text-stone-400" />

                <input
                  id="societyId"
                  type="text"
                  placeholder={
                    role === "society"
                      ? "Enter Society ID"
                      : "Enter Federation ID"
                  }
                  value={societyId}
                  onChange={(e) => setSocietyId(e.target.value)}
                  className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-6">
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-stone-400"
              >
                Password
              </label>

              <div className="flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2.5 focus-within:border-[#141B33] focus-within:ring-2 focus-within:ring-[#141B33]/15">
                <Lock size={15} className="text-stone-400" />

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Error message from the backend */}
            {error && (
              <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Sign In */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#141B33] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1c2647] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight size={15} />}
            </button>

            {/* Sign Up */}
            <div className="mt-5 text-center text-sm text-stone-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleSignUp}
                className="font-medium text-[#141B33] hover:underline"
              >
                Sign Up
              </button>
            </div>

            {/* Security */}
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400">
              <Lock size={12} />
              Protected by Multi-Factor Cooperative Access Control
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 px-8 py-5 text-xs text-stone-400">
          <span>{footerInfo.copyright}</span>

          <span>
            {footerInfo.supportPrompt}{" "}
            <a
              href="#support"
              className="font-medium text-stone-600 hover:text-[#141B33]"
            >
              {footerInfo.supportLabel}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}