import api from "../api/api";

export const getCompanies = async () => {
  const response = await api.get("/companies/");
  return response.data;
};

export const getJobs = async () => {
  const response = await api.get("/jobs/");
  return response.data.results;
};