import { useEffect, useState } from "react";

import { getJobs } from "../../services/jobService";

import JobSearch from "../../components/jobs/JobSearch";
import JobList from "../../components/jobs/JobList";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const loadJobs = async (query = "") => {
    try {
      const data = await getJobs({
        search: query,
      });

      setJobs(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>
        Browse Jobs
      </h1>

      <JobSearch
        search={search}
        setSearch={setSearch}
        onSearch={() => loadJobs(search)}
      />

      <h3 style={{ margin: "20px 0" }}>
        {jobs.length} Jobs Found
      </h3>

      <JobList jobs={jobs} />
    </div>
  );
}

const loadJobs = async (query = "") => {
    try {
      const data = await getJobs({
        search: query,
      });
  
      console.log("API Response:", data);
      console.log("Jobs:", data.results);
  
      setJobs(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };