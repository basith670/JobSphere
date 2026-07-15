import api from "../api/api";

export const getCandidateDashboard = async () => {
  const response = await api.get("/dashboard/candidate/");

  return response.data;
};