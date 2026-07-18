import "./CompanySearch.css";
import { Search } from "lucide-react";

function CompanySearch({ searchTerm, setSearchTerm }) {
  return (
    <section className="companies-search">

      <div className="companies-search-box">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

    </section>
  );
}

export default CompanySearch;