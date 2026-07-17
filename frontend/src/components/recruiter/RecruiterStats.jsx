import {
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaTimesCircle,
} from "react-icons/fa";

export default function RecruiterStats({ dashboard }) {

  const stats = [

      {
          title: "Active Jobs",
          value: dashboard.stats.active_jobs,
          icon: <FaBriefcase />,
          color: "#0f766e",
          growth: "+12%",
      },

      {
          title: "Applications",
          value: dashboard.stats.applications,
          icon: <FaUsers />,
          color: "#2563eb",
          growth: "+18%",
      },

      {
          title: "Shortlisted",
          value: dashboard.stats.shortlisted,
          icon: <FaUserCheck />,
          color: "#f59e0b",
          growth: "+7%",
      },

      {
          title: "Rejected",
          value: dashboard.stats.rejected,
          icon: <FaTimesCircle />,
          color: "#dc2626",
          growth: "-2%",
      },

  ];

  return (

      <section className="dashboard-stats">

          {stats.map((item, index) => (

              <div
                  key={index}
                  className="stat-card"
                  style={{
                      "--card-color": item.color,
                  }}
              >

                  <div
                      className="stat-icon"
                      style={{
                          background: item.color,
                      }}
                  >
                      {item.icon}
                  </div>

                  <p className="stat-title">

                      {item.title}

                  </p>

                  <div className="stat-footer">

                      <h2>

                          {item.value}

                      </h2>

                      <span
                          className={`stat-growth ${
                              item.growth.startsWith("-")
                                  ? "negative"
                                  : "positive"
                          }`}
                      >

                          {item.growth}

                      </span>

                  </div>

              </div>

          ))}

      </section>

  );

}