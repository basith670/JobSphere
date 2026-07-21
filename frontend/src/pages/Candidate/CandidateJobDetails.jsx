import "./CandidateJobDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getJob } from "../../services/jobService";
import ApplyModal from "../../components/jobs/ApplyModal";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleApply = () => {
    const token = localStorage.getItem("access");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    // User not logged in
    if (!token) {
      navigate("/login", {
        state: {
            from: `/candidate/jobs/${job.id}`,
        },
      });
      return;
    }

    // Recruiters cannot apply
    if (role !== "jobseeker") {
      alert("Only job seekers can apply for jobs.");
      return;
    }

    // Open Apply Modal
    setShowModal(true);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!job) {
    return <h2>Job not found.</h2>;
  }

  return (
    <>
      <div className="job-details-page section">

      <div className="container">

        <div className="job-header">

          <div className="company-logo">
            {job.company_logo ? (
              <img
                src={job.company_logo}
                alt={job.company_name}
                className="company-logo-img"
              />
            ) : (
              job.company_name?.charAt(0)
            )}
                </div>

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
            onClick={handleApply}
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