import "./CompanyCard.css";
import {
  MapPin,
  Building2,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const CompanyCard = ({ company }) => {
  return (
    <div className="company-card">

      <div className="company-logo">

        {company.company_name.charAt(0)}

      </div>

      <h3>{company.company_name}</h3>

      <p className="industry">

        <Building2 size={16} />

        {company.industry}

      </p>

      <p className="location">

        <MapPin size={16} />

        {company.location}

      </p>

      <p className="size">
        {company.company_size} Employees
      </p>

      {company.is_verified && (
        <div className="verified">

          <BadgeCheck size={16} />

          Verified Company

        </div>
      )}

      <button className="company-btn">

        View Jobs

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default CompanyCard;