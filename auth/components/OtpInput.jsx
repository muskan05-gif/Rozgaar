import React, { useRef } from "react";

const LENGTH = 6;

export default function OtpInput({ value, onChange }) {
  const inputsRef = useRef([]);

  const setDigit = (index, digit) => {
    const next = value.split("");
    while (next.length < LENGTH) next.push("");
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index, e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigit(index, "");
      return;
    }
    const digit = raw[raw.length - 1];
    setDigit(index, digit);
    if (index < LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted.padEnd(LENGTH, ""));
    const focusIndex = Math.min(pasted.length, LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-2.5" onPaste={handlePaste}>
      {Array.from({ length: LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          inputMode="numeric"
          maxLength={1}
          className="h-12 w-11 rounded-md border border-stone-300 text-center text-lg font-semibold text-[#141B33] focus:border-[#141B33] focus:outline-none focus:ring-2 focus:ring-[#141B33]/15"
        />
      ))}
    </div>
  );
}
