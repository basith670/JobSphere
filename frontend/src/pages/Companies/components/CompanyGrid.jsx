import "./CompanyGrid.css";
import CompanyCard from "./CompanyCard";

function CompanyGrid({ companies }) {
  return (
    <section className="companies-grid-section">

      <div className="companies-grid">

        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))
        ) : (
          <div className="companies-empty">
            <h3>No companies found.</h3>
          </div>
        )}

      </div>

    </section>
  );
}

export default CompanyGrid;