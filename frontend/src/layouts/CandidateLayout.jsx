import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function CandidateLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "270px",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar />

        <div
          style={{
            padding: "24px 30px 30px",
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}