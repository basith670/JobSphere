import "./AICareerHub.css";

import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaBriefcase,
  FaFileSignature,
  FaUserTie,
  FaComments,
  FaArrowRight,
  FaCheckCircle,
  FaBolt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function AICareerHub() {

  const stats = [
    {
      number: "6",
      label: "AI Tools",
      icon: <FaRobot />,
    },
    {
      number: "95%",
      label: "ATS Accuracy",
      icon: <FaCheckCircle />,
    },
    {
      number: "24/7",
      label: "AI Assistance",
      icon: <FaBolt />,
    },
    {
      number: "100%",
      label: "Free for Job Seekers",
      icon: <FaBriefcase />,
    },
  ];

  const features = [
    {
      title: "Resume Analyzer",
      description:
        "Get ATS score and AI feedback for your resume.",
      icon: <FaFileAlt />,
      path: "/resumes",
    },
    {
        title: "ATS Resume Score",
        description: "Optimize your resume for recruiter screening.",
        icon: <FaChartLine />,
        path: "/ats-score",
      },
    {
      title: "Job Match",
      description:
        "Find jobs best suited for your resume.",
      icon: <FaBriefcase />,
      path: "/job-match",
    },
    {
      title: "Cover Letter",
      description:
        "Generate personalized cover letters instantly.",
      icon: <FaFileSignature />,
      path: "/cover-letter",
    },
    {
      title: "AI Interview",
      description:
        "Practice HR and technical interview questions.",
      icon: <FaUserTie />,
      path: "/interview",
    },
    {
      title: "Mock Interview",
      description:
        "Experience realistic AI interview sessions.",
      icon: <FaComments />,
      path: "/mock-interview",
    },
  ];

  return (
    <div className="aihub-page">

      {/* Hero */}

      <div className="aihub-hero">

        <div>

          <div className="hero-badge">
            <FaRobot />
            <span>AI Powered Career Assistant</span>
          </div>

          <h1>
            AI Career Hub
          </h1>

          <p>
            Supercharge your career using AI tools designed
            to improve your resume, prepare for interviews,
            generate cover letters and discover better job
            opportunities.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="ai-stats">

        {stats.map((stat) => (

          <div
            key={stat.label}
            className="ai-stat-card"
          >

            <div className="ai-stat-icon">
              {stat.icon}
            </div>

            <h2>{stat.number}</h2>

            <p>{stat.label}</p>

          </div>

        ))}

      </div>

      {/* Features */}

      <div className="feature-grid">

        {features.map((feature) => (

          <Link
            key={feature.title}
            to={feature.path}
            className="feature-card"
          >

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>
              {feature.title}
            </h3>

            <p>
              {feature.description}
            </p>

            <div className="feature-link">
              Launch Tool
              <FaArrowRight />
            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}