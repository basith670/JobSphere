import "./JobFilters.css";

export default function JobFilters({
  filters,
  setFilters,
}) {
  return (
    <section className="job-filters-wrapper">

      <div className="job-filters-header">

        <h3>Filter Jobs</h3>

        <button
          className="reset-filter-btn"
          onClick={() =>
            setFilters({})
          }
        >
          Reset
        </button>

      </div>

      <div className="job-filters">

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
            <option value="0-1 Years">0–1 Years</option>
            <option value="1-2 Years">1–2 Years</option>
            <option value="3-5 Years">3–5 Years</option>
          </select>

        </div>

      </div>

    </section>
  );
}