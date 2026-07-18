import "./HomeHowItWorks.css";

import {
  UserPlus,
  FileText,
  Brain,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={34} />,
    number: "01",
    title: "Create Your Profile",
    description:
      "Sign up as a candidate or recruiter and complete your professional profile.",
  },
  {
    icon: <FileText size={34} />,
    number: "02",
    title: "Build Your Resume",
    description:
      "Upload your resume or create one using our Resume Manager and ATS tools.",
  },
  {
    icon: <Brain size={34} />,
    number: "03",
    title: "Get AI Assistance",
    description:
      "Receive AI-powered job recommendations, resume analysis, and interview practice.",
  },
  {
    icon: <Trophy size={34} />,
    number: "04",
    title: "Get Hired",
    description:
      "Apply to jobs, track your applications, and land your dream opportunity.",
  },
];

export default function HomeHowItWorks() {
  return (
    <section className="home-work-section">

      <div className="home-work-container">

        <span className="home-work-tag">
          Simple Process
        </span>

        <h2 className="home-work-heading">
          How JobSphere Works
        </h2>

        <p className="home-work-description">
          Everything you need to move from creating a profile to securing your next job.
        </p>

        <div className="home-work-timeline">

          {steps.map((step, index) => (

            <div
              key={index}
              className="home-work-card"
            >

              <div className="home-work-number">
                {step.number}
              </div>

              <div className="home-work-icon">
                {step.icon}
              </div>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}