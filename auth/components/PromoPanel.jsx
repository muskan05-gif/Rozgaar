import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BrandMark from "./BrandMark";
import { promoSlides, footerInfo } from "../data/authContent";

export default function PromoPanel() {
  const [index, setIndex] = useState(0);
  const slide = promoSlides[index];

  const go = (delta) => {
    setIndex((i) => (i + delta + promoSlides.length) % promoSlides.length);
  };

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#141B33] px-10 py-10 text-white">
      <BrandMark variant="dark" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {slide.badge}
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight">
          {slide.quote}
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
          {slide.description}
        </p>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-[-2.5rem] top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-[-2.5rem] top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="text-xs text-white/40">{footerInfo.ministryLine}</p>
      </div>
    </div>
  );
}
