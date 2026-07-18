import "./JobList.css";
import JobCard from "./JobCard";

export default function JobList({ jobs }) {

  if (!jobs.length) {
    return <p className="no-jobs">No jobs found.</p>;
  }

  return (

    <section className="jobs-wrapper">

      <div className="jobs-grid">

        {jobs.map((job) => (

          <JobCard
            key={job.id}
            job={job}
          />

        ))}

      </div>

    </section>

  );

}