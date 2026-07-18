import { useEffect, useState } from "react";

import JobFilters from "../../components/jobs/JobFilters";
import JobList from "../../components/jobs/JobList";

import { getJobs } from "../../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const data = await getJobs(filters);
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Jobs...</h2>;
  }

  return (
    <>
      <JobFilters
        filters={filters}
        setFilters={setFilters}
      />

      <JobList jobs={jobs} />
    </>
  );
}