import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import "./CandidateLayout.css";

import { useState } from "react";

export default function CandidateLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="candidate-layout">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="candidate-main">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="candidate-content">

          <Outlet />

        </div>

      </main>

    </div>

  );

}