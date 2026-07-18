import "./TrustedCompanies.css";

import google from "../../assets/companies/google.png";

import microsoft from "../../assets/companies/microsoft.png";

import amazon from "../../assets/companies/amazon.png";

import adobe from "../../assets/companies/adobe.png";

import netflix from "../../assets/companies/netflix.png";

import meta from "../../assets/companies/meta.png";

const companies = [
  {
    id: 1,
    name: "Google",
    logo: google,
  },
  {
    id: 2,
    name: "Microsoft",
    logo: microsoft,
  },
  {
    id: 3,
    name: "Amazon",
    logo: amazon,
  },
  {
    id: 4,
    name: "Adobe",
    logo: adobe,
  },
  {
    id: 5,
    name: "Meta",
    logo: meta,
  },
  {
    id: 6,
    name: "Netflix",
    logo: netflix,
  },
];
export default function TrustedCompanies() {
  return (
    <section className="home-trusted-section">

      <div className="home-trusted-container">

        <p className="home-trusted-title">
          Trusted by Leading Companies Worldwide
        </p>

        <div className="home-trusted-slider">

          <div className="home-trusted-track">

            {[...companies, ...companies].map((company, index) => (

              <div
                key={index}
                className="home-trusted-item"
              >

                <img
                  src={company.logo}
                  alt={company.name}
                />

                <span>
                  {company.name}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}