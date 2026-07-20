import { Outlet } from "react-router-dom";

import Navbar from "../components/navigation/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="app-main">

        <Outlet />

    </main>
    </>
  );
}