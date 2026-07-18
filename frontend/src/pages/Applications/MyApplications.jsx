import "./MyApplications.css";

import { useEffect, useState } from "react";

import { getMyApplications } from "../../services/applicationService";

import { FaEye } from "react-icons/fa";

import { Link } from "react-router-dom";

import { useSearch } from "../../context/SearchContext";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data.results || data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Applications...</h2>;
  }
  const filteredApplications = applications.filter((application) => {
    if (!searchTerm.trim()) return true;
  
    const search = searchTerm.toLowerCase();
  
    return (
      application.job_title?.toLowerCase().includes(search) ||
      application.company_name?.toLowerCase().includes(search) ||
      application.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="applications-page">

      <h1 className="applications-title">
        My Applications
      </h1>

      <div className="application-stats">

        <div className="stat-card">
        <h3>{filteredApplications.length}</h3>
          <p>Total Applications</p>
        </div>

        <div className="stat-card">
          <h3>
            {
              applications.filter(
                (app) => app.status === "Pending"
              ).length
            }
          </h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>
            {
              applications.filter(
                (app) => app.status === "Reviewed"
              ).length
            }
          </h3>
          <p>Reviewed</p>
        </div>

        <div className="stat-card">
          <h3>
            {
              applications.filter(
                (app) => app.status === "Shortlisted"
              ).length
            }
          </h3>
          <p>Shortlisted</p>
        </div>

      </div>

      <div className="applications-grid">

        {filteredApplications.map((application) => (

          <div
            key={application.id}
            className="application-card"
          >

            <div className="application-top">

              <div className="company-logo">

                {application.company_logo ? (

                  <img
                  src={application.company_logo}
                  alt={application.company_name}
                  onClick={() => console.log(application.company_logo)}
                  />

                ) : (

                  <div className="logo-placeholder">
                    {application.company_name.charAt(0)}
                  </div>

                )}

              </div>

              <div>

                <h2>
                  {application.job_title}
                </h2>

                <h4>
                  {application.company_name}
                </h4>

              </div>

            </div>

            <div className="application-info">

            <div className="status-row">

                <strong>Status</strong>

                <span
                className={`status-badge ${application.status.toLowerCase()}`}
                >
                {application.status}
                </span>

                </div>

              <p>
                <strong>Applied :</strong>{" "}
                {new Date(
                  application.applied_at
                ).toLocaleDateString()}
              </p>

            </div>

            <div className="application-actions">

                <Link
                    to={`/jobs/details/${application.job}`}
                    className="view-job-btn"
                >
                    View Job
                </Link>

                <a
                    href={application.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-btn"
                >
                    <FaEye />
                    <span>View Resume</span>
                </a>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}