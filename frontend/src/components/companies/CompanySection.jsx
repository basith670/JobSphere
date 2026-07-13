import { useEffect, useState } from "react";
import { getCompanies } from "../../services/companyService";
import CompanyCard from "./CompanyCard";
import "./CompanySection.css";

const CompanySection = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await getCompanies();

      // DRF pagination support
      if (data.results) {
        setCompanies(data.results);
      } else {
        setCompanies(data);
      }
    } catch (error) {
      console.error("Failed to load companies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="company-section">

      <div className="section-heading">

        <span>Trusted Companies</span>

        <h2>
          Work With Industry Leaders
        </h2>

        <p>
          Discover opportunities from verified companies hiring through
          JobSphere.
        </p>

      </div>

      {loading ? (
        <p className="loading">Loading companies...</p>
      ) : (
        <div className="company-grid">

          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default CompanySection;