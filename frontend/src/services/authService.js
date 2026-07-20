import api from "../api/api";

export const loginUser = async (credentials) => {
  const response = await api.post("/accounts/login/", credentials);

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/accounts/register/", userData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access");
};

export const forgotPassword = async (email) => {
  const response = await api.post("/accounts/forgot-password/", {
    email,
  });

  return response.data;
};