import api from "../api/api";

export const getJobs = async (params = {}) => {
  const response = await api.get("/jobs/", {
    params,
  });

  return response.data.results || [];
};

export const getJob = async (id) => {
  const response = await api.get(`/jobs/${id}/`);

  return response.data;
};

export const getFeaturedJobs = async () => {
  const response = await api.get("/jobs/", {
    params: {
      is_featured: true,
    },
  });

  return response.data.results || [];
};