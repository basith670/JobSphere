import {
    FaEye,
    FaFilePdf,
    FaCheck,
    FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateApplication } from "../../services/applicationService";

export default function RecruiterApplicantTable({

    applications,
    loading,
    fetchApplications,
    totalApplications,
    filteredCount,

}) {

    const navigate = useNavigate();

    const handleStatusUpdate = async (id, status) => {

        try {

            await updateApplication(id, {
                status,
            });

            toast.success(`Application ${status.toLowerCase()} successfully.`);

            await fetchApplications();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update application.");

        }

    };

    if (loading) {

        return (

            <section className="recruiter-card">

                <h3>Loading applicants...</h3>

            </section>

        );

    }

    return (

        <section className="recruiter-card">

            <div className="table-info">

                <p>

                    <strong>{filteredCount}</strong> of{" "}
                    <strong>{totalApplications}</strong> applicants

                </p>

            </div>

            <table className="jobs-table">

                <thead>

                    <tr>

                        <th>Applicant</th>
                        <th>Job</th>
                        <th>Resume</th>
                        <th>Status</th>
                        <th>Applied</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="empty-table"
                                >

                                    <div className="empty-state">

                                        <h3>No applicants found</h3>

                                        <p>
                                            Try searching with a different keyword.
                                        </p>

                                    </div>

                                </td>

                            </tr>

                        )

                        :

                        applications.map((application) => (

                            <tr key={application.id}>

                                <td>

                                    <div className="applicant-info">

                                    <div className="avatar">
                                            {application.applicant_profile_image ? (
                                                <img
                                                    src={application.applicant_profile_image}
                                                    alt={application.applicant_first_name}
                                                    className="avatar-image"
                                                />
                                            ) : (
                                                application.applicant_name?.[0]?.toUpperCase()
                                            )}
                                        </div>

                                        <div>

                                            <strong>

                                                {application.applicant_first_name}{" "}
                                                {application.applicant_last_name}

                                            </strong>

                                            <br />

                                            <small>

                                                {application.applicant_email}

                                            </small>

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    {application.job_title}

                                </td>

                                <td>

                                    <a
                                        href={application.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="resume-link"
                                    >

                                        <FaFilePdf />

                                        View Resume

                                    </a>

                                </td>

                                <td>

                                    <span
                                        className={`status-badge ${application.status.toLowerCase()}`}
                                    >

                                        {application.status}

                                    </span>

                                </td>

                                <td>

                                    {new Date(application.applied_at).toLocaleDateString()}

                                </td>

                                <td>

                                    <div className="job-actions">

                                        <button
                                            title="View Applicant"
                                            onClick={() =>
                                                navigate(`/recruiter/applicants/${application.id}`)
                                            }
                                        >

                                            <FaEye />

                                        </button>

                                        <button
                                            title="Shortlist Applicant"
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    application.id,
                                                    "Shortlisted"
                                                )
                                            }
                                        >

                                            <FaCheck />

                                        </button>

                                        <button
                                            title="Reject Applicant"
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    application.id,
                                                    "Rejected"
                                                )
                                            }
                                        >

                                            <FaTimes />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    );

}