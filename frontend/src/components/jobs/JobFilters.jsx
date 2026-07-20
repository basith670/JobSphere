import "./JobFilters.css";
import { Search, RotateCcw } from "lucide-react";

export default function JobFilters({
  filters,
  setFilters,
}) {
  return (
        <section className="job-filters-wrapper">

        <div className="container">

          <div className="job-filters-card">

        {/* Header */}

        <div className="job-filters-header">

          <div>

            <span className="filter-subtitle">
              Find Your Next Opportunity
            </span>

            <h2>
              Filter Jobs
            </h2>

          </div>

          <button
            className="reset-filter-btn"
            onClick={() =>
              setFilters({
                search: "",
                job_type: "",
                experience: "",
                ...(filters.company && {
                  company: filters.company,
                }),
              })
            }
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

        {/* Filters */}

        <div className="job-filters">

          {/* Search */}

          <div className="filter-group">

            <label>
              <Search size={16} />
              Search
            </label>

            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
            />

          </div>

          {/* Job Type */}

          <div className="filter-group">

            <label>
              Job Type
            </label>

            <select
              value={filters.job_type || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  job_type: e.target.value,
                })
              }
            >
              <option value="">All Job Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

          </div>

          {/* Experience */}

          <div className="filter-group">

            <label>
              Experience
            </label>

            <select
              value={filters.experience || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  experience: e.target.value,
                })
              }
            >
              <option value="">All Levels</option>
              <option value="0-1 Years">
                0–1 Years
              </option>
              <option value="1-2 Years">
                1–2 Years
              </option>
              <option value="3-5 Years">
                3–5 Years
              </option>
            </select>

          </div>

        </div>

        </div>

      </div>

      </section>
  );
}