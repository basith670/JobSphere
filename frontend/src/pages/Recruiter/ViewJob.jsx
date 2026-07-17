import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaEye,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

import { getMyJob } from "../../services/jobService";

export default function ViewJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const data = await getMyJob(id);
      setJob(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!job) {
    return (
      <div className="recruiter-page">
        <div className="recruiter-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  const skills = job.skills_required
    ? job.skills_required.split(",")
    : [];

  const requirements = job.requirements
    ? job.requirements.split(",")
    : [];

  const benefits = job.benefits
    ? job.benefits.split(",")
    : [];

  return (
    <div className="recruiter-page">

      {/* Header */}

      <div className="recruiter-card view-job-header">

        <div className="view-job-top">

          <button
            className="back-btn"
            onClick={() => navigate("/recruiter/jobs")}
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            className="create-job-btn"
            onClick={() =>
              navigate(`/recruiter/jobs/${job.id}/edit`)
            }
          >
            <FaEdit />
            Edit Job
          </button>

        </div>

        <h1>{job.title}</h1>

        <h3>{job.company_name}</h3>

        <div className="job-meta">

          <span>
            <FaMapMarkerAlt />
            {job.location}
          </span>

          <span>
            <FaBriefcase />
            {job.job_type}
          </span>

          <span>
            {job.experience}
          </span>

        </div>

        <div className="job-badges">

          <span className="badge active">
            {job.is_active ? "Active" : "Closed"}
          </span>

          {job.is_featured && (
            <span className="badge featured">
              Featured
            </span>
          )}

        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">

          <FaEye />

          <h2>{job.views}</h2>

          <p>Views</p>

        </div>

        <div className="stat-card">

          <FaUsers />

          <h2>{job.vacancies}</h2>

          <p>Vacancies</p>

        </div>

        <div className="stat-card">

          <FaCalendarAlt />

          <h2>{job.deadline}</h2>

          <p>Deadline</p>

        </div>

      </div>

      {/* Description */}

      <div className="recruiter-card">

        <h2>Description</h2>

        <p>{job.description}</p>

      </div>

      {/* Responsibilities */}

      <div className="recruiter-card">

        <h2>Responsibilities</h2>

        <p>{job.responsibilities}</p>

      </div>

      {/* Requirements */}

      <div className="recruiter-card">

        <h2>Requirements</h2>

        <ul>

          {requirements.map((item, index) => (

            <li key={index}>{item.trim()}</li>

          ))}

        </ul>

      </div>

      {/* Benefits */}

      <div className="recruiter-card">

        <h2>Benefits</h2>

        <ul>

          {benefits.map((item, index) => (

            <li key={index}>{item.trim()}</li>

          ))}

        </ul>

      </div>

      {/* Skills */}

      <div className="recruiter-card">

        <h2>Skills</h2>

        <div className="skills-container">

          {skills.map((skill, index) => (

            <span
              key={index}
              className="skill-chip"
            >
              {skill.trim()}
            </span>

          ))}

        </div>

      </div>

      {/* Salary */}

      <div className="recruiter-card">

        <h2>Salary</h2>

        <h3>

          ₹{Number(job.salary_min).toLocaleString()} - ₹
          {Number(job.salary_max).toLocaleString()}

        </h3>

      </div>

    </div>
  );
}