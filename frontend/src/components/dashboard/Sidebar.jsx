import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaBriefcase,
  FaClipboardList,
  FaRobot,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import useUser from "../../context/UserContext";

import "./Sidebar.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Resume",
    path: "/resumes",
    icon: <FaFileAlt />,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: <FaBriefcase />,
  },
  {
    name: "Applications",
    path: "/applications",
    icon: <FaClipboardList />,
  },
  {
    name: "AI Career Hub",
    path: "/ai-career-hub",
    icon: <FaRobot />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

export default function Sidebar() {

  const { logout } = useAuth();
  const {
    userProfile,
    clearUser,
  } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {

    logout();
  
    clearUser();
  
    navigate("/login");
  
  };
  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

        <h2>JobSphere</h2>

        <span>Career Platform</span>

      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <span>{item.icon}</span>

            <span>{item.name}</span>

          </NavLink>

        ))}

      </nav>

      <div className="sidebar-footer">

        <div className="sidebar-user">

          <div className="avatar">

            {userProfile?.profile_image_url ? (

              <img
                src={userProfile.profile_image_url}
                alt="Profile"
                className="sidebar-avatar-img"
              />

            ) : (

              userProfile?.first_name?.charAt(0) ||
              userProfile?.username?.charAt(0) ||
              "U"

            )}

          </div>

          <div>

            <strong>

              {userProfile?.first_name} {userProfile?.last_name}

            </strong>

            <p>

              {userProfile?.role === "recruiter"
                ? "Recruiter"
                : "Job Seeker"}

            </p>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>Logout</span>

        </button>

      </div>

    </aside>

  );

}