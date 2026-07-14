import Header from "../../components/dashboard/Header";
import StatsGrid from "../../components/dashboard/StatsGrid";

import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div>

      <StatsGrid />

      <div className="dashboard-grid">

        <div className="dashboard-section">

          <h2>
            Recent Activity
          </h2>

          <p>
            Your latest resume analysis,
            applications and interview
            activity will appear here.
          </p>

        </div>

        <div className="dashboard-section">

          <h2>
            AI Recommendations
          </h2>

          <p>
            Personalized resume tips,
            interview suggestions,
            and matching jobs will appear here.
          </p>

        </div>

      </div>

    </div>
  );
}