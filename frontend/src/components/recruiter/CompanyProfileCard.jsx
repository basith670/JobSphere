import {
    FaBuilding,
    FaGlobe,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaUsers,
    FaCalendarAlt,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaCheckCircle,
    FaEdit,
  } from "react-icons/fa";
  
  const CompanyProfileCard = ({ company, onEdit }) => {
    return (
      <div className="company-profile-card">
  
        <div className="company-profile-header">
  
          <div className="company-logo-section">
  
            <div className="logo-wrapper">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.company_name}
                />
              ) : (
                <FaBuilding className="default-logo" />
              )}
            </div>
  
            <h2>{company.company_name}</h2>
  
            <p>{company.industry || "Not specified"}</p>
  
            {company.is_verified && (
              <span className="verified-badge">
                <FaCheckCircle />
                Verified Company
              </span>
            )}
  
          </div>
  
          <button
            className="edit-company-btn"
            onClick={onEdit}
          >
            <FaEdit />
            Edit Profile
          </button>
  
        </div>
  
        {/* ================= INFO ================= */}
  
        <div className="company-info-grid">
  
          <div className="info-card">
            <FaGlobe />
            <div>
              <h4>Website</h4>
  
              <p>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-link"
                  >
                    {company.website}
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
  
            </div>
          </div>
  
          <div className="info-card">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>
                {company.email ? (
                    <a
                    href={`mailto:${company.email}`}
                    className="company-link"
                    >
                    {company.email}
                    </a>
                ) : (
                    "Not provided"
                )}
                </p>
            </div>
          </div>
  
          <div className="info-card">
            <FaPhone />
            <div>
              <h4>Phone</h4>
              <p>
                {company.phone ? (
                    <a
                    href={`tel:${company.phone}`}
                    className="company-link"
                    >
                    {company.phone}
                    </a>
                ) : (
                    "Not provided"
                )}
                </p>
            </div>
          </div>
  
          <div className="info-card">
            <FaMapMarkerAlt />
            <div>
              <h4>Location</h4>
              <p>{company.location || "Not provided"}</p>
            </div>
          </div>
  
          <div className="info-card">
            <FaUsers />
            <div>
              <h4>Company Size</h4>
              <p>{company.company_size || "Not provided"}</p>
            </div>
          </div>
  
          <div className="info-card">
            <FaCalendarAlt />
            <div>
              <h4>Founded</h4>
              <p>{company.founded_year || "Not provided"}</p>
            </div>
          </div>
  
        </div>
  
        {/* ================= ABOUT ================= */}
  
        <div className="about-company-card">
  
          <h3>About Company</h3>
  
          <p>
            {company.description || "No company description available."}
          </p>
  
        </div>
  
        {/* ================= SOCIAL ================= */}
  
        <div className="social-links-card">
  
          <h3>Social Links</h3>
  
          <div className="social-grid">
  
            <div>
              <FaLinkedin />
  
              {company.linkedin ? (
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                >
                  LinkedIn Profile
                </a>
              ) : (
                <span>Not provided</span>
              )}
  
            </div>
  
            <div>
              <FaTwitter />
  
              {company.twitter ? (
                <a
                  href={company.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                >
                  Twitter Profile
                </a>
              ) : (
                <span>Not provided</span>
              )}
  
            </div>
  
            <div>
              <FaFacebook />
  
              {company.facebook ? (
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                >
                  Facebook Page
                </a>
              ) : (
                <span>Not provided</span>
              )}
  
            </div>
  
          </div>
  
        </div>
  
      </div>
    );
  };
  
  export default CompanyProfileCard;