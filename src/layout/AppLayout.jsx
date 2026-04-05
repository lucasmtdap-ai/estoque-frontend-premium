import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}
