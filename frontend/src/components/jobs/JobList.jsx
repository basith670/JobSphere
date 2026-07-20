import "./JobList.css";
import JobCard from "./JobCard";

export default function JobList({ jobs }) {

  if (!jobs.length) {
    return (
      <section className="jobs-wrapper section">
        <div className="container">
          <p className="no-jobs">
            No jobs found.
          </p>
        </div>
      </section>
    );
  }

  return (

    <section className="jobs-wrapper section">

      <div className="container">

        <div className="jobs-grid">

          {jobs.map((job) => (

            <JobCard
              key={job.id}
              job={job}
            />

          ))}

        </div>

      </div>

    </section>

  );

}