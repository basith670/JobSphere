import "./CTA.css";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="cta">

      <div className="cta-container">

        <span>Ready to Start?</span>

        <h2>
          Find Your Next Opportunity with JobSphere
        </h2>

        <p>
          Join thousands of professionals and companies using AI-powered
          recruitment to hire smarter and get hired faster.
        </p>

        <div className="cta-buttons">

          <button className="cta-primary">
            Browse Jobs
            <ArrowRight size={18} />
          </button>

          <button className="cta-secondary">
            Post a Job
          </button>

        </div>

      </div>

    </section>
  );
};

export default CTA;