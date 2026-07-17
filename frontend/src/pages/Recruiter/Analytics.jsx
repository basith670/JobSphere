import { useEffect, useState } from "react";

import AnalyticsCards from "../../components/recruiter/AnalyticsCards";
import AnalyticsStatusChart from "../../components/recruiter/AnalyticsStatusChart";
import TopJobsChart from "../../components/recruiter/TopJobsChart";
import RecentApplications from "../../components/recruiter/RecentApplications";

import {
    getRecruiterAnalytics,
    getJobStatistics,
    getRecentApplications,
} from "../../services/analyticsService";

export default function Analytics() {

    const [analytics, setAnalytics] = useState(null);
    const [jobStatistics, setJobStatistics] = useState([]);
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const [
                analyticsData,
                jobsData,
                recentData,
            ] = await Promise.all([
                getRecruiterAnalytics(),
                getJobStatistics(),
                getRecentApplications(),
            ]);

            setAnalytics(analyticsData);
            setJobStatistics(jobsData);
            setRecentApplications(recentData);

        } catch (error) {

            console.error("Analytics Error:", error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="recruiter-page">

            <section className="recruiter-card analytics-header">

                <h2>

                    Recruitment Analytics

                </h2>

                <p>

                    Track hiring performance and recruitment insights.

                </p>

            </section>

            <AnalyticsCards
                analytics={analytics}
                loading={loading}
            />

            <AnalyticsStatusChart
                analytics={analytics}
            />

            <TopJobsChart
                jobs={jobStatistics}
            />

            <RecentApplications
                applications={recentApplications}
            />

        </div>

    );

}