import "./Hero.css";

import {
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  FileText,
} from "lucide-react";

import DashboardPreview from "../../components/home/DashboardPreview";
import FloatingCard from "../../components/home/FloatingCard";
import MiniChart from "../../components/home/MiniChart";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT CONTENT */}

        <div className="hero-left">

          <span className="hero-badge">
            <Sparkles size={16} />
            AI Powered Recruitment Platform
          </span>

          <h1>
            Hire Smarter.
            <br />
            Get Hired Faster.
          </h1>

          <p>
            JobSphere connects companies and candidates through intelligent
            matching, resume analysis, and AI-driven hiring insights.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="secondary-btn">
              Browse Jobs
            </button>

          </div>

          <div className="hero-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
            />

            <button>Search</button>

          </div>

        </div>

        {/* RIGHT CONTENT */}

        <div className="hero-right">

          <DashboardPreview />

          <FloatingCard
            title="Resume Score"
            value="94%"
            icon={<FileText size={22} />}
          />

          <FloatingCard
            title="Verified Companies"
            value="320+"
            icon={<ShieldCheck size={22} />}
          />

          <MiniChart />

        </div>

      </div>
    </section>
  );
};

export default Hero;