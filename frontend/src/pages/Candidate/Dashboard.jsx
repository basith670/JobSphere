import { useEffect, useState } from "react";

import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import { getCandidateDashboard } from "../../services/candidateDashboardService";

import "./Dashboard.css";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getCandidateDashboard();

        console.log("Dashboard API:", data);

        setDashboard(data);
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

  if (!dashboard) {
    return <h2>Unable to load dashboard.</h2>;
  }

  return (
    <div>
      <StatsGrid
        stats={dashboard.stats || {}}
        user={dashboard.user || {}}
      />

      <QuickActions />

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Latest Resume</h2>

          <p>
            {dashboard.latest_resume?.title || "No resume uploaded"}
          </p>
        </div>

        <div className="dashboard-section">
          <h2>Profile Completion</h2>

          <h1>
            {dashboard.user?.profile_completion ?? 0}%
          </h1>
        </div>
      </div>
    </div>
  );
}