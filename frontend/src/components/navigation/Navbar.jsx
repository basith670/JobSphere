import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

import Button from "../ui/Button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "Resumes", path: "/resumes" },
  { name: "Profile", path: "/profile" },
];

export default function Navbar() {
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
            gap: "30px",
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
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Link
            to="/login"
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="secondary">
              Login
            </Button>
          </Link>

          <Link
            to="/register"
            style={{
              textDecoration: "none",
            }}
          >
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}