import api from "../api/api";


export const getRecruiterAnalytics = async () => {

    const response = await api.get("/analytics/dashboard/");

    return response.data;

};

export const getJobStatistics = async () => {

    const response = await api.get(
        "/analytics/job-statistics/"
    );

    return response.data;

};

export const getRecentApplications = async () => {

    const response = await api.get(
        "/analytics/recent-applications/"
    );

    return response.data.results;

};