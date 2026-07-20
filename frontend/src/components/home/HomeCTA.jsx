import "./HomeCTA.css";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Users } from "lucide-react";

export default function HomeCTA() {
  return (
<section className="home-cta-section section">

<div className="container">

  <div className="home-cta-container">

        <span className="home-cta-tag">
          Ready to Get Started?
        </span>

        <h2 className="home-cta-heading">
          Build Your Career or Hire Top Talent with JobSphere
        </h2>

        <p className="home-cta-description">
          Join thousands of candidates and recruiters already using AI-powered
          hiring tools to achieve better results.
        </p>

        <div className="home-cta-buttons">

          <Link
            to="/jobs"
            className="home-cta-primary"
          >
            <BriefcaseBusiness size={20} />

            Explore Jobs

            <ArrowRight size={18} />
          </Link>

          <Link
            to="/register"
            className="home-cta-secondary"
          >
            <Users size={20} />

            Hire Talent
          </Link>

        </div>

        </div>

      </div>

      </section>
  );
}