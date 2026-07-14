import { NavLink } from "react-router-dom";
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
    path: "/ai-hub",
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
  const { user, logout } = useAuth();

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
            {user?.first_name?.charAt(0) || "U"}
          </div>

          <div>
            <strong>
              {user?.first_name || user?.username}
            </strong>

            <p>Job Seeker</p>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </aside>
  );
}