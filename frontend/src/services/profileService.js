import api from "../api/api";

export const getProfile = async () => {
  const response = await api.get("/accounts/me/");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/accounts/me/",
    profileData
  );

  return response.data;
};