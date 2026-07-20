import "./CompanySearch.css";
import { Search } from "lucide-react";

function CompanySearch({ searchTerm, setSearchTerm }) {
  return (
    <section className="companies-search">

      <div className="container">

        <div className="companies-search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search companies by name, industry or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

      </div>

    </section>
  );
}

export default CompanySearch;