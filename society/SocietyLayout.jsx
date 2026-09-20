import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

export default function SocietyLayout() {
  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="min-h-screen pl-[78px]">
        {/* Top Bar */}
        <TopBar />

        {/* Page Content */}
        <main className="px-5 pb-8 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1700px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}