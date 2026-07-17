import { useEffect, useState } from "react";

import {
    getRecruiterDashboard,
} from "../../services/recruiterDashboardService";

import RecruiterHero from "../../components/recruiter/RecruiterHero";
import RecruiterStats from "../../components/recruiter/RecruiterStats";
import RecruiterPipeline from "../../components/recruiter/RecruiterPipeline";
import RecruiterActions from "../../components/recruiter/RecruiterActions";
import RecentJobs from "../../components/recruiter/RecentJobs";
import RecentApplicants from "../../components/recruiter/RecentApplicants";

import "../../components/recruiter/Recruiter.css";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getRecruiterDashboard();

            setDashboard(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="recruiter-page">

                <h3>Loading Dashboard...</h3>

            </div>

        );

    }

    return (

        <div className="recruiter-page">

            <RecruiterHero dashboard={dashboard} />

            <RecruiterStats dashboard={dashboard} />

            <RecruiterPipeline dashboard={dashboard} />

            <RecruiterActions />

            <RecentJobs />

            <RecentApplicants />

        </div>

    );

}