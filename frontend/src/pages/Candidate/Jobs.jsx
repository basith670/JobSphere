import { useEffect, useState } from "react";

import { getJobs } from "../../services/jobService";
import JobList from "../../components/jobs/JobList";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      console.log(data)

      console.log("API Response:", data);
      console.log("Jobs:", data.results);

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

      <h3 style={{ margin: "20px 0" }}>
        {jobs.length} Jobs Found
      </h3>

      <JobList jobs={jobs} />
    </div>
  );
}