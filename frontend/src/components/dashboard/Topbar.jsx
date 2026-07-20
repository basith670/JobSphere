import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaBars,
  FaUser,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useUser from "../../context/UserContext";
import { globalSearch } from "../../services/searchService";
import NotificationDropdown from "../../components/notifications/NotificationDropdown";

import "./Topbar.css";

export default function Topbar({
  setSidebarOpen,
}) {
  const { logout } = useAuth();
  const {
    userProfile,
    clearUser,
  } = useUser();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [results, setResults] = useState({
    jobs: [],
    applications: [],
    resumes: [],
  });

  const [showResults, setShowResults] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // Global Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setResults({
          jobs: [],
          applications: [],
          resumes: [],
        });
        return;
      }

      try {
        const data = await globalSearch(search);
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error(error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleLogout = () => {

    logout();
  
    clearUser();
  
    navigate("/login");
  
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
      <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
        <h2>
          Welcome Back,{" "}
          {userProfile?.first_name ||
            userProfile?.username}{" "}
          👋
        </h2>

        <p>
          Ready to move one step closer to your next opportunity?
        </p>
      </div>

      <div className="topbar-right">

        {/* Search */}
        <div
          className="search-box"
          ref={searchRef}
        >
          <FaSearch />

          <input
            type="text"
            placeholder="Search jobs, applications, resumes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onFocus={() => setShowResults(true)}
          />

          {showResults && search && (
            <div className="search-dropdown">

              {results.jobs.length > 0 && (
                <>
                  <h4>Jobs</h4>

                  {results.jobs.map((job) => (
                    <div
                      key={job.id}
                      className="search-item"
                      onClick={() => {
                        navigate(`/jobs/details/${job.id}`);
                        setSearch("");
                        setShowResults(false);
                      }}
                    >
                      <strong>{job.title}</strong>

                      <span>
                        {job.company} • {job.location}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {results.applications.length > 0 && (
                <>
                  <h4>Applications</h4>

                  {results.applications.map((app) => (
                    <div
                      key={app.id}
                      className="search-item"
                      onClick={() => {
                        navigate("/applications");
                        setSearch("");
                        setShowResults(false);
                      }}
                    >
                      <strong>{app.job_title}</strong>

                      <span>
                        {app.company} • {app.status}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {results.resumes.length > 0 && (
                <>
                  <h4>Resumes</h4>

                  {results.resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="search-item"
                      onClick={() => {
                        navigate("/resumes");
                        setSearch("");
                        setShowResults(false);
                      }}
                    >
                      <strong>{resume.title}</strong>
                    </div>
                  ))}
                </>
              )}

              {results.jobs.length === 0 &&
                results.applications.length === 0 &&
                results.resumes.length === 0 && (
                  <div className="search-empty">
                    No results found
                  </div>
                )}

            </div>
          )}
        </div>

        {/* Notification */}
        <NotificationDropdown />

        {/* Profile */}
        <div
          className="topbar-profile-dropdown"
          ref={dropdownRef}
        >
          <button
            className={`profile-trigger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <div className="topbar-avatar">
              {userProfile?.first_name?.charAt(0) ||
                userProfile?.username?.charAt(0) ||
                "U"}
            </div>

            <FaChevronDown />
          </button>

          {open && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <strong>
                  {userProfile?.first_name}{" "}
                  {userProfile?.last_name}
                </strong>

                <span>
                  {userProfile?.role === "recruiter"
                    ? "Recruiter"
                    : "Job Seeker"}
                </span>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
              >
                <FaUser />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  navigate("/resumes");
                  setOpen(false);
                }}
              >
                <FaFileAlt />
                <span>My Resume</span>
              </button>

              <button
                onClick={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
              >
                <FaCog />
                <span>Settings</span>
              </button>

              <hr />

              <button onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}