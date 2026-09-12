import React from "react";
import { X } from "lucide-react";

// Generic modal used app-wide for "New X" buttons, detail views, etc.
export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <h2 className="text-base font-semibold text-stone-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2.5 border-t border-stone-200 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}
