import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

// Kebab (...) dropdown menu used in table rows. `items` is an array of
// { label, onClick } — pass onClick as (e) since it's called with the
// row-click event already stopped from propagating.
export default function ActionMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-label="More actions"
        className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-40 mt-1 w-44 rounded-md border border-stone-200 bg-white py-1 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className="block w-full px-3 py-1.5 text-left text-sm text-stone-700 hover:bg-stone-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
