import React from "react";

// Generic "not built yet" page so every sidebar link goes somewhere real
// instead of a dead link, while you build out each section properly.
export default function PlaceholderPage({ icon: Icon, title, description }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center">
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
          <Icon size={22} />
        </span>
      )}
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
      <p className="mt-1.5 max-w-sm text-sm text-stone-500">{description}</p>
    </div>
  );
}
