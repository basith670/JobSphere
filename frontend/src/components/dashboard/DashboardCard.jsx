export default function DashboardCard({
    title,
    value,
    subtitle,
    icon,
  }) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "22px",
          padding: "28px",
          boxShadow: "0 10px 30px rgba(15,23,42,.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #edf2f7",
        }}
      >
        <div>
          <p
            style={{
              color: "#94A3B8",
              fontSize: 16,
              marginBottom: 12,
            }}
          >
            {title}
          </p>
  
          <h2
            style={{
              fontSize: 42,
              marginBottom: 10,
              color: "#0F172A",
            }}
          >
            {value}
          </h2>
  
          <span
            style={{
              color: "#0F766E",
              fontWeight: 600,
            }}
          >
            {subtitle}
          </span>
        </div>
  
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 18,
            background: "#ECFDF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: "#0F766E",
          }}
        >
          {icon}
        </div>
      </div>
    );
  }