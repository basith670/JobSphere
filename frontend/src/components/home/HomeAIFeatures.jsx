import "./HomeAIFeatures.css";

import {
  Brain,
  FileSearch,
  Mic,
  Target,
  Sparkles,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={32} />,
    title: "AI Resume Analyzer",
    description:
      "Analyze resumes instantly and receive ATS scores with personalized improvement suggestions.",
  },
  {
    icon: <Mic size={32} />,
    title: "AI Mock Interview",
    description:
      "Practice technical and HR interviews with AI-generated questions and real-time feedback.",
  },
  {
    icon: <Target size={32} />,
    title: "Smart Job Matching",
    description:
      "Our recommendation engine connects candidates with jobs that fit their skills and experience.",
  },
  {
    icon: <FileSearch size={32} />,
    title: "ATS Resume Score",
    description:
      "Check resume compatibility before applying and improve your chances of getting shortlisted.",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Career Suggestions",
    description:
      "Receive personalized recommendations for skills, certifications, and career growth.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Recruitment Analytics",
    description:
      "Employers gain valuable hiring insights through detailed recruitment analytics dashboards.",
  },
];

export default function HomeAIFeatures() {
  return (
      <section className="home-ai-section section">

      <div className="container">

        <div className="home-ai-container">

        <span className="home-ai-tag">
          AI Powered Platform
        </span>

        <h2 className="home-ai-heading">
          Everything You Need to Get Hired Faster
        </h2>

        <p className="home-ai-description">
          JobSphere combines artificial intelligence with modern recruitment
          tools to help candidates and recruiters achieve better outcomes.
        </p>

        <div className="home-ai-grid">

          {features.map((feature, index) => (

            <div
              key={index}
              className="home-ai-card"
            >

              <div className="home-ai-icon">
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.description}
              </p>

              <button className="home-ai-button">

                Learn More

                <ArrowRight size={18} />

              </button>

            </div>

          ))}

        </div>

        </div>

</div>

</section>
  );
}