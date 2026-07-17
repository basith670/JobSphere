import {
  FaPlus,
  FaUsers,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RecruiterHero({ dashboard }) {

  const navigate = useNavigate();

  return (

    <section className="recruiter-hero">

      <div className="hero-overlay"></div>

      <div className="recruiter-hero-left">

      <span className="recruiter-hero-badge">

          Recruiter Dashboard

        </span>

        <h1>

          {dashboard.greeting},{" "}
          {dashboard.recruiter_name} 👋

        </h1>

        <p>

          Welcome to{" "}
          <strong>
            {dashboard.company_name || "JobSphere"}
          </strong>

          . Manage job postings, review applications,
          schedule interviews and hire top talent.

        </p>

        <div className="recruiter-hero-mini-stats">

  <div
    className="mini-card clickable-card"
    onClick={() => navigate("/recruiter/jobs")}
  >

    <FaBriefcase />

    <div>

      <h3>{dashboard.active_jobs}</h3>

      <span>Active Jobs</span>

    </div>

  </div>

  <div
              className="mini-card clickable-card"
              onClick={() => navigate("/recruiter/applicants")}
            >

              <FaChartLine />

              <div>

                <h3>{dashboard.applications}</h3>

                <span>Applications</span>

              </div>

            </div>

          </div>

      </div>

      <div className="recruiter-hero-right">

        <button
          className="hero-btn primary-btn"
          onClick={() => navigate("/recruiter/jobs/create")}
        >

          <FaPlus />

          Post Job

        </button>

        <button
          className="hero-btn secondary-btn"
          onClick={() => navigate("/recruiter/applicants")}
        >

          <FaUsers />

          View Applicants

        </button>

      </div>

    </section>

  );

}