import "./TrustedCompanies.css";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Adobe",
  "Spotify",
  "Atlassian",
  "Stripe",
  "Notion",
];

const TrustedCompanies = () => {
  return (
    <section className="trusted">

      <div className="trusted-heading">

        <span>Trusted by Leading Companies</span>

        <h2>
          Connecting Top Talent
          <br />
          with Industry Leaders
        </h2>

        <p>
          Thousands of professionals and hundreds of companies
          trust JobSphere to streamline hiring with AI.
        </p>

      </div>

      <div className="company-strip">

        {companies.map((company) => (
          <div
            className="company-card"
            key={company}
          >
            {company}
          </div>
        ))}

      </div>

    </section>
  );
};

export default TrustedCompanies;