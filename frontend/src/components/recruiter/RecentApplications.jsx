import { FaUserCircle } from "react-icons/fa";

export default function RecentApplications({ applications }) {

    if (!applications || applications.length === 0) {

        return null;

    }

    return (

        <section className="recruiter-card recent-applications-card">

            <div className="chart-header">

                <h3>Recent Applications</h3>

                <p>
                    Latest candidates who applied for your jobs.
                </p>

            </div>

            <div className="recent-applications-list">

                {applications.map((application) => (

                    <div
                        key={application.id}
                        className="recent-application-item"
                    >

                        {/* Left Side */}
                        <div className="recent-user">

                            <div className="recent-avatar">

                                <FaUserCircle />

                            </div>

                            <div className="recent-details">

                                <h4>

                                    {application.applicant_name}

                                </h4>

                                <p className="recent-job">

                                    {application.job_title}

                                </p>

                                <small>

                                    {application.applicant_email}

                                </small>

                            </div>

                        </div>

                        {/* Right Side */}
                        <div className="recent-meta">

                            <span
                                className={`status-badge ${application.status.toLowerCase()}`}
                            >

                                {application.status}

                            </span>

                            <small>

                                {new Date(application.applied_at).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}

                            </small>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}