import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        margin: "30px 0",
        flexWrap: "wrap",
      }}
    >
      <Link to="/resumes" className="primary-btn">
        Upload Resume
      </Link>

      <Link to="/jobs" className="secondary-btn">
        Browse Jobs
      </Link>

      <Link to="/profile" className="secondary-btn">
        Complete Profile
      </Link>
    </div>
  );
}