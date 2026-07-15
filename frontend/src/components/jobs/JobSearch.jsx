import "./JobSearch.css";
import { useState } from "react";

export default function JobSearch({ onSearch }) {
  const [search, setSearch] = useState("");

  return (
    <div className="job-search">
      <input
        type="text"
        placeholder="Search jobs, companies, skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => onSearch(search)}>
        Search
      </button>
    </div>
  );
}