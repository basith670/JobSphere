import "./StatCard.css";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="dashboard-stat-card">

      <div className="dashboard-stat-top">

        <div className="dashboard-stat-info">

          <p className="dashboard-stat-title">
            {title}
          </p>

          <h2 className="dashboard-stat-value">
            {value}
          </h2>

          {subtitle && (
            <p className="dashboard-stat-subtitle">
              {subtitle}
            </p>
          )}

        </div>

        <div className="dashboard-stat-icon">
          {icon}
        </div>

      </div>

      <div className="dashboard-stat-footer">

        <span className="dashboard-stat-status"></span>

        <span>
          Updated just now
        </span>

      </div>

    </div>
  );
}