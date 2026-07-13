import "./JobCard.css";
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
} from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">

      <div className="job-top">

        <div>
          <h3>{job.title}</h3>

          <p>{job.company_name}</p>
        </div>

        <span className="job-type">
          {job.job_type}
        </span>

      </div>

      <div className="job-info">

        <span>
          <MapPin size={16}/>
          {job.location}
        </span>

        <span>
          <BriefcaseBusiness size={16}/>
          {job.experience}
        </span>

        <span>
          <IndianRupee size={16}/>
          {job.salary_min} - {job.salary_max}
        </span>

      </div>

      <button>
        Apply Now
      </button>

    </div>
  );
};

export default JobCard;