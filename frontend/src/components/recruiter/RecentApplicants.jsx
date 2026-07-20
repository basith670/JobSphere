import { useEffect, useState } from "react";

import {
    FaCheck,
    FaEye,
    FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getRecruiterApplications,
    updateApplication,
} from "../../services/applicationService";

export default function RecentApplicants() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const data = await getRecruiterApplications();

            setApplications(data.slice(0, 5));

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleStatusUpdate = async (id, status) => {

        try {

            await updateApplication(id, {
                status,
            });

            toast.success(`Application ${status.toLowerCase()} successfully.`);

            fetchApplications();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update application.");

        }

    };

    return (

        <section className="recruiter-card">

            <div className="section-header">

                <h2>Recent Applicants</h2>

                <button
                    className="view-btn"
                    onClick={() => navigate("/recruiter/applicants")}
                >

                    View All

                </button>

            </div>

            <div className="table-responsive">

              <table className="recruiter-table">

                <thead>

                    <tr>

                        <th>Candidate</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th>Applied</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        loading ?

                        (

                            <tr>

                                <td colSpan="5">

                                    Loading...

                                </td>

                            </tr>

                        )

                        :

                        applications.length === 0 ?

                        (

                            <tr>

                                <td colSpan="5">

                                    No applications found.

                                </td>

                            </tr>

                        )

                        :

                        applications.map((application) => (

                            <tr key={application.id}>

                                <td>

                                    <div className="applicant-info">

                                    <div className="applicant-avatar">

                                        {application.applicant_profile_image ? (

                                            <img
                                                src={application.applicant_profile_image}
                                                alt={application.applicant_first_name}
                                                className="applicant-avatar-image"
                                            />

                                        ) : (

                                            application.applicant_first_name?.charAt(0)

                                        )}

                                        </div>

                                        <div>

                                            <div className="applicant-name">

                                                {application.applicant_first_name} {application.applicant_last_name}

                                            </div>

                                            <div className="applicant-email">

                                                {application.applicant_email}

                                            </div>

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    {application.job_title}

                                </td>

                                <td>

                                    <span
                                        className={`status-${application.status.toLowerCase()}`}
                                    >

                                        {application.status}

                                    </span>

                                </td>

                                <td>

                                    {new Date(application.applied_at).toLocaleDateString()}

                                </td>

                                <td>

                                    <div className="action-group">

                                        <button
                                            className="icon-btn"
                                            onClick={() =>
                                                navigate(`/recruiter/applicants/${application.id}`)
                                            }
                                        >

                                            <FaEye />

                                        </button>

                                        <button
                                            className="icon-btn"
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
                                            className="icon-btn"
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

                </div>

                </section>

    );

}