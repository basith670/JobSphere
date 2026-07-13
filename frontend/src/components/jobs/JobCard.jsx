import "./JobCard.css";

import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Star,
  ArrowRight,
} from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">

      <div className="job-card-top">

        <div className="job-company-logo">
          {job.company_details.company_name.charAt(0)}
        </div>

        {job.is_featured && (
          <span className="featured-badge">
            <Star size={14} fill="currentColor" />
            Featured
          </span>
        )}

      </div>

      <h3>{job.title}</h3>

      <h4>{job.company_details.company_name}</h4>

      <div className="job-info">

        <div>
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>

        <div>
          <BriefcaseBusiness size={16} />
          <span>{job.job_type}</span>
        </div>

      </div>

      <div className="experience-pill">
        {job.experience}
      </div>

      <div className="salary">

        <IndianRupee size={16} />

        <span>
          {(job.salary_min / 100000).toFixed(1)}L -
          {(job.salary_max / 100000).toFixed(1)}L
        </span>

      </div>

      <button className="apply-btn">

        Apply Now

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default JobCard;