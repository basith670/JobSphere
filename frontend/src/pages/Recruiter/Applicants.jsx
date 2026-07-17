import { useEffect, useMemo, useState } from "react";

import RecruiterApplicantFilters from "../../components/recruiter/RecruiterApplicantFilters";
import RecruiterApplicantTable from "../../components/recruiter/RecruiterApplicantTable";

import { getRecruiterApplications } from "../../services/applicationService";

import { useSearch } from "../../context/SearchContext";

export default function Applicants() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const { searchTerm } = useSearch();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const data = await getRecruiterApplications();

            setApplications(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const filteredApplications = useMemo(() => {

        const search = searchTerm.toLowerCase().trim();

        if (!search) return applications;

        return applications.filter((application) => {

            return (
                application.applicant_name?.toLowerCase().includes(search) ||
                application.applicant_email?.toLowerCase().includes(search) ||
                application.job_title?.toLowerCase().includes(search) ||
                application.status?.toLowerCase().includes(search)
            );

        });

    }, [applications, searchTerm]);

    return (

        <div className="recruiter-page">

            <RecruiterApplicantFilters />

            <RecruiterApplicantTable
                applications={filteredApplications}
                loading={loading}
                fetchApplications={fetchApplications}
                totalApplications={applications.length}
                filteredCount={filteredApplications.length}
            />

        </div>

    );

}