import "./CompanyShowcase.css";

import google from "../../assets/companies/google.png";
import microsoft from "../../assets/companies/microsoft.png";
import amazon from "../../assets/companies/amazon.png";
import meta from "../../assets/companies/meta.png";
import adobe from "../../assets/companies/adobe.png";
import netflix from "../../assets/companies/netflix.png";

import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "Google",
    industry: "Technology",
    jobs: 124,
    employees: "180K+",
    logo: google,
  },
  {
    id: 2,
    name: "Microsoft",
    industry: "Software",
    jobs: 98,
    employees: "220K+",
    logo: microsoft,
  },
  {
    id: 3,
    name: "Amazon",
    industry: "E-Commerce",
    jobs: 152,
    employees: "1.5M+",
    logo: amazon,
  },
  {
    id: 4,
    name: "Meta",
    industry: "Social Media",
    jobs: 86,
    employees: "86K+",
    logo: meta,
  },
  {
    id: 5,
    name: "Adobe",
    industry: "Creative Software",
    jobs: 41,
    employees: "30K+",
    logo: adobe,
  },
  {
    id: 6,
    name: "Netflix",
    industry: "Entertainment",
    jobs: 29,
    employees: "13K+",
    logo: netflix,
  },
];

export default function CompanyShowcase() {

    const navigate = useNavigate();
  return (
    <section className="home-company-section">

      <div className="home-company-container">

        <span className="home-company-tag">
          Trusted Companies
        </span>

        <h2 className="home-company-heading">
          Work With Industry Leaders
        </h2>

        <p className="home-company-description">
          Join the world's leading companies that trust JobSphere
          to discover exceptional talent.
        </p>

        <div className="home-company-grid">

          {companies.map((company) => (

            <div
              key={company.id}
              className="home-company-card"
            >

              <div className="home-company-logo-wrapper">

                <img
                  src={company.logo}
                  alt={company.name}
                  className="home-company-logo"
                />

              </div>

              <h3>
                {company.name}
              </h3>

              <p>
                {company.industry}
              </p>

              <div className="home-company-stats">

                <div>

                  <strong>
                    {company.jobs}
                  </strong>

                  <span>Open Jobs</span>

                </div>

                <div>

                  <strong>
                    {company.employees}
                  </strong>

                  <span>Employees</span>

                </div>

              </div>

              <button
                className="home-company-button"
                onClick={() => navigate("/companies")}
                >
                View Company
                <ArrowRight size={18} />
                </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}