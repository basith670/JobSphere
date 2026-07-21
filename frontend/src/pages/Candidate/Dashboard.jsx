import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";

import { getCandidateDashboard } from "../../services/candidateDashboardService";
import { getDashboardStats } from "../../services/jobService";

import { useSearch } from "../../context/SearchContext";

import "./Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const { searchTerm } = useSearch();

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const [dashboardData, statsData] = await Promise.all([
          getCandidateDashboard(),
          getDashboardStats(),
        ]);

        setDashboard(dashboardData);
        setStats(statsData);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard();

  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  if (!dashboard || !stats) {
    return <h2>Unable to load dashboard.</h2>;
  }

  const showLatestResume =
    !searchTerm ||
    searchTerm.trim() === "" ||
    "latest resume resume cv uploaded".includes(
      searchTerm.toLowerCase()
    );

  const showProfileCompletion =
    !searchTerm ||
    searchTerm.trim() === "" ||
    "profile completion account".includes(
      searchTerm.toLowerCase()
    );

  return (
    <div className="candidate-dashboard">

      {/* ================= HERO ================= */}

      <section className="dashboard-hero">

        <div className="dashboard-hero-content">

          <span className="dashboard-hero-tag">
            AI Career Dashboard
          </span>

          <h1>
            Welcome back,{" "}
            {dashboard.user?.first_name || dashboard.user?.username} 👋
          </h1>

          <p>
            Ready to move one step closer to your dream job?
            Continue building your profile, improve your resume,
            and track your applications—all from one place.
          </p>

          <button
          className="dashboard-hero-btn"
          onClick={() => navigate("/candidate/jobs")}
        >
          Browse Jobs →
        </button>
        </div>

        <div className="dashboard-hero-score">

          <div className="dashboard-score-circle">

            <h2>
              {stats.profile_strength}%
            </h2>

            <span>Profile Strength</span>

          </div>

          <p>
          {stats.profile_strength < 65
            ? "Complete your profile to attract more recruiters."
            : stats.profile_strength < 85
            ? "Great progress! Add more details to stand out."
            : stats.profile_strength < 100
            ? "Excellent profile! Complete the remaining details."
            : "Outstanding! Your profile is fully complete."}
        </p>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <StatsGrid
        stats={dashboard.stats || {}}
        user={dashboard.user || {}}
      />

      {/* ================= QUICK ACTIONS ================= */}

      <QuickActions />

      {/* ================= LOWER SECTION ================= */}

      {(showLatestResume || showProfileCompletion) && (

        <div className="dashboard-grid">

          {showLatestResume && (

            <div className="dashboard-section">

              <h2>
                Latest Resume
              </h2>

              <div className="resume-preview">

                <div>

                  <h3>
                    {dashboard.latest_resume?.title ||
                      "No Resume Uploaded"}
                  </h3>

                  <p>
                    {dashboard.user?.first_name}{" "}
                    {dashboard.user?.last_name}
                  </p>

                </div>

              </div>

            </div>

          )}

          {showProfileCompletion && (

            <div className="dashboard-section">

              <h2>
                Profile Completion
              </h2>

              <div className="profile-progress">

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${stats.profile_strength}%`,
                    }}
                  />

                </div>

                <h1>
                  {stats.profile_strength}%
                </h1>

                <p>
                  Keep your profile updated to improve visibility.
                </p>

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );
}