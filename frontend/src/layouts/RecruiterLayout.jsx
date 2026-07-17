import { Outlet } from "react-router-dom";

import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar";

import { SearchProvider } from "../context/SearchContext";

import "../components/recruiter/Recruiter.css";
import "../styles/recruiter.css";

export default function RecruiterLayout() {

    return (

        <SearchProvider>

            <div className="recruiter-layout">

                <RecruiterSidebar />

                <div className="recruiter-main">

                    <RecruiterNavbar />

                    <div className="recruiter-content">

                        <Outlet />

                    </div>

                </div>

            </div>

        </SearchProvider>

    );

}