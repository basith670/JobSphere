import "./AIFeatures.css";
import {
  Sparkles,
  FileSearch,
  BrainCircuit,
} from "lucide-react";

const features = [
  {
    icon: <FileSearch size={36} />,
    title: "AI Resume Review",
    description:
      "Receive intelligent resume analysis with personalized suggestions to improve your chances of getting shortlisted.",
  },
  {
    icon: <Sparkles size={36} />,
    title: "Smart Job Matching",
    description:
      "Get AI-powered recommendations based on your skills, experience, and career goals.",
  },
  {
    icon: <BrainCircuit size={36} />,
    title: "AI Interview Practice",
    description:
      "Prepare for interviews with AI-generated questions and instant feedback.",
  },
];

const AIFeatures = () => {
  return (
    <section className="ai-features">

      <div className="ai-container">

        <div className="ai-header">

          <span>AI Powered Platform</span>

          <h2>Built to Help You Get Hired Faster</h2>

          <p>
            JobSphere combines intelligent automation with modern recruitment
            tools to simplify every step of your career journey.
          </p>

        </div>

        <div className="ai-grid">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="ai-card"
            >
              <div className="ai-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default AIFeatures;