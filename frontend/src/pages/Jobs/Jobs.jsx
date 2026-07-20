import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import JobFilters from "../../components/jobs/JobFilters";
import JobList from "../../components/jobs/JobList";

import { getJobs } from "../../services/jobService";

import "./Jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const resultsRef = useRef(null);

  const [searchParams] = useSearchParams();

  const companyId = searchParams.get("company");

  const [filters, setFilters] = useState(() => ({
    search: "",
    job_type: "",
    experience: "",
    ...(companyId ? { company: companyId } : {}),
  }));

  // Update company filter when coming from Companies page
  useEffect(() => {
    if (companyId) {
      setFilters((prev) => ({
        ...prev,
        company: companyId,
      }));
    }
  }, [companyId]);

  // Load jobs ONLY when page loads or company changes
  useEffect(() => {
    fetchJobs();
  }, [filters.company]);

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const { search, job_type, experience, ...apiFilters } = filters;

      const data = await getJobs(apiFilters);

      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Frontend Filtering
  // ===========================

  const filteredJobs = jobs.filter((job) => {
    const search = filters.search.toLowerCase().trim();

    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search) ||
      job.company_name.toLowerCase().includes(search);

    const matchesJobType =
      !filters.job_type ||
      job.job_type === filters.job_type;

    const matchesExperience =
      !filters.experience ||
      job.experience === filters.experience;

    return (
      matchesSearch &&
      matchesJobType &&
      matchesExperience
    );
  });

  // ===========================
  // Smooth Scroll
  // ===========================

  useEffect(() => {
    if (
      !filters.search &&
      !filters.job_type &&
      !filters.experience
    ) {
      return;
    }

    const timer = setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    filters.search,
    filters.job_type,
    filters.experience,
    filteredJobs.length,
  ]);

  if (loading) {
    return <h2>Loading Jobs...</h2>;
  }

  return (
    <div className="jobs-page">

      {/* Hero */}
      <section className="jobs-hero section">

    <div className="container">

      <div className="jobs-hero-content">

          <h1>Find Your Dream Job</h1>

          <p>
            Discover verified opportunities from top companies,
            connect with recruiters, and take the next step in your career.
          </p>

          <div className="jobs-search">
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
            />
          </div>

          </div>

      </div>

      </section>

      {/* Filters */}
      <JobFilters
        filters={filters}
        setFilters={setFilters}
      />

      {/* Results */}
      <section
          className="jobs-results"
          ref={resultsRef}
      >

          <div className="container">
        <h2>Available Jobs</h2>

        <p>
          Showing {filteredJobs.length}{" "}
          {filteredJobs.length === 1 ? "opportunity" : "opportunities"}
        </p>
        </div>

      </section>

      {/* Job Cards */}
      <JobList jobs={filteredJobs} />

    </div>
  );
}