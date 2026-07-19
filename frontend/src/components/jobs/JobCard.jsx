import "./JobCard.css";
import { Link } from "react-router-dom";

import {
  MapPin,
  BriefcaseBusiness,
  Star,
  ArrowRight,
} from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/jobs/details/${job.id}`}
      className="job-card-link"
    >
      <div className="job-card">

        {/* Header */}
        <div className="job-card-top">

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

          {job.is_featured && (
            <span className="featured-badge">
              <Star
                size={14}
                fill="currentColor"
              />
              Featured
            </span>
          )}

        </div>

        {/* Title */}
        <h3 className="job-title">
          {job.title}
        </h3>

        <h4 className="company-name">
          {job.company_name}
        </h4>

        {/* Location & Type */}
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

        {/* Divider */}
        <div className="job-divider"></div>

        {/* Highlights */}
        <div className="job-highlights">

          <div className="highlight-box">
            <span className="highlight-label">
              Experience
            </span>

            <strong>
              {job.experience}
            </strong>
          </div>

          <div className="highlight-box">
            <span className="highlight-label">
              Salary
            </span>

            <strong>
              ₹{(Number(job.salary_min) / 100000).toFixed(1)}L -
              ₹{(Number(job.salary_max) / 100000).toFixed(1)}L
            </strong>
          </div>

        </div>

        {/* Footer */}
        <div className="job-card-footer">

          <button className="apply-btn">
            Job Details
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </Link>
  );
};

export default JobCard;