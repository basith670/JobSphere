import "./HowItWorks.css";
import {
  UserPlus,
  FileText,
  BrainCircuit,
  BriefcaseBusiness,
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={34} />,
    title: "Create Your Account",
    description:
      "Register as a candidate or recruiter and complete your professional profile.",
  },
  {
    icon: <FileText size={34} />,
    title: "Upload Resume",
    description:
      "Upload your resume to receive AI-powered analysis and personalized suggestions.",
  },
  {
    icon: <BrainCircuit size={34} />,
    title: "AI Matches Jobs",
    description:
      "Our recommendation engine identifies the most relevant opportunities for you.",
  },
  {
    icon: <BriefcaseBusiness size={34} />,
    title: "Apply & Get Hired",
    description:
      "Apply with one click and track your applications from your dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">

      <div className="how-container">

        <div className="how-header">

          <span>Simple Process</span>

          <h2>How JobSphere Works</h2>

          <p>
            From creating your profile to landing your dream job,
            JobSphere simplifies every step.
          </p>

        </div>

        <div className="steps-grid">

          {steps.map((step, index) => (

            <div
              key={step.title}
              className="step-card"
            >

              <div className="step-number">
                {index + 1}
              </div>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;