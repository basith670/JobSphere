import api from "../api/api";

export const getFeaturedJobs = async () => {
  const response = await api.get("/jobs/");

  return response.data.results.filter(job => job.is_featured);
};

export const getAllJobs = async () => {
  const response = await api.get("/jobs/");
  return response.data.results;
};