import React, { useState } from "react";

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Simple deterministic hash so the same name always maps to the same photo.
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Punjabi naming convention: "Kaur" is a female-only given/middle name,
// "Singh" is male-only — these are reliable signals. A short fallback list
// covers first names in our mock data that don't carry either suffix.
const FEMALE_FIRST_NAMES = new Set([
  "pooja", "anita", "kavita", "simarpreet", "simranjit", "harpreet",
]);

function inferGender(name) {
  const lower = name.toLowerCase();
  if (lower.includes("kaur")) return "female";
  if (lower.includes("singh")) return "male";
  const first = lower.split(" ")[0];
  if (FEMALE_FIRST_NAMES.has(first)) return "female";
  return "male";
}

// Real (stock/model) headshot photos from randomuser.me — a public API built
// specifically to provide consented placeholder portraits for exactly this
// use case (mock UIs/dashboards). Not real named individuals being
// impersonated. Gender-matched per name, deterministic, with initials as a
// fallback if the image fails to load (e.g. offline).
//
// Pass an explicit `gender` prop to override the inference if needed.
export default function Avatar({ name, size = 32, className = "", gender }) {
  const [failed, setFailed] = useState(false);
  const initials = getInitials(name);
  const resolvedGender = gender || inferGender(name);
  const photoIndex = hashString(name) % 100;
  const src = `https://randomuser.me/api/portraits/${
    resolvedGender === "female" ? "women" : "men"
  }/${photoIndex}.jpg`;

  if (failed) {
    return (
      <div
        style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
        className={`flex shrink-0 items-center justify-center rounded-full bg-stone-200 font-semibold text-stone-600 ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full bg-stone-100 object-cover ${className}`}
    />
  );
}
