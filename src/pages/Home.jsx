// src/pages/Home.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import { auth } from "../services/firebase";
import DailyHealthTip from "../components/DailyHealthTip";

export default function Home() {
  const [selected, setSelected] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-container container-fluid px-2 px-md-4">
      <Header user={auth.currentUser} />

      <DailyHealthTip />

      {/* Sidebar toggle button for mobile */}
      <div className="d-md-none text-end mb-2">
        <button className="btn btn-outline-primary" onClick={toggleSidebar}>
          ☰ Menu
        </button>
      </div>

      <div className="row">
        {/* Sidebar (visible on desktop, toggleable on mobile) */}
        <div
          className={`col-12 col-md-3 mb-3 mb-md-0 ${
            sidebarOpen ? "d-block" : "d-none d-md-block"
          }`}
        >
          <Sidebar onSelect={setSelected} />
        </div>

        {/* Main content */}
        <div className="col-12 col-md-9">
          <MainContent selected={selected} />
        </div>
      </div>
    </div>
  );
}
