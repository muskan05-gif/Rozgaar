import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

export default function SocietyLayout() {
  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 space-y-6 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
