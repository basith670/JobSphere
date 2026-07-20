import api from "../api/api";

/* ======================================
   PUBLIC JOB APIs
====================================== */

export const getJobs = async (params = {}) => {

    const response = await api.get(
        "/jobs/",
        {
            params,
        }
    );

    return response.data.results || [];

};

export const getJob = async (id) => {

    const response = await api.get(
        `/jobs/${id}/`
    );

    return response.data;

};

export const getFeaturedJobs = async () => {

    const response = await api.get(
        "/jobs/",
        {
            params: {
                is_featured: true,
            },
        }
    );

    return response.data.results || [];

};

/* ======================================
   SAVED JOB APIs
====================================== */

export const getSavedJobs = async () => {

    const response = await api.get(
        "/jobs/saved/"
    );

    return response.data.results || [];

};

export const saveJob = async (id) => {

    const response = await api.post(
        `/jobs/${id}/save/`
    );

    return response.data;

};

export const unsaveJob = async (id) => {

    const response = await api.delete(
        `/jobs/${id}/unsave/`
    );

    return response.data;

};

/* ======================================
   RECRUITER JOB APIs
====================================== */

export const getMyJobs = async (params = {}) => {

    const response = await api.get(
        "/jobs/my/",
        {
            params,
        }
    );

    return response.data.results || [];

};

export const getMyJob = async (id) => {

    const response = await api.get(
        `/jobs/my/${id}/`
    );

    return response.data;

};

export const createJob = async (jobData) => {

    const response = await api.post(
        "/jobs/create/",
        jobData
    );

    return response.data;

};

export const updateJob = async (
    id,
    jobData
) => {

    const response = await api.put(
        `/jobs/${id}/update/`,
        jobData
    );

    return response.data;

};

export const deleteJob = async (id) => {

    await api.delete(
        `/jobs/${id}/delete/`
    );

    return true;

};

export const getHomepageStats = async () => {

    const response = await api.get(
        "/jobs/homepage-stats/"
    );

    return response.data;

};

/* ======================================
   CANDIDATE DASHBOARD
====================================== */

export const getDashboardStats = async () => {

    const response = await api.get(
        "/accounts/dashboard/stats/"
    );

    return response.data;

};