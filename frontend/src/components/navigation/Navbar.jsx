import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

import "./Navbar.css";

const publicLinks = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
];

const candidateLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "Resume", path: "/resumes" },
  { name: "Profile", path: "/profile" },
];

const recruiterLinks = [
  { name: "Dashboard", path: "/recruiter/dashboard" },
  { name: "Jobs", path: "/recruiter/jobs" },
  { name: "Candidates", path: "/recruiter/candidates" },
  { name: "Company", path: "/recruiter/company" },
  { name: "Profile", path: "/recruiter/profile" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = isAuthenticated
    ? user?.role === "recruiter"
      ? recruiterLinks
      : candidateLinks
    : publicLinks;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <>
      <header className="navbar-header">
        <nav className="navbar">

          {/* Logo */}
          <Link
            to="/"
            className="navbar-logo"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/jobsphere-logo.png"
              alt="JobSphere"
              className="navbar-logo-image"
            />

            <span>JobSphere</span>
          </Link>
          {/* Navigation Links */}
          <div
            className={`navbar-links ${
              menuOpen ? "active" : ""
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Actions */}
            <div className="navbar-mobile-actions">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button variant="secondary">
                      Login
                    </Button>
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button>
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="navbar-username">
                    {user?.username}
                  </span>

                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Desktop Right */}
          <div className="navbar-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="secondary">
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button>
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <span className="navbar-username">
                  {user?.username}
                </span>

                <Button
                  variant="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </nav>
      </header>

      {menuOpen && (
        <div
          className="navbar-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}