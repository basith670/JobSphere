import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

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
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navLinks = isAuthenticated
    ? user?.role === "recruiter"
      ? recruiterLinks
      : candidateLinks
    : publicLinks;

  return (
    <header
      style={{
        position: "sticky",
        top: 20,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <nav
        style={{
          width: "92%",
          maxWidth: "1250px",
          background: "rgba(255,255,255,.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,.45)",
          borderRadius: "18px",
          boxShadow: "var(--shadow-md)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 32px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "22px",
            color: "var(--heading)",
          }}
        >
          <FaBriefcase
            style={{
              color: "var(--primary)",
              fontSize: "24px",
            }}
          />
          JobSphere
        </Link>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                textDecoration: "none",
                color: "var(--text)",
                fontWeight: 600,
                transition: "0.3s",
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
              >
                <Button variant="secondary">
                  Login
                </Button>
              </Link>

              <Link
                to="/register"
                style={{ textDecoration: "none" }}
              >
                <Button>
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <span
                style={{
                  fontWeight: 600,
                  color: "var(--primary)",
                }}
              >
                {user?.username}
              </span>

              <Button
                variant="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}