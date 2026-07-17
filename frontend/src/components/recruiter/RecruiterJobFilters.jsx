import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RecruiterJobFilters({

    status,
    setStatus,

    jobType,
    setJobType,

}) {

    const navigate = useNavigate();

    return (

        <section className="recruiter-card">

            <div className="jobs-header">

                <div>

                    <h2>
                        Jobs Management
                    </h2>

                    <p>
                        Manage all your job postings from one place.
                    </p>

                </div>

                <button

                    className="create-job-btn"

                    onClick={() =>
                        navigate("/recruiter/jobs/create")
                    }

                >

                    <FaPlus />

                    Create Job

                </button>

            </div>

            <div className="jobs-filters">

                <select

                    value={status}

                    onChange={(e) =>
                        setStatus(e.target.value)
                    }

                >

                    <option value="">
                        All Status
                    </option>

                    <option value="true">
                        Active
                    </option>

                    <option value="false">
                        Closed
                    </option>

                </select>

                <select

                    value={jobType}

                    onChange={(e) =>
                        setJobType(e.target.value)
                    }

                >

                    <option value="">
                        All Types
                    </option>

                    <option value="Full Time">
                        Full Time
                    </option>

                    <option value="Part Time">
                        Part Time
                    </option>

                    <option value="Internship">
                        Internship
                    </option>

                    <option value="Contract">
                        Contract
                    </option>

                    <option value="Remote">
                        Remote
                    </option>

                </select>

            </div>

        </section>

    );

}