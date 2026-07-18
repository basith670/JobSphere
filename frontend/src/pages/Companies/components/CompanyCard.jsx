import "./CompanyCard.css";
import { MapPin, Users, Globe, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CompanyCard({ company }) {
  const navigate = useNavigate();

  const handleViewJobs = () => {
    navigate(`/jobs?company=${company.id}`);
  };

  return (
    <div className="company-card">

      <div className="company-card-header">

        <img
          src={company.logo}
          alt={company.company_name}
          className="company-card-logo"
        />

        <div className="company-card-info">

          <h3>
            {company.company_name}

            {company.is_verified && (
              <BadgeCheck
                size={18}
                className="company-card-verified"
              />
            )}

          </h3>

          <span>{company.industry}</span>

        </div>

      </div>

      <div className="company-card-meta">

        <p>
          <MapPin size={16} />
          {company.location}
        </p>

        <p>
          <Users size={16} />
          {company.company_size}
        </p>

      </div>

      <p className="company-card-description">
        {company.description}
      </p>

      <div className="company-card-buttons">

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="company-card-website"
          >
            <Globe size={18} />
            Website
          </a>
        )}

        <button
          className="company-card-jobs"
          onClick={handleViewJobs}
        >
          View Jobs
        </button>

      </div>

    </div>
  );
}

export default CompanyCard;