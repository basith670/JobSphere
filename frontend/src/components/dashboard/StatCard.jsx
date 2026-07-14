import "./StatCard.css";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-header">

        <div>

          <p className="stat-title">
            {title}
          </p>

          <h2 className="stat-value">
            {value}
          </h2>

          {subtitle && (
            <span className="stat-subtitle">
              {subtitle}
            </span>
          )}

        </div>

        <div className="stat-icon">
          {icon}
        </div>

      </div>

    </div>
  );
}