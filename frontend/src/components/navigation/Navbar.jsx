import { FaBriefcase } from "react-icons/fa";

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
          boxShadow: "0 10px 35px rgba(15,23,42,.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 32px",
        }}
      >
        {/* Logo */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: 700,
            fontSize: "22px",
            color: "#0F172A",
          }}
        >
          <FaBriefcase
            style={{
              color: "#2563EB",
              fontSize: "24px",
            }}
          />

          JobSphere
        </div>

        {/* Links */}

        <div
          style={{
            display: "flex",
            gap: "36px",
            color: "#475569",
            fontWeight: 500,
          }}
        >
          <span>Home</span>
          <span>Jobs</span>
          <span>Companies</span>
          <span>About</span>
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: "14px",
          }}
        >
          <button
            style={{
              border: "none",
              background: "transparent",
              fontWeight: 600,
              cursor: "pointer",
              color: "#475569",
            }}
          >
            Login
          </button>

          <button
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              borderRadius: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}