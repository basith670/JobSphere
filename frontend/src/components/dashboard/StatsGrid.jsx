import {
    FaFileAlt,
    FaBookmark,
    FaBriefcase,
    FaRobot,
  } from "react-icons/fa";
  
  import DashboardCard from "./DashboardCard";
  
  export default function StatsGrid() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "24px",
        }}
      >
        <DashboardCard
          title="Resume Score"
          value="88%"
          subtitle="Excellent"
          icon={<FaFileAlt />}
        />
  
        <DashboardCard
          title="Applications"
          value="12"
          subtitle="2 New"
          icon={<FaBriefcase />}
        />
  
        <DashboardCard
          title="Saved Jobs"
          value="18"
          subtitle="Ready to Apply"
          icon={<FaBookmark />}
        />
  
        <DashboardCard
          title="Interview Score"
          value="9.2"
          subtitle="AI Evaluation"
          icon={<FaRobot />}
        />
      </div>
    );
  }