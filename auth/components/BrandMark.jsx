import React from "react";
import { brand } from "../data/authContent";

export default function BrandMark({ variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold ${
          isDark
            ? "bg-white/10 text-white"
            : "bg-[#141B33] text-white"
        }`}
      >
        R
      </div>
      <div className="leading-tight">
        <p
          className={`text-sm font-bold ${
            isDark ? "text-white" : "text-[#141B33]"
          }`}
        >
          {brand.name}
        </p>
        <p
          className={`text-[10px] font-medium uppercase tracking-wide ${
            isDark ? "text-white/50" : "text-stone-400"
          }`}
        >
          {brand.tagline}
        </p>
      </div>
    </div>
  );
}
