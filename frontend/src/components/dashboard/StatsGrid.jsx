import {
  FaFileAlt,
  FaBriefcase,
  FaBookmark,
  FaRobot,
} from "react-icons/fa";

import DashboardCard from "./DashboardCard";

export default function StatsGrid({ stats, user }) {
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
        value={`${user?.resume_score ?? 0}%`}
        subtitle="AI Resume Analysis"
        icon={<FaFileAlt />}
      />

      <DashboardCard
        title="Resumes"
        value={stats?.resume_count ?? 0}
        subtitle="Uploaded"
        icon={<FaFileAlt />}
      />

      <DashboardCard
        title="Applications"
        value={stats?.application_count ?? 0}
        subtitle="Applied Jobs"
        icon={<FaBriefcase />}
      />

      <DashboardCard
        title="Interview Score"
        value={stats?.interview_score ?? 0}
        subtitle="AI Mock Interview"
        icon={<FaRobot />}
      />
    </div>
  );
}