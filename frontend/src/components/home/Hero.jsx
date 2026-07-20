import "./Hero.css";

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardPreview from "./DashboardPreview";
import FloatingCard from "./FloatingCard";
import MiniChart from "./MiniChart";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const accessToken = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!accessToken) {
      navigate("/register");
      return;
    }

    if (role === "jobseeker") {
      navigate("/dashboard");
    } else if (role === "recruiter") {
      navigate("/recruiter/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="home-hero">
      <div className="container">
        <div className="home-hero-container">

          {/* Left Side */}
          <div className="home-hero-left">

            <span className="home-hero-badge">
              <Sparkles size={16} />
              AI Recruitment • Resume Analysis • Smart Hiring
            </span>

            <h1 className="home-hero-title">
              The Future of
              <br />
              <span>AI Recruitment</span>
              <br />
              Starts Here.
            </h1>

            <p className="home-hero-description">
              Find your dream job or hire exceptional talent with AI-powered
              resume analysis, intelligent job matching, mock interviews,
              ATS scoring, and advanced recruitment tools—all in one platform.
            </p>

            <div className="home-hero-buttons">
              <button
                className="home-hero-primary-btn"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="home-hero-trust">
              <div className="home-hero-trust-item">
                <h3>10K+</h3>
                <span>Candidates</span>
              </div>

              <div className="home-hero-trust-item">
                <h3>500+</h3>
                <span>Companies</span>
              </div>

              <div className="home-hero-trust-item">
                <h3>96%</h3>
                <span>AI Accuracy</span>
              </div>
            </div>

          </div>

          {/* Right Side */}
          <div className="home-hero-right">

            <DashboardPreview />

            <FloatingCard
              className="home-hero-resume-card"
              title="Resume Score"
              value="94%"
              icon={<FileText size={22} />}
            />

            <FloatingCard
              className="home-hero-company-card"
              title="Verified Companies"
              value="320+"
              icon={<ShieldCheck size={22} />}
            />

            <MiniChart />

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;