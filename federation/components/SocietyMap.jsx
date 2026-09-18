import React, { useMemo, useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { societyLocations, districtOptions } from "../data/mockData";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function SocietyMap() {
  const [zone, setZone] = useState(districtOptions[0]);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const visibleLocations = useMemo(() => {
    if (zone === "Punjab North Zone") return societyLocations;
    return societyLocations.filter((loc) => loc.district === zone);
  }, [zone]);

  // Synchronous, safe map initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true
      }).setView([31.1471, 75.3412], 8);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers and handle single vs multi-item centering smoothly
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (visibleLocations.length > 0) {
      const bounds = L.latLngBounds([]);
      let lastLatLon = null;

      visibleLocations.forEach((loc) => {
        const lat = loc.lat || (32.5 - (loc.y || 50) * 0.03);
        const lng = loc.lng || (73.5 + (loc.x || 50) * 0.04);
        lastLatLon = [lat, lng];

        const markerColor = loc.status === "active" ? "#141b33" : "#f59e0b";
        const customIcon = L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        const marker = L.marker([lat, lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`<strong>${loc.name}</strong><br/>District: ${loc.district}<br/>Status: ${loc.status}`);

        markersRef.current.push(marker);
        bounds.extend([lat, lng]);
      });

      // If there's only one location, set view explicitly; otherwise fit bounds
      if (visibleLocations.length === 1 && lastLatLon) {
        map.setView(lastLatLon, 11);
      } else {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 11 });
      }
    }

    // Ensure map recalculates size when district changes
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [visibleLocations]);

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5">
      <style>{`
        .leaflet-tile { max-width: none !important; max-height: none !important; }
        .leaflet-container { width: 100%; height: 100%; background: #e5e7eb; z-index: 0; }
      `}</style>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-stone-900">
            Society Locations
          </h2>
          <p className="mt-0.5 text-sm text-stone-500">
            Geographic distribution of registered cooperative societies across North Punjab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-900" />
              Active society
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Onboarding
            </span>
          </div>

          <div className="relative">
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="appearance-none rounded-md border border-stone-300 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
            >
              {districtOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>
        </div>
      </div>

      <div className="relative mt-4 w-full overflow-hidden rounded-md border border-stone-200" style={{ height: "384px" }}>
        <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />

        {visibleLocations.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm text-stone-400 z-10">
            No societies registered in this district yet.
          </div>
        )}
      </div>
    </div>
  );
}