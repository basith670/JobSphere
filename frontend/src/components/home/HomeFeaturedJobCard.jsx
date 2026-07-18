import "./HomeFeaturedJobCard.css";

import { Link } from "react-router-dom";

import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Star,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

export default function HomeFeaturedJobCard({ job }) {

  return (

    <div className="home-featured-card">

      {/* Top */}

      <div className="home-featured-card-header">

        <div className="home-featured-company">

          <div className="home-featured-company-logo">

            {job.company_logo ? (

              <img
                src={job.company_logo}
                alt={job.company_name}
              />

            ) : (

              <span>
                {job.company_name?.charAt(0)}
              </span>

            )}

          </div>

          <div>

            <h3>
              {job.company_name}
            </h3>

            <p>
              {job.location}
            </p>

          </div>

        </div>

        {job.is_featured && (

          <div className="home-featured-badge">

            <Star
              size={14}
              fill="currentColor"
            />

            Featured

          </div>

        )}

      </div>

      {/* Job */}

      <h2 className="home-featured-job-title">

        {job.title}

      </h2>

      {/* Info */}

      <div className="home-featured-info">

        <div>

          <MapPin size={16} />

          {job.location}

        </div>

        <div>

          <BriefcaseBusiness size={16} />

          {job.job_type}

        </div>

      </div>

      {/* Skills */}

      <div className="home-featured-skills">

        {job.skills_required
          ?.split(",")
          .slice(0,3)
          .map((skill,index)=>(

            <span key={index}>

              {skill.trim()}

            </span>

        ))}

      </div>

      {/* Bottom */}

      <div className="home-featured-footer">

        <div>

          <div className="home-featured-salary">

            <IndianRupee size={16}/>

            ₹{(Number(job.salary_min)/100000).toFixed(1)}L -
            ₹{(Number(job.salary_max)/100000).toFixed(1)}L

          </div>

          <div className="home-featured-deadline">

            <CalendarDays size={15}/>

            {job.deadline}

          </div>

        </div>

        <Link
          to={`/jobs/details/${job.id}`}
          className="home-featured-apply"
        >

          Apply

          <ArrowRight size={18}/>

        </Link>

      </div>

    </div>

  );

}