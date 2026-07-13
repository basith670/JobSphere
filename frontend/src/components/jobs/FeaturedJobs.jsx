import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import "./FeaturedJobs.css";

import { getFeaturedJobs } from "../../services/jobService";
import JobCard from "./JobCard";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getFeaturedJobs();
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="featured-jobs">
        <div className="jobs-container">
          <p className="loading-text">Loading featured jobs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-jobs">
        <div className="jobs-container">
          <p className="error-text">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-jobs">

      <div className="jobs-container">

        <div className="jobs-header">

          <div>

            <span className="section-tag">
              Featured Opportunities
            </span>

            <h2>Find Your Dream Job</h2>

            <p>
              Explore hand-picked opportunities from the world's leading
              companies.
            </p>

          </div>

          <button className="view-all-btn">
            View All Jobs
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="jobs-grid">

          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedJobs;