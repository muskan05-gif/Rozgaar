import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Lock, Clock } from "lucide-react";
import BrandMark from "../components/BrandMark";
import OtpInput from "../components/OtpInput";
import { footerInfo } from "../data/authContent";

const RESEND_SECONDS = 30;

// phone: the number OTP was sent to, e.g. "+91 98765 43210"
// onBack: go back to the phone-entry step
// onVerify: receives the 6-digit code the user entered
// onResend: called when the resend link is used (after the timer elapses)
export default function VerifyOtp({ phone = "+91 98765 43210", onBack, onVerify, onResend }) {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const isComplete = /^\d{6}$/.test(code);

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    onResend?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;
    onVerify?.(code);
  };

  const timerLabel = `00:${String(secondsLeft).padStart(2, "0")}`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex items-center justify-between border-b border-stone-100 px-8 py-5">
        <BrandMark variant="light" />
        <span className="flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Secure Cooperative Network
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-lg border border-stone-200 p-7"
        >
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-700"
          >
            <ArrowLeft size={13} />
            Change phone number
          </button>

          <h1 className="mt-4 text-xl font-bold text-[#141B33]">Verify OTP</h1>
          <p className="mt-1 text-sm text-stone-500">
            Code sent to <span className="font-medium text-stone-700">{phone}</span>
          </p>

          <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wide text-stone-400">
            Enter 6-Digit Code
          </p>
          <OtpInput value={code} onChange={setCode} />

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Clock size={13} />
              {secondsLeft > 0 ? (
                <>Resend OTP in {timerLabel}</>
              ) : (
                "You can resend the code now"
              )}
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className="font-medium text-[#141B33] hover:underline disabled:cursor-not-allowed disabled:text-stone-300 disabled:no-underline"
            >
              Resend code
            </button>
          </div>

          <button
            type="submit"
            disabled={!isComplete}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#141B33] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1c2647] disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Verify &amp; Continue
            <ArrowRight size={15} />
          </button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400">
            <Lock size={12} />
            Protected by Multi-Factor Cooperative Access Control
          </p>
        </form>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 px-8 py-5 text-xs text-stone-400">
        <span>{footerInfo.copyright} · National Cooperative Development</span>
        <span>
          {footerInfo.supportPrompt}{" "}
          <a href="#support" className="font-medium text-stone-600 hover:text-[#141B33]">
            {footerInfo.supportLabel}
          </a>
        </span>
      </div>
    </div>
  );
}
