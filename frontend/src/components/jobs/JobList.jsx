import JobCard from "./JobCard";

export default function JobList({ jobs }) {
  if (!jobs.length) {
    return <p>No jobs found.</p>;
  }

  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}