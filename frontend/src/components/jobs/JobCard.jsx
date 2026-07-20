import "./JobCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  MapPin,
  BriefcaseBusiness,
  Star,
  ArrowRight,
  Bookmark,
} from "lucide-react";

import {
  saveJob,
  unsaveJob,
} from "../../services/jobService";

const JobCard = ({ job, onSaveToggle }) => {
  const [saved, setSaved] = useState(job.is_saved);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    setLoading(true);

    try {
      if (saved) {
        await unsaveJob(job.id);
        setSaved(false);

        onSaveToggle?.(job.id, false);
      } else {
        await saveJob(job.id);
        setSaved(true);

        onSaveToggle?.(job.id, true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const salary =
    job.salary_min && job.salary_max
      ? `₹${(Number(job.salary_min) / 100000).toFixed(1)}L - ₹${(
          Number(job.salary_max) / 100000
        ).toFixed(1)}L`
      : "Not Disclosed";

  return (
    <Link
      to={`/jobs/details/${job.id}`}
      className="job-card-link"
    >
      <article className="job-card">
        {/* Top */}

        <div className="job-card-top">
          <div className="job-company">
            <div className="job-company-logo">
              {job.company_logo ? (
                <img
                  src={job.company_logo}
                  alt={job.company_name}
                  className="company-logo-img"
                />
              ) : (
                <span className="company-initial">
                  {job.company_name?.charAt(0)}
                </span>
              )}
            </div>

            <div className="job-company-details">
              <h4>{job.company_name}</h4>

              <span className="company-tag">
                Hiring Now
              </span>
            </div>
          </div>

          <div className="job-card-actions">
            <button
              className={`save-job-btn ${
                saved ? "saved" : ""
              }`}
              onClick={handleSave}
              disabled={loading}
            >
              <Bookmark
                size={19}
                fill={saved ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        {/* Featured */}

        {job.is_featured && (
          <div className="featured-row">
            <span className="featured-badge">
              <Star
                size={14}
                fill="currentColor"
              />
              Featured Opportunity
            </span>
          </div>
        )}

        {/* Title */}

        <h3 className="job-title">
          {job.title}
        </h3>

        {/* Info */}

        <div className="job-info">
          <div className="job-info-item">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>

          <div className="job-info-item">
            <BriefcaseBusiness size={16} />
            <span>{job.job_type}</span>
          </div>
        </div>

        <div className="job-divider"></div>

        {/* Highlights */}

        <div className="job-highlights">
          <div className="highlight-box">
            <span className="highlight-label">
              Experience
            </span>

            <strong>{job.experience}</strong>
          </div>

          <div className="highlight-box salary-box">
            <span className="highlight-label">
              Salary
            </span>

            <strong>{salary}</strong>
          </div>
        </div>

        {/* Footer */}

        <div className="job-card-footer">
          <button className="apply-btn">
            View Details

            <ArrowRight size={18} />
          </button>
        </div>
      </article>
    </Link>
  );
};

export default JobCard;