import { useEffect, useState } from "react";

import StatsGrid from "../../components/dashboard/StatsGrid";
import QuickActions from "../../components/dashboard/QuickActions";

import { getCandidateDashboard } from "../../services/candidateDashboardService";
import { useSearch } from "../../context/SearchContext";

import "./Dashboard.css";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const { searchTerm } = useSearch();

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getCandidateDashboard();

                setDashboard(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    if (!dashboard) {

        return <h2>Unable to load dashboard.</h2>;

    }

    const showLatestResume =
        !searchTerm ||
        searchTerm.trim() === "" ||
        "latest resume resume cv uploaded"
            .includes(searchTerm.toLowerCase());

    const showProfileCompletion =
        !searchTerm ||
        searchTerm.trim() === "" ||
        "profile completion account"
            .includes(searchTerm.toLowerCase());

    return (

        <div>

            <StatsGrid
                stats={dashboard.stats || {}}
                user={dashboard.user || {}}
            />

            <QuickActions />

            {(showLatestResume || showProfileCompletion) ? (

                <div className="dashboard-grid">

                    {showLatestResume && (

                        <div className="dashboard-section">

                            <h2>Latest Resume</h2>

                            <p>
                                {dashboard.latest_resume?.title ||
                                    "No resume uploaded"}
                            </p>

                        </div>

                    )}

                    {showProfileCompletion && (

                        <div className="dashboard-section">

                            <h2>Profile Completion</h2>

                            <h1>
                                {dashboard.user?.profile_completion ?? 0}%
                            </h1>

                        </div>

                    )}

                </div>

            ) : null}

        </div>

    );

}