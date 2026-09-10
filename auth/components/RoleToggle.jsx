import React from "react";
import { roleOptions } from "../data/authContent";

export default function RoleToggle({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-md bg-stone-100 p-1">
      {roleOptions.map((opt) => {
        const isActive = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`rounded-md py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#141B33] text-white"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
