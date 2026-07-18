import {
  FaFileAlt,
  FaBriefcase,
  FaRobot,
} from "react-icons/fa";

import DashboardCard from "./DashboardCard";
import { useSearch } from "../../context/SearchContext";

import "./StatsGrid.css";

export default function StatsGrid({ stats, user }) {
  const { searchTerm } = useSearch();

  const cards = [
    {
      id: 1,
      title: "Resume Score",
      value: `${stats?.resume_score ?? 0}%`,
      subtitle: "AI Resume Analysis",
      icon: <FaFileAlt />,
      keywords: "resume score ai analysis cv",
    },
    {
      id: 2,
      title: "Resumes",
      value: stats?.resume_count ?? 0,
      subtitle: "Uploaded",
      icon: <FaFileAlt />,
      keywords: "resume resumes uploaded cv",
    },
    {
      id: 3,
      title: "Applications",
      value: stats?.applications ?? 0,
      subtitle: "Applied Jobs",
      icon: <FaBriefcase />,
      keywords: "applications applied jobs",
    },
    {
      id: 4,
      title: "Interview Score",
      value: stats?.interview_score ?? 0,
      subtitle: "AI Mock Interview",
      icon: <FaRobot />,
      keywords: "interview ai mock score",
    },
  ];

  const filteredCards = cards.filter((card) => {
    if (!searchTerm.trim()) return true;

    const searchWords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter(Boolean);

    const searchableText = `
      ${card.title}
      ${card.subtitle}
      ${card.keywords}
    `.toLowerCase();

    return searchWords.every((word) =>
      searchableText.includes(word)
    );
  });

  if (filteredCards.length === 0) {
    return (
      <div className="stats-grid">
        <h2>No dashboard cards found</h2>
        <p>Try searching with another keyword.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px",
      }}
    >
      {filteredCards.map((card) => (
        <DashboardCard
          key={card.id}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
        />
      ))}
    </div>
  );
}