import React, { useState } from "react";
import { Phone, ArrowRight, Lock } from "lucide-react";
import PromoPanel from "../components/PromoPanel";
import RoleToggle from "../components/RoleToggle";
import { footerInfo } from "../data/authContent";

// onSendOtp receives { role, phone } — wire this up to your OTP API,
// then route to <VerifyOtp /> passing the same role + phone through.
export default function SignIn({ onSendOtp }) {
  const [role, setRole] = useState("society");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length !== 10) return;
    onSendOtp?.({ role, phone });
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-[420px] shrink-0 lg:block">
        <PromoPanel />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-end px-8 py-6">
          <span className="rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-500">
            Secure Portal v2.4
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center px-6">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h1 className="text-2xl font-bold leading-snug text-[#141B33]">
              Sign in to manage your cooperative
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Select your administrative tier and verify your registered
              mobile number.
            </p>

            <div className="mt-8">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-400">
                Select Admin Role
              </p>
              <RoleToggle value={role} onChange={setRole} />
            </div>

            <div className="mt-6">
              <label
                htmlFor="phone"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-stone-400"
              >
                Registered Mobile Number
              </label>
              <div className="flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2.5 focus-within:border-[#141B33] focus-within:ring-2 focus-within:ring-[#141B33]/15">
                <Phone size={15} className="text-stone-400" />
                <span className="text-sm text-stone-500">+91</span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
              </div>
              <p className="mt-2 text-xs text-stone-400">
                We will send a 6-digit one-time password (OTP) via SMS.
              </p>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#141B33] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1c2647]"
            >
              Send OTP
              <ArrowRight size={15} />
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400">
              <Lock size={12} />
              Protected by Multi-Factor Cooperative Access Control
            </p>
          </form>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 px-8 py-5 text-xs text-stone-400">
          <span>{footerInfo.copyright}</span>
          <span>
            {footerInfo.supportPrompt}{" "}
            <a href="#support" className="font-medium text-stone-600 hover:text-[#141B33]">
              {footerInfo.supportLabel}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
