import api from "../api/api";

export const getCompanies = async () => {
  const response = await api.get("/companies/");
  return response.data.results;
};

export const getJobs = async () => {
  const response = await api.get("/jobs/");
  return response.data.results;
};

export const getMyCompany = async () => {
  const response = await api.get("/companies/me/");
  return response.data;
};

export const updateMyCompany = async (formData) => {
  const response = await api.patch("/companies/me/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};