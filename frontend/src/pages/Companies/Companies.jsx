import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";

import "./Companies.css";

import CompanyHero from "./components/CompanyHero";
import CompanySearch from "./components/CompanySearch";
import CompanyGrid from "./components/CompanyGrid";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/companies/");
      setCompanies(response.data.results);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const search = searchTerm.toLowerCase();

      return (
        company.company_name.toLowerCase().includes(search) ||
        company.industry.toLowerCase().includes(search) ||
        company.location.toLowerCase().includes(search)
      );
    });
  }, [companies, searchTerm]);

  if (loading) {
    return (
      <div className="companies-loading">
        <h2>Loading Companies...</h2>
      </div>
    );
  }

  return (
<main className="companies-page">

      <CompanyHero />

      <CompanySearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CompanyGrid
        companies={filteredCompanies}
      />

    </main>
  );
}

export default Companies;