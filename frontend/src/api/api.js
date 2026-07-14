import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  // Don't attach token for login or register
  if (
    config.url.includes("/accounts/login/") ||
    config.url.includes("/accounts/register/")
  ) {
    return config;
  }

  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;