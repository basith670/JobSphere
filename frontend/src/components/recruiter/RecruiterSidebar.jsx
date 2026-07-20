import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { getProfile } from "../../services/profileService";

export default function RecruiterSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const data = await getProfile();

      setProfile(data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");

  };

  const closeSidebar = () => {

    if (window.innerWidth <= 992) {

      setSidebarOpen(false);

    }

  };

  return (

    <>

      {sidebarOpen && (

        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />

      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >

          <FaTimes />

        </button>

        <div className="sidebar-logo">

          <h2>JobSphere</h2>

          <p>Recruiter Portal</p>

        </div>

        <nav className="sidebar-menu">

          <NavLink
            to="/recruiter/dashboard"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/recruiter/jobs"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <FaBriefcase />
            Jobs
          </NavLink>

          <NavLink
            to="/recruiter/applicants"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <FaUsers />
            Applicants
          </NavLink>

          <NavLink
            to="/recruiter/companies"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <FaBuilding />
            Company
          </NavLink>

          <NavLink
            to="/recruiter/analytics"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <FaChartBar />
            Analytics
          </NavLink>

          <NavLink
            to="/recruiter/settings"
            className="sidebar-link"
            onClick={closeSidebar}
          >
            <FaCog />
            Settings
          </NavLink>

        </nav>

        <div className="sidebar-footer">

          <div className="sidebar-user">

            <div className="avatar">

              {profile?.profile_image_url ? (

                <img
                  src={profile.profile_image_url}
                  alt="Profile"
                  className="sidebar-avatar-image"
                />

              ) : (

                <span>

                  {profile?.first_name?.charAt(0) || "R"}

                </span>

              )}

            </div>

            <div>

              <h4>

                {profile
                  ? `${profile.first_name} ${profile.last_name}`
                  : "Recruiter"}

              </h4>

              <span>

                Recruiter

              </span>

            </div>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

    </>

  );

}