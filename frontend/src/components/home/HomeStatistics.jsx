import "./HomeStatistics.css";

import { useEffect, useState } from "react";

import {
  BriefcaseBusiness,
  Building2,
  FileText,
  Trophy,
} from "lucide-react";

import { getHomepageStats } from "../../services/jobService";

export default function HomeStatistics() {

  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    applications: 0,
    success_rate: 95,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getHomepageStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      icon: <BriefcaseBusiness size={34} />,
      number: stats.jobs,
      label: "Active Jobs",
    },
    {
      icon: <Building2 size={34} />,
      number: stats.companies,
      label: "Companies",
    },
    {
      icon: <FileText size={34} />,
      number: stats.applications,
      label: "Applications",
    },
    {
      icon: <Trophy size={34} />,
      number: `${stats.success_rate}%`,
      label: "Hiring Success",
    },
  ];

  return (
    <section className="home-stats-section">

      <div className="home-stats-container">

        {cards.map((item, index) => (
          <div
            key={index}
            className="home-stats-card"
          >
            <div className="home-stats-icon">
              {item.icon}
            </div>

            <h2>{item.number}</h2>

            <p>{item.label}</p>
          </div>
        ))}

      </div>

    </section>
  );
}