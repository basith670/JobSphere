import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBriefcase,
    FaEye,
} from "react-icons/fa";

import { getMyJobs } from "../../services/jobService";

export default function RecentJobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const data = await getMyJobs();

            setJobs(data.slice(0, 5));

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="recruiter-card">

            <div className="section-header">

                <h2>Recent Jobs</h2>

                <button
                    className="view-btn"
                    onClick={() => navigate("/recruiter/jobs")}
                >

                    View All

                </button>

            </div>

            <table className="recruiter-table">

                <thead>

                    <tr>

                        <th>Job</th>

                        <th>Location</th>

                        <th>Applicants</th>

                        <th>Status</th>

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

                        jobs.length === 0 ?

                        (

                            <tr>

                                <td colSpan="5">

                                    No jobs found.

                                </td>

                            </tr>

                        )

                        :

                        jobs.map((job)=>(

                            <tr key={job.id}>

                                <td>

                                <div className="job-title">

                                    <FaBriefcase />

                                    <div className="job-info">

                                        <div className="job-name">
                                            {job.title}
                                        </div>

                                        <div className="job-type">
                                            {job.job_type}
                                        </div>

                                    </div>

                                    </div>

                                </td>

                                <td>

                                    {job.location}

                                </td>

                                <td>

                                    {job.application_count ?? 0}

                                </td>

                                <td>

                                    <span
                                        className={`status-${job.status.toLowerCase()}`}
                                    >

                                        {job.status}

                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="icon-btn"
                                        onClick={() =>
                                            navigate(`/recruiter/jobs/${job.id}`)
                                        }
                                    >

                                        <FaEye />

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    );

}