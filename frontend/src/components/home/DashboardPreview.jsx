import "./DashboardPreview.css";
import {
  BriefcaseBusiness,
  Users,
 TrendingUp,
  Sparkles,
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <div className="dashboard-preview">

      <div className="dashboard-top">

        <div>
          <span className="dashboard-label">
            AI Dashboard
          </span>

          <h3>Hiring Insights</h3>
        </div>

        <div className="dashboard-status">
          <Sparkles size={14} />
          Live
        </div>

      </div>

      <div className="dashboard-metrics">

        <div className="metric-row">

          <div className="metric-icon">
            <BriefcaseBusiness size={18} />
          </div>

          <div>
            <h2>1,250+</h2>
            <p>Open Jobs</p>
          </div>

        </div>

        <div className="metric-row">

          <div className="metric-icon">
            <Users size={18} />
          </div>

          <div>
            <h2>9,400+</h2>
            <p>Candidates</p>
          </div>

        </div>

        <div className="metric-row">

          <div className="metric-icon">
            <TrendingUp size={18} />
          </div>

          <div>
            <h2>96%</h2>
            <p>AI Match Accuracy</p>
          </div>

        </div>

      </div>

      <div className="dashboard-divider"></div>

      <div className="dashboard-chart">

        <div className="bar h1"></div>
        <div className="bar h2"></div>
        <div className="bar h3"></div>
        <div className="bar h4"></div>
        <div className="bar h5"></div>
        <div className="bar h6"></div>
        <div className="bar h7"></div>

      </div>

    </div>
  );
};

export default DashboardPreview;