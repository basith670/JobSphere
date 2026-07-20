import { Outlet } from "react-router-dom";
import { useState } from "react";

import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar";

import { SearchProvider } from "../context/SearchContext";

import "../components/recruiter/Recruiter.css";
import "../styles/recruiter.css";

export default function RecruiterLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <SearchProvider>

            <div className="recruiter-layout">

            <RecruiterSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="recruiter-main">

                <RecruiterNavbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />

                    <div className="recruiter-content">

                        <Outlet />

                    </div>

                </div>

            </div>

        </SearchProvider>

    );

}