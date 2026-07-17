import { useEffect, useState } from "react";

import RecruiterJobFilters from "../../components/recruiter/RecruiterJobFilters";
import RecruiterJobTable from "../../components/recruiter/RecruiterJobTable";

import { getMyJobs } from "../../services/jobService";

import { useSearch } from "../../context/SearchContext";

export default function Jobs() {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("");

    const [jobType, setJobType] = useState("");

    const { searchTerm } = useSearch();

    useEffect(() => {

        fetchJobs();

    }, [searchTerm, status, jobType]);

    const fetchJobs = async () => {

        try {

            setLoading(true);

            const params = {};

            if (searchTerm.trim()) {

                params.search = searchTerm;

            }

            if (status !== "") {

                params.is_active = status;

            }

            if (jobType) {

                params.job_type = jobType;

            }

            const data = await getMyJobs(params);

            setJobs(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="recruiter-page">

            <RecruiterJobFilters

                status={status}

                setStatus={setStatus}

                jobType={jobType}

                setJobType={setJobType}

            />

            <RecruiterJobTable

                jobs={jobs}

                loading={loading}

                fetchJobs={fetchJobs}

            />

        </div>

    );

}