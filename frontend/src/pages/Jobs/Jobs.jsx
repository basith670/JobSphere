import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import JobFilters from "../../components/jobs/JobFilters";
import JobList from "../../components/jobs/JobList";

import { getJobs } from "../../services/jobService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const companyId = searchParams.get("company");

  const [filters, setFilters] = useState(() => ({
    ...(companyId ? { company: companyId } : {}),
  }));

  useEffect(() => {
    if (companyId) {
      setFilters((prev) => ({
        ...prev,
        company: companyId,
      }));
    }
  }, [companyId]);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);

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