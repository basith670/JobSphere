import api from "../api/api";

export const recruiterGlobalSearch = async (query) => {
  const response = await api.get(`search/?q=${query}`);
  return response.data;
};