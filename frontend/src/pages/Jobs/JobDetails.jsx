import "./JobDetails.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJob } from "../../services/jobService";
import ApplyModal from "../../components/jobs/ApplyModal";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await getJob(id);
      setJob(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!job) {
    return <h2>Job not found.</h2>;
  }

  return (
    <>
      <div className="job-details-page">

        <div className="job-header">

          <div className="company-logo">
            {job.company_name?.charAt(0)}
          </div>

          <h1 className="job-title">
            {job.title}
          </h1>

          <div className="company-name">
            {job.company_name}
          </div>

          <div className="job-location">
            📍 {job.location}
          </div>

          <div className="job-meta">

            <div className="meta-card">
              <h4>Salary</h4>
              <p>
                ₹{(Number(job.salary_min) / 100000).toFixed(1)}L -
                ₹{(Number(job.salary_max) / 100000).toFixed(1)}L
              </p>
            </div>

            <div className="meta-card">
              <h4>Experience</h4>
              <p>{job.experience}</p>
            </div>

            <div className="meta-card">
              <h4>Job Type</h4>
              <p>{job.job_type}</p>
            </div>

            <div className="meta-card">
              <h4>Vacancies</h4>
              <p>{job.vacancies}</p>
            </div>

          </div>

          <button
                className="apply-btn"
                onClick={() => {
                    console.log("Apply button clicked");
                    setShowModal(true);
                }}
                >
                Apply Now
                </button>

        </div>

        <div className="job-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="job-section">
          <h2>Requirements</h2>
          <p>{job.requirements}</p>
        </div>

        <div className="job-section">
          <h2>Responsibilities</h2>
          <p>{job.responsibilities || "Not specified."}</p>
        </div>

        <div className="job-section">
          <h2>Benefits</h2>
          <p>{job.benefits || "Not specified."}</p>
        </div>

        <div className="job-footer">

          <div className="footer-card">
            <h3>{job.views}</h3>
            <p>Views</p>
          </div>

          <div className="footer-card">
            <h3>{job.deadline}</h3>
            <p>Application Deadline</p>
          </div>

          <div className="footer-card">
            <h3>{job.is_featured ? "Yes" : "No"}</h3>
            <p>Featured Job</p>
          </div>

        </div>

      </div>

      {showModal && (
        <ApplyModal
          jobId={job.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}