import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaEdit,
    FaEye,
    FaTrash,
} from "react-icons/fa";

import DeleteModal from "../common/DeleteModal";

import { deleteJob } from "../../services/jobService";

export default function RecruiterJobTable({

    jobs,

    loading,

    fetchJobs,

}) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);

    const [deleting, setDeleting] = useState(false);

    const handleDelete = (job) => {

        setSelectedJob(job);

        setShowModal(true);

    };

    const confirmDelete = async () => {

        try {

            setDeleting(true);

            await deleteJob(selectedJob.id);

            toast.success("Job deleted successfully.");

            setShowModal(false);

            fetchJobs();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to delete job.");

        }

        finally {

            setDeleting(false);

        }

    };

    if (loading) {

        return (

            <section className="recruiter-card">

                <h3>Loading jobs...</h3>

            </section>

        );

    }

    return (

        <>

            <section className="recruiter-card">

                <table className="jobs-table">

                    <thead>

                        <tr>

                            <th>Job</th>

                            <th>Type</th>

                            <th>Location</th>

                            <th>Vacancies</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            jobs.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            style={{
                                                textAlign: "center",
                                                padding: "30px",
                                            }}
                                        >

                                            No jobs found.

                                        </td>

                                    </tr>

                                )

                                :

                                jobs.map((job) => (

                                    <tr key={job.id}>

                                        <td>

                                            <strong>

                                                {job.title}

                                            </strong>

                                        </td>

                                        <td>

                                            {job.job_type}

                                        </td>

                                        <td>

                                            {job.location}

                                        </td>

                                        <td>

                                            {job.vacancies}

                                        </td>

                                        <td>

                                            <span
                                                className={`job-status ${job.is_active ? "active" : "closed"}`}
                                            >

                                                {job.is_active ? "Active" : "Closed"}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="job-actions">

                                                <button
                                                    title="View Job"
                                                    onClick={() =>
                                                        navigate(`/recruiter/jobs/${job.id}`)
                                                    }
                                                >

                                                    <FaEye />

                                                </button>

                                                <button
                                                    title="Edit Job"
                                                    onClick={() =>
                                                        navigate(`/recruiter/jobs/${job.id}/edit`)
                                                    }
                                                >

                                                    <FaEdit />

                                                </button>

                                                <button

                                                className="delete-action"

                                                title="Delete Job"

                                                onClick={() => handleDelete(job)}

                                            >
                                                <FaTrash />
                                            </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </section>

            <DeleteModal

                isOpen={showModal}

                title="Delete Job"

                message={`Are you sure you want to delete "${selectedJob?.title}"? This action cannot be undone.`}

                loading={deleting}

                onCancel={() => setShowModal(false)}

                onConfirm={confirmDelete}

            />

        </>

    );

}